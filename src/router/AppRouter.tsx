import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/layout/DashboardLayout";
import ScrollToTop from "@/components/ScrollToTop";
// lazy loading ka use kiye hai because of performance.
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const MyBots = lazy(() => import("@/pages/MyBots"));
const CreateBot = lazy(() => import("@/pages/CreateBot"));
const BuiltInBots = lazy(() => import("@/pages/BuiltInBots"));
const Chats = lazy(() => import("@/pages/Statistics"));
const Settings = lazy(() => import("@/pages/Settings"));
const ChatInterface = lazy(() => import("@/pages/ChattingPage"));
const BotCreationGuide = lazy(() => import("@/pages/BotCreationGuide"));
const AboutUs = lazy(() => import("@/pages/AboutUs"));

const AppRouter = () => {
  return (
    <div aria-label="Main App Router">
      <ScrollToTop />

      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen text-center text-xl font-medium text-primary">
            Loading your AI workspace...
          </div>
        }
      >
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
      </Suspense>
    </div>
  );
};

export default AppRouter;
