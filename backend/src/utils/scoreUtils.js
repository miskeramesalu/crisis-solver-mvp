// src/utils/scoreUtils.js
import Leaderboard from "../models/leaderboardModel.js";
import UserBalance from "../models/userBalanceModel.js";

export const updateUserScore = async (userId, points) => {
  // Update Leaderboard
  await Leaderboard.findOneAndUpdate(
    { userId },
    { $inc: { score: points } },
    { upsert: true, new: true }
  );

  // Update User Balance
  await UserBalance.findOneAndUpdate(
    { userId },
    { $inc: { balance: points } },
    { upsert: true, new: true }
  );

  console.log(`✅ ${userId} gained ${points} pts`);
};
