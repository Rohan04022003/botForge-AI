import {
  LayoutDashboard,
  Bot,
  Hammer,
  PlusCircle,
  Book,
  Info,
  PieChart,
  Settings,
  Sparkles,
} from "lucide-react";

export const SidebarLinks = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
    description: "Show overall summary, quick access",
  },
  {
    title: "BotForge AI",
    path: "/chatting-page/0",
    icon: Sparkles,
    description: "Show overall summary, quick access",
  },
  {
    title: "My Bots",
    path: "/my-bots",
    icon: Bot,
    description: "Show bots user created",
  },
  {
    title: "Built-in Bots",
    path: "/built-in",
    icon: Hammer,
    description: "Health Coach, Interview Bot etc.",
  },
  {
    title: "Create Bot",
    path: "/create-bot",
    icon: PlusCircle,
    description: "Role description + prompt generator",
  },
  {
    title: "Bot Creation Guide",
    path: "/bot-creation-guide",
    icon: Book,
    description: "Read Bot Creation Guide",
  },
  {
    title: "Statistics",
    path: "/statistics",
    icon: PieChart,
    description: "All previous chats, maybe downloadable",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
    description: "Theme, voice on/off, language etc.",
  },
  {
    title: "About Us",
    path: "/about-us",
    icon: Info,
    description: "All information about our website",
  },
];
