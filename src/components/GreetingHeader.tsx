import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

const GreetingHeader = () => {
  const { user } = useUser();
  const [randomLine, setRandomLine] = useState<number | null>(null);

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 20) return "Good Evening";
    return "Burning the midnight oil?";
  };

  const greeting = getTimeGreeting();
  const firstName = user?.name?.split(" ")[0] || "there";

  const lines = [
    "✨ Let’s craft brilliance — your AI co-pilot is ready.",
    "🚀 Your genius bot is only a click away. Let’s build magic!",
    "🎨 You imagine it. I’ll automate it — beautifully & smartly.",
    "🧠 One click closer to your AI-powered masterpiece.",
    "⚙️ Turning ideas into intelligent conversations — instantly.",
    `👋 Hey ${firstName}, your BotForge lab is live and waiting!`,
    "🌌 Innovation meets automation — right here, right now.",
    "🛠️ Build smarter, think bolder — the BotForge way.",
    "🎯 From concept to chatbot — let’s make it iconic.",
    "🔮 Powering dreams with data and personality.",
    "🌟 Your creativity + my intelligence = unforgettable bots."
  ];

  useEffect(() => {
    setRandomLine(Math.floor(Math.random() * lines.length)); //first page load ya reload hoga tb geetings change honge
  }, []);

  if (randomLine === null) return null;

  return (
    <div className="text-center mt-6 mb-8">
      <h2 className="md:pt-0 italic md:text-3xl text-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
        {greeting}, {firstName}
      </h2>
      <p className="mt-2 text-base italic text-muted-foreground">{lines[randomLine]}</p>
    </div>
  );
};

export default GreetingHeader;
