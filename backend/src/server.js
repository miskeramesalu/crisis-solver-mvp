import dotenv from "dotenv";
dotenv.config();

import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";
import { MongoClient, ObjectId } from "mongodb";
import { HederaService } from "./hederaService.js";

const app = express();
app.use(express.json());
app.use(cors());

/* ------------------------------------------------------------
 🧱 Ensure tmp folder exists for media uploads
------------------------------------------------------------ */
const tmpDir = path.join(process.cwd(), "tmp");
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
const upload = multer({ dest: tmpDir });

/* ------------------------------------------------------------
 🧩 MongoDB Setup
------------------------------------------------------------ */
const client = new MongoClient(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 20000,
  retryWrites: true,
});

let db;
let hedera;
let hederaReady = false;

/* ------------------------------------------------------------
 ⚙️ Helper Functions for Leaderboard + Balance
------------------------------------------------------------ */
async function updateLeaderboard(userId, points = 1) {
  const users = db.collection("leaderboard");
  await users.updateOne(
    { userId },
    { $inc: { score: points }, $setOnInsert: { createdAt: new Date() } },
    { upsert: true }
  );
}

async function updateUserBalance(userId, amount = 0) {
  const balances = db.collection("balances");
  await balances.updateOne(
    { userId },
    { $inc: { balance: amount }, $setOnInsert: { createdAt: new Date() } },
    { upsert: true }
  );
}

/* ------------------------------------------------------------
 🚀 Server Boot Function
------------------------------------------------------------ */
async function startServer() {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing in .env");

    console.log("✅ Env variables loaded");
    await client.connect();
    db = client.db(process.env.MONGO_DB_NAME || "crisisSolverDB");
    console.log("✅ MongoDB connected successfully");

    // Initialize Hedera
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
        console.warn("⚠️ Hedera init failed:", err.message);
        hederaReady = false;
      }
    } else {
      console.warn("⚠️ Hedera credentials missing. Skipping Hedera setup.");
    }

    /* ------------------------------------------------------------
     🌍 ROUTES SECTION
    ------------------------------------------------------------ */

    // ✅ Health check
    app.get("/api/health", (req, res) => res.json({ ok: true, hederaReady }));

    // ✅ Media Upload
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

        // Add reward for upload
        await updateLeaderboard(uploaderAccountId, 5);
        await updateUserBalance(uploaderAccountId, 2);

        res.json({ ok: true, id: result.insertedId });
      } catch (err) {
        console.error("❌ Upload error:", err.message);
        res.status(500).json({ ok: false, error: err.message });
      }
    });

    // ✅ Media View (Reward viewer)
    app.post("/api/view", async (req, res) => {
      try {
        const { mediaId, viewerAccountId } = req.body;
        const media = db.collection("media");
        await media.updateOne(
          { _id: new ObjectId(mediaId) },
          { $inc: { views: 1 } }
        );
        await updateLeaderboard(viewerAccountId, 1);
        await updateUserBalance(viewerAccountId, 0.5);
        res.json({ ok: true });
      } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
      }
    });

    // ✅ Quiz Submission
    app.post("/api/answer", async (req, res) => {
      try {
        const { userId, quizId, answers } = req.body;
        await db.collection("quizAnswers").insertOne({
          userId,
          quizId,
          answers,
          createdAt: new Date(),
        });
        await updateLeaderboard(userId, 3);
        await updateUserBalance(userId, 1);
        res.json({ ok: true });
      } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
      }
    });

    // ✅ Game Completion
    app.post("/api/game/complete", async (req, res) => {
      try {
        const { userId, gameId, score } = req.body;
        await db.collection("games").insertOne({
          userId,
          gameId,
          score,
          createdAt: new Date(),
        });
        await updateLeaderboard(userId, score || 5);
        await updateUserBalance(userId, score / 2 || 1);
        res.json({ ok: true });
      } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
      }
    });

    // ✅ Donation
    app.post("/api/donate", async (req, res) => {
      try {
        const { donorId, amount, currency } = req.body;
        await db.collection("donations").insertOne({
          donorId,
          amount,
          currency,
          createdAt: new Date(),
        });
        await updateLeaderboard(donorId, 2);
        await updateUserBalance(donorId, amount * 0.1);
        res.json({ ok: true });
      } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
      }
    });

    // ✅ Referral
    app.post("/api/referral", async (req, res) => {
      try {
        const { referrerId, newUserId } = req.body;
        await db.collection("referrals").insertOne({
          referrerId,
          newUserId,
          createdAt: new Date(),
        });
        await updateLeaderboard(referrerId, 4);
        await updateUserBalance(referrerId, 1.5);
        res.json({ ok: true });
      } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
      }
    });

    // ✅ Leaderboard routes
    app.get("/api/leaderboard", async (req, res) => {
      const items = await db
        .collection("leaderboard")
        .find({})
        .sort({ score: -1 })
        .limit(50)
        .toArray();
      res.json({ items });
    });

    // ✅ Get User Balance
    app.get("/api/leaderboard/userBalance/:userId", async (req, res) => {
      const { userId } = req.params;
      const user = await db.collection("balances").findOne({ userId });
      res.json({ balance: user?.balance || 0 });
    });

    // ✅ Manual Leaderboard update (API)
    app.post("/api/leaderboard/update", async (req, res) => {
      const { userId, points } = req.body;
      await updateLeaderboard(userId, points);
      res.json({ ok: true });
    });

    // ✅ Manual User balance update
    app.post("/api/leaderboard/updateBalance", async (req, res) => {
      const { userId, amount } = req.body;
      await updateUserBalance(userId, amount);
      res.json({ ok: true });
    });

    /* ------------------------------------------------------------
     🚀 Launch Server
    ------------------------------------------------------------ */
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