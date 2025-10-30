import React from "react";
import logo from "../assets/logo.png"; // ✅ Place your logo in src/assets/logo.png

const Navbar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    "dashboard",
    "quiz",
    "game",
    "donation",
    "referral",
    "media",
    "leaderboard",
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-orange-600 shadow-md">
      {/* ✅ Logo + Title Section */}
      <div className="flex items-center space-x-3">
        <img
          src={logo}
          alt="Crisis Solver Logo"
          className="h-10 w-10 rounded-full object-cover"
        />
        <span className="font-bold text-xl text-blue-700 tracking-wide">
          Crisis Solver
        </span>
      </div>

      {/* ✅ Navigation Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mt-2 sm:mt-0">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg capitalize transition-all duration-200 ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
