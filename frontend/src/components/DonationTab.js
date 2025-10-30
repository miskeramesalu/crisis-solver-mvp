import React, { useState } from "react";
import { submitDonation } from "../api";

const DonationTab = () => {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await submitDonation({ donorId: userId, amount, currency });
      setStatus("Donation submitted: " + JSON.stringify(res));
    } catch (err) {
      setStatus("Donation failed: " + err.message);
    }
  };

  return (
    <div>
      <h2 className="p-6 rounded-lg bg-orange-500 text-white">Donation</h2>
      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-1 mb-1 w-full"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-1 mb-1 w-full"
      />
      <input
        placeholder="Currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="border p-1 mb-1 w-full"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Donate
      </button>
      <p className="mt-2">{status}</p>
    </div>
  );
};

export default DonationTab;
