import mongoose from "mongoose";

const userBalanceSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
});

export default mongoose.model("UserBalance", userBalanceSchema);