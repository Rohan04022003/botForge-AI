import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import MyBots from "@/pages/MyBots";
import CreateBot from "@/pages/CreateBot";
import BuiltInBots from "@/pages/BuiltInBots";
import Chats from "@/pages/Statistics";
import Settings from "@/pages/Settings";
import ChatInterface from "@/pages/ChattingPage";
import BotCreationGuide from "@/pages/BotCreationGuide";
import AboutUs from "@/pages/AboutUs";
import ScrollToTop from "@/components/ScrollToTop";

const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/my-bots" element={<MyBots />} />
          <Route path="/create-bot" element={<CreateBot />} />
          <Route path="/built-in" element={<BuiltInBots />} />
          <Route path="/statistics" element={<Chats />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/bot-creation-guide" element={<BotCreationGuide />} />
          <Route path="/chatting-page/:botID" element={<ChatInterface />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
