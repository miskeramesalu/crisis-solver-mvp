import express from "express";
import { updateUserScore } from "../utils/scoreUtils.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { donorId, amount } = req.body;
  try {
    const points = Math.round(amount / 10); // e.g., 1 point per 10 tokens
    await updateUserScore(donorId, points);
    res.json({ message: "Donation recorded", points });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;