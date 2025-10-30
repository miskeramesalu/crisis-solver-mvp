import dotenv from "dotenv";
dotenv.config(); // Load env variables

import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";
import { MongoClient } from "mongodb";
import { HederaService } from "./hederaService.js";

const app = express();
app.use(express.json());
app.use(cors());

// Ensure tmp folder exists
const tmpDir = path.join(process.cwd(), "tmp");
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
const upload = multer({ dest: tmpDir });

// MongoDB setup
const client = new MongoClient(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 20000,
  retryWrites: true,
});

let db;
let hedera;
let hederaReady = false; // Flag to know if Hedera is usable

async function startServer() {
  try {
    // Validate env variables
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing in .env");

    console.log("✅ Env variables loaded");

    // Connect to MongoDB
    await client.connect();
    db = client.db(process.env.MONGO_DB_NAME || "crisisSolverDB");
    console.log("✅ MongoDB connected successfully");

    // Initialize Hedera if keys exist
    if (process.env.HEDERA_ACCOUNT_ID && process.env.HEDERA_PRIVATE_KEY) {
      try {
        hedera = new HederaService(
          process.env.HEDERA_ACCOUNT_ID,
          process.env.HEDERA_PRIVATE_KEY
        );

        await hedera.createTopic();
        await hedera.createRewardToken();
        hederaReady = true;
        console.log("✅ Hedera client initialized");
      } catch (err) {
        console.warn(
          "⚠️ Hedera initialization failed. Hedera features will be disabled:",
          err.message
        );
        hederaReady = false;
      }
    } else {
      console.warn("⚠️ Hedera credentials missing. Hedera features disabled.");
    }

    // Health check route
    app.get("/api/health", (req, res) => res.json({ ok: true, hederaReady }));

    // Media upload route
    app.post("/api/upload", upload.single("media"), async (req, res) => {
      try {
        const { title, description, uploaderAccountId } = req.body;
        const file = req.file;
        if (!file)
          return res.status(400).json({ ok: false, error: "No file uploaded" });

        const url = `tmp/${file.filename}`;
        const doc = {
          title,
          description,
          url,
          uploaderAccountId,
          status: "pending",
          views: 0,
          createdAt: new Date(),
        };

        const result = await db.collection("media").insertOne(doc);

        let hcsResponse = null;
        if (hederaReady) {
          const payload = JSON.stringify({
            event: "MEDIA_UPLOADED",
            mediaId: result.insertedId.toString(),
            uploaderAccountId,
            url,
            timestamp: new Date().toISOString(),
          });

          try {
            hcsResponse = await hedera.submitHcsMessage(payload);
          } catch (err) {
            console.warn("⚠️ Failed to submit HCS message:", err.message);
          }
        }

        await db
          .collection("media")
          .updateOne(
            { _id: result.insertedId },
            {
              $set: {
                hcsResponse,
                status: hederaReady ? "uploaded" : "pending",
              },
            }
          );

        res.json({ ok: true, id: result.insertedId, hcsResponse });
      } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ ok: false, error: err.message });
      }
    });

    // Start server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
      console.log(`🚀 Backend running safely on port ${PORT}`)
    );
  } catch (err) {
    console.error("❌ Server startup failed:", err);
    process.exit(1);
  }
}

startServer();