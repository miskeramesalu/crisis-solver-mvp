import React, { useState, useEffect } from "react";
import { fetchLeaderboard } from "../api";

const LeaderboardTab = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchLeaderboard();
      setLeaders(data);
    };
    load();
  }, []);

  return (
    <div className="p-6 rounded-lg bg-red-500 text-white">
      <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Rank</th>
            <th className="border-b p-2">User</th>
            <th className="border-b p-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((l, i) => (
            <tr key={l.userId}>
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{l.userId}</td>
              <td className="p-2 font-semibold text-blue-600">{l.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTab;