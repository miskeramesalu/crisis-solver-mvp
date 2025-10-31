import express from "express";
import { updateUserScore } from "../utils/scoreUtils.js";

const router = express.Router();

router.post("/answer", async (req, res) => {
  const { userId, quizId, answers } = req.body;

  try {
    // Example logic for quiz correctness
    const score = Math.floor(Math.random() * 10) + 5; // random for demo
    await updateUserScore(userId, score);

    res.json({ message: "Quiz completed!", score });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;