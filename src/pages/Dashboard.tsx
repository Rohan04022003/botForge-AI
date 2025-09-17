import BotCard from "@/components/BotCard"
import Hero from "@/components/Hero"
import { Button } from "@/components/ui/button";
import { useBotContext } from "@/context/BotContext";
import type { BotsData } from "@/types/types";
import { ArrowRight, Bot } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {

  const { bots } = useBotContext();
  const navigate = useNavigate();
  const [filteredBots, setFilteredBots] = useState<BotsData>(bots);
  const [activeView, setActiveView] = useState("BotForge AI");
  const [searchInputs, setSearchInputs] = useState("");

  useEffect(() => {
    const search = searchInputs.trim().toLowerCase(); // yaha pe inputs ko lower case me kiya ki errors na aaye

    if (activeView === "BotForge AI") {
      // sabhi bots dikhenge bina filter ke
      setFilteredBots({ builtInBots: bots.builtInBots.slice(1), userCreatedBots: bots.userCreatedBots });

    } else if (activeView === "Built in Bots") {
      // built-in bots filter honge, userCreatedBots empty
      const filteredBuiltIn = bots.builtInBots.slice(1).filter(bot =>
        bot.name.toLowerCase().includes(search)
      );

      setFilteredBots({
        builtInBots: filteredBuiltIn,
        userCreatedBots: [],
      });

    } else if (activeView === "Your Bots") {
      // user created bots filter honge builtInBots empty
      const filteredUserBots = bots.userCreatedBots.filter(bot =>
        bot.name.toLowerCase().includes(search)
      );

      setFilteredBots({
        builtInBots: [],
        userCreatedBots: filteredUserBots,
      });
    }
  }, [activeView, bots, searchInputs]);

  return (
    <div className="mb-14">
      {/* Yaha pe hamne hero commponent ko mount kiya hai jisme ai search and bots filter buttons hai  */}
      <Hero activeView={activeView} setActiveView={setActiveView} search={searchInputs} setSearch={setSearchInputs} />

      {/* Agar bots nhi milenge toh yeh display hoga aur create button pe click krte hi bot create form pe le jayega  */}
      {filteredBots.builtInBots.length === 0 && filteredBots.userCreatedBots.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-20 text-muted-foreground">
          <Bot className="w-12 h-12 mb-4 text-primary" role="img" aria-label="Bot icon" />
          <p className="text-lg font-medium">No bots found</p>
          <p className="text-sm mb-4">We couldn’t find any bots matching “{searchInputs.trim()}”.</p>
          <Link to={`/create-bot?botName=${encodeURIComponent(searchInputs.trim())}`}>
            <Button 
              variant={"outline"} 
              className="bg-background text-black dark:text-white"
              aria-label={`Create bot named ${searchInputs.trim()}`}
            >
              Create “{searchInputs.trim()}”
            </Button>
          </Link>
        </div>
      )}

      {/* Yaha pe user created bots ko show kiya hai. */}
      <div className="w-full flex justify-between items-center">
        <h2 className={`py-6 text-2xl font-semibold ${filteredBots.userCreatedBots.length > 0 ? 'block' : 'hidden'}`}>Your Bots</h2>
        <Button 
          onClick={() => navigate('/my-bots')} 
          variant={"outline"} 
          size={"icon"} 
          className={`shadow-none rounded-full ${filteredBots.userCreatedBots.length > 4 ? "flex" : "hidden"}`}
          aria-label="Go to My Bots"
        >
          <ArrowRight />
        </Button>
      </div>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredBots.userCreatedBots.length > 0 && filteredBots.userCreatedBots.slice(0, 8).map((bot) => (
          <BotCard key={bot.id} bot={bot} />
        ))}
      </div>

      {/* Built In Bots section */}
      <div className="w-full flex justify-between items-center">
        <h2 className={`py-6 text-2xl font-semibold ${filteredBots.builtInBots.length > 0 ? 'block' : 'hidden'}`}>Built In Bots</h2>
        <Button 
          onClick={() => navigate('/built-in')} 
          variant={"outline"} 
          size={"icon"} 
          className={`shadow-none rounded-full ${filteredBots.builtInBots.length > 4 ? "flex" : "hidden"}`}
          aria-label="Go to Built-in Bots"
        >
          <ArrowRight />
        </Button>
      </div>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredBots.builtInBots.slice(0, 8).map((bot) => (
          <BotCard key={bot.id} bot={bot} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
