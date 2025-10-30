import React, { useState } from "react";
import Navbar from "./components/Navbar";
import DashboardTab from "./components/DashboardTab";
import QuizTab from "./components/QuizTab";
import GameTab from "./components/GameTab";
import DonationTab from "./components/DonationTab";
import ReferralTab from "./components/ReferralTab";
import MediaTab from "./components/MediaTab";
import LeaderboardTab from "./components/LeaderboardTab";

const App = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "quiz":
        return <QuizTab />;
      case "game":
        return <GameTab />;
      case "donation":
        return <DonationTab />;
      case "referral":
        return <ReferralTab />;
      case "media":
        return <MediaTab />;
      case "leaderboard":
        return <LeaderboardTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-500">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow p-6">{renderTab()}</main>
    </div>
  );
};

export default App;
