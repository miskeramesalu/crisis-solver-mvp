import express from "express";
import { updateUserScore } from "../utils/scoreUtils.js";

const router = express.Router();

router.post("/view", async (req, res) => {
  const { viewerAccountId } = req.body;
  try {
    await updateUserScore(viewerAccountId, 5);
    res.json({ message: "Media viewed successfully", points: 5 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;