import express from "express";
import { updateUserScore } from "../utils/scoreUtils.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { referrerId } = req.body;
  try {
    await updateUserScore(referrerId, 15); // fixed reward for referral
    res.json({ message: "Referral recorded", points: 15 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;