import express from "express";
import { updateUserScore } from "../utils/scoreUtils.js";

const router = express.Router();

router.post("/complete", async (req, res) => {
  const { userId, gameId, score } = req.body;
  try {
    await updateUserScore(userId, score);
    res.json({ message: "Game completed", score });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;