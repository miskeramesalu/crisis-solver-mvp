import React, { useState, useEffect } from "react";
import { fetchLeaderboard } from "../api";

const LeaderboardTab = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await fetchLeaderboard();
      if (data && data.length > 0) {
        setLeaders(data);
        setStatus("✅ Leaderboard updated successfully");
      } else {
        setLeaders([]);
        setStatus("⚠️ No leaderboard data yet. Try playing a quiz or game!");
      }
    } catch (err) {
      setStatus("❌ Failed to load leaderboard: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaderboard();
    const interval = setInterval(loadLeaderboard, 10000); // Auto-refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 rounded-lg bg-blue-50 shadow">
      <h2 className="text-2xl font-bold mb-4 text-orange-700">
        🏆 Leaderboard
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading leaderboard...</p>
      ) : leaders.length === 0 ? (
        <p className="text-gray-600">{status}</p>
      ) : (
        <table className="w-full text-left border-collapse bg-white rounded shadow">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="border-b p-2">Rank</th>
              <th className="border-b p-2">User</th>
              <th className="border-b p-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((l, i) => (
              <tr key={l.userId} className="hover:bg-gray-100">
                <td className="p-2 font-medium text-gray-800">{i + 1}</td>
                <td className="p-2 text-gray-700">{l.userId}</td>
                <td className="p-2 font-semibold text-blue-600">{l.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p className="mt-3 text-sm text-gray-700">{status}</p>
    </div>
  );
};

export default LeaderboardTab;