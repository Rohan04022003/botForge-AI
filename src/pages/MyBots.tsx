import React, { useEffect, useRef, useState } from "react";
import { useBotContext } from "@/context/BotContext";
import BotCard from "@/components/BotCard";
import { Input } from "@/components/ui/input";
import { Bot, Command } from "lucide-react";

const MyBots: React.FC = () => {
  const { bots } = useBotContext();
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Search input pe focus krne ke liye code likha hai
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter bots name or description according
  const filteredBots = bots.userCreatedBots.filter((bot) =>
    bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bot.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lg:my-3 my-2 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">My Bots</h1>
        <div className="relative md:w-64 w-56">
          <Input
          aria-label="search bots"
            ref={searchInputRef}
            placeholder="Search bots..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 shadow-none"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-neutral-400 pointer-events-none flex items-center gap-1">
            <Command size={12} /> K
          </span>
        </div>
      </div>

      {bots.userCreatedBots.length === 0 ? (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center text-neutral-500 dark:text-neutral-400">
          <Bot size={60} />
          <h2 className="text-lg font-semibold md:mt-3 mt-1">No bots created yet</h2>
          <p className="text-sm mt-1 md:flex hidden">Start building your own custom AI assistant — it’s easy and fun!</p>
        </div>
      ) : filteredBots.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredBots.map((bot) => (
            <BotCard key={bot.id} bot={bot} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-neutral-500">No bots match your search.</p>
      )}
    </div>
  );
};

export default MyBots;
