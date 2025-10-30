import React, { useEffect, useState } from "react";
import { fetchLeaderboard, fetchUserBalance } from "../api";

const DashboardTab = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userId, setUserId] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchLeaderboard().then(setLeaderboard);
  }, []);

  const loadBalance = async () => {
    if (userId) {
      const b = await fetchUserBalance(userId);
      setBalance(b);
    }
  };

  return (
    <div>
      <h2 className="p-6 rounded-lg bg-[brown] text-white">Dashboard</h2>
      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-1 mb-2 w-full"
      />
      <button
        onClick={loadBalance}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Load Balance
      </button>
      <p className="mt-2">Balance: {balance}</p>
      <h3 className="font-semibold mt-4">Leaderboard</h3>
      {leaderboard.map((u, i) => (
        <div key={i} className="border p-2 my-1 rounded">
          #{i + 1} - {u.userId}: {u.score} pts
        </div>
      ))}
    </div>
  );
};

export default DashboardTab;