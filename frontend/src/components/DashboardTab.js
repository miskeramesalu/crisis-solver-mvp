// import React, { useEffect, useState } from "react";
// import { fetchLeaderboard, fetchUserBalance } from "../api";

// const DashboardTab = () => {
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [userId, setUserId] = useState("");
//   const [balance, setBalance] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState("");

//   // Load leaderboard on mount
//   useEffect(() => {
//     fetchLeaderboard().then(setLeaderboard);
//   }, []);

//   // Optional: auto-load balance when user ID changes
//   useEffect(() => {
//     if (userId.trim()) loadBalance();
//   }, [userId]);

//   // Load user balance
//   const loadBalance = async () => {
//     if (!userId.trim()) {
//       setStatus("⚠️ Please enter a valid User ID");
//       return;
//     }
//     try {
//       setLoading(true);
//       setStatus("Fetching balance...");
//       const b = await fetchUserBalance(userId);
//       setBalance(b);
//       setStatus("✅ Balance updated successfully");
//     } catch (err) {
//       setStatus("❌ Failed to load balance: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2 className="p-6 rounded-lg bg-[brown] text-white text-xl font-semibold mb-4">
//         Dashboard
//       </h2>

//       <div className="mb-4">
//         <input
//           placeholder="Enter your Hedera Account ID (e.g. 0.0.7093641)"
//           value={userId}
//           onChange={(e) => setUserId(e.target.value)}
//           className="border border-gray-400 p-2 rounded w-full mb-2"
//         />
//         <button
//           onClick={loadBalance}
//           disabled={loading}
//           className={`px-4 py-2 rounded text-white ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {loading ? "Loading..." : "Load Balance"}
//         </button>
//         <p className="mt-2 text-sm text-gray-700">{status}</p>
//       </div>

//       <p className="font-medium mb-4">
//         💰 Current Balance: <span className="text-green-700">{balance}</span>
//       </p>

//       <h3 className="font-semibold mt-4 mb-2 text-lg">🏆 Leaderboard</h3>
//       {leaderboard.length === 0 ? (
//         <p>No leaderboard data available.</p>
//       ) : (
//         leaderboard.map((u, i) => (
//           <div
//             key={i}
//             className="border p-2 my-1 rounded bg-gray-50 hover:bg-gray-100"
//           >
//             #{i + 1} - <strong>{u.userId}</strong>: {u.score} pts
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default DashboardTab;


import React, { useEffect, useState } from "react";
import { fetchLeaderboard, fetchUserBalance } from "../api";

const DashboardTab = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userId, setUserId] = useState("");
  const [balance, setBalance] = useState(0);

  const loadAll = async () => {
    if (userId) {
      const b = await fetchUserBalance(userId);
      setBalance(b);
    }
    const lb = await fetchLeaderboard();
    setLeaderboard(lb);
  };

  useEffect(() => {
    loadAll();
    const interval = setInterval(loadAll, 8000); // refresh every 8 seconds
    return () => clearInterval(interval);
  }, [userId]);

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
        onClick={loadAll}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        🔄 Refresh Balance
      </button>
      <p className="mt-2 text-lg font-semibold text-green-700">
        Balance: {balance} Tokens
      </p>

      <h3 className="font-semibold mt-4">Leaderboard (Top 5)</h3>
      {leaderboard.slice(0, 5).map((u, i) => (
        <div key={i} className="border p-2 my-1 rounded">
          #{i + 1} - {u.userId}: {u.score} pts
        </div>
      ))}
    </div>
  );
};

export default DashboardTab;
