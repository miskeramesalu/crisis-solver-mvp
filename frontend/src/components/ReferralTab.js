import React, { useState } from "react";
import { submitReferral } from "../api";

const ReferralTab = () => {
  const [referrerId, setReferrerId] = useState("");
  const [newUserId, setNewUserId] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await submitReferral({ referrerId, newUserId });
      setStatus("Referral submitted: " + JSON.stringify(res));
    } catch (err) {
      setStatus("Referral failed: " + err.message);
    }
  };

  return (
    <div>
      <h2 className="p-6 rounded-lg bg-yellow-500 text-white">Referral</h2>
      <input
        placeholder="Referrer ID"
        value={referrerId}
        onChange={(e) => setReferrerId(e.target.value)}
        className="border p-1 mb-1 w-full"
      />
      <input
        placeholder="New User ID"
        value={newUserId}
        onChange={(e) => setNewUserId(e.target.value)}
        className="border p-1 mb-1 w-full"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Referral
      </button>
      <p className="mt-2">{status}</p>
    </div>
  );
};

export default ReferralTab;
