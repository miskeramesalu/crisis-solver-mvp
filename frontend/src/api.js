import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

// -------- Media --------
export const fetchMedia = async () => {
  try {
    const res = await axios.get(`${API}/media`);
    return res.data.items || [];
  } catch (err) {
    console.error("❌ fetchMedia error:", err.message);
    return [];
  }
};

export const uploadMedia = async ({ file, title, description, uploaderId }) => {
  if (!file) throw new Error("No file selected");
  const form = new FormData();
  form.append("media", file);
  form.append("title", title || "Untitled");
  form.append("description", description);
  form.append("uploaderAccountId", uploaderId);

  try {
    const res = await axios.post(`${API}/upload`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("❌ uploadMedia error:", err.message);
    throw err;
  }
};

export const viewMedia = async ({ mediaId, viewerAccountId }) => {
  try {
    const res = await axios.post(`${API}/view`, { mediaId, viewerAccountId });
    return res.data;
  } catch (err) {
    console.error("❌ viewMedia error:", err.message);
    throw err;
  }
};

// -------- Quiz --------
export const submitQuiz = async ({ userId, quizId, answers }) => {
  try {
    const res = await axios.post(`${API}/answer`, { userId, quizId, answers });
    return res.data;
  } catch (err) {
    console.error("❌ submitQuiz error:", err.message);
    throw err;
  }
};

// -------- Game --------
export const submitGame = async ({ userId, gameId, score }) => {
  try {
    const res = await axios.post(`${API}/game/complete`, {
      userId,
      gameId,
      score,
    });
    return res.data;
  } catch (err) {
    console.error("❌ submitGame error:", err.message);
    throw err;
  }
};

// -------- Donation --------
export const submitDonation = async ({ donorId, amount, currency }) => {
  try {
    const res = await axios.post(`${API}/donate`, {
      donorId,
      amount,
      currency,
    });
    return res.data;
  } catch (err) {
    console.error("❌ submitDonation error:", err.message);
    throw err;
  }
};

// -------- Referral --------
export const submitReferral = async ({ referrerId, newUserId }) => {
  try {
    const res = await axios.post(`${API}/referral`, { referrerId, newUserId });
    return res.data;
  } catch (err) {
    console.error("❌ submitReferral error:", err.message);
    throw err;
  }
};

// -------- Leaderboard / User Balance --------
export const fetchLeaderboard = async () => {
  try {
    const res = await axios.get(`${API}/leaderboard`);
    return res.data.items || [];
  } catch (err) {
    console.error("❌ fetchLeaderboard error:", err.message);
    return [];
  }
};

export const fetchUserBalance = async (userId) => {
  try {
    const res = await axios.get(`${API}/userBalance/${userId}`);
    return res.data.balance || 0;
  } catch (err) {
    console.error("❌ fetchUserBalance error:", err.message);
    return 0;
  }
};
