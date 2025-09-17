import React, { useEffect, useRef, useState } from "react";
import { useBotContext } from "@/context/BotContext";
import BotCard from "@/components/BotCard";
import { Input } from "@/components/ui/input";
import { Command } from "lucide-react";

const BuiltInBots: React.FC = () => {
  const { bots } = useBotContext();
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Search input pe focus krne ke liye code likha hai
  const filteredBots = bots.builtInBots.slice(1).filter((bot) =>
    bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bot.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // shortcut key press ke through input pe focus 
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

  return (
    <div className="my-5 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">Built In Bots</h1>
        <div className="relative md:w-64 w-48">
          <Input
            ref={searchInputRef}
            placeholder="Search bots... (Ctrl + K)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 shadow-none"
            aria-label="search bots"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-neutral-400 pointer-events-none flex items-center gap-1">
            <Command size={12} /> K
          </span>
        </div>
      </div>

      {filteredBots.length > 0 ? (
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

export default BuiltInBots;
