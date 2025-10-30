import React, { useState } from "react";
import { submitGame } from "../api";

const GameTab = () => {
  const [userId, setUserId] = useState("");
  const [gameId, setGameId] = useState("");
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await submitGame({ userId, gameId, score });
      setStatus("Game submitted: " + JSON.stringify(res));
    } catch (err) {
      setStatus("Game failed: " + err.message);
    }
  };

  return (
    <div>
      <h2 className="p-6 rounded-lg bg-blue-500 text-white">
        Submit Game Score
      </h2>
      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-1 mb-1 w-full"
      />
      <input
        placeholder="Game ID"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
        className="border p-1 mb-1 w-full"
      />
      <input
        type="number"
        placeholder="Score"
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
        className="border p-1 mb-1 w-full"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Game
      </button>
      <p className="mt-2">{status}</p>
    </div>
  );
};

export default GameTab;
