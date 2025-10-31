import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  score: { type: Number, default: 0 },
});

export default mongoose.model("Leaderboard", leaderboardSchema);