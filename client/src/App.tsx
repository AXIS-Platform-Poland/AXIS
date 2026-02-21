// src/App.tsx
import React, { useState } from "react";

// Экраны
import FeedScreen from "./pages/FeedScreen";
import ReelsScreen from "./pages/ReelsScreen";
import ChatScreen from "./pages/ChatScreen";
import ProfileScreen from "./pages/ProfileScreen";
import SettingsScreen from "./pages/SettingsScreen";

// Навигация
import BottomNav, { TabId } from "./components/layout/BottomNav";

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabId>("feed");

  const renderScreen = () => {
    switch (currentTab) {
      case "feed":
        return <FeedScreen />;
      case "reels":
        return <ReelsScreen />;
      case "chats":
        return <ChatScreen />;
      case "profile":
        return <ProfileScreen />;
      case "settings":
        return <SettingsScreen />;
      default:
        return <FeedScreen />;
    }
  };

  return (
    <div className="app-container">
      <div className="screen-container">{renderScreen()}</div>
      <BottomNav currentTab={currentTab} onChange={setCurrentTab} />
    </div>
  );
};

export default App;
