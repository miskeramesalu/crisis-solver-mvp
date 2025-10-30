import React from "react";

export default function Tabs({ currentTab, setTab }) {
  const tabs = ["Media", "Quiz", "Game", "Donation", "Referral", "Dashboard"];
  return (
    <div className="flex space-x-2 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 rounded ${
            currentTab === tab
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
