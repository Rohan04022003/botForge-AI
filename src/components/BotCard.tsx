import { Sparkles } from "lucide-react";
import logo from '@/assets/logo.svg'
import { useNavigate } from "react-router-dom";
import type { BotCardProp } from "@/types/types";
import gemini_logo from '@/assets/gemini.svg'
import mistral_logo from '@/assets/mistral.svg'
import cohere_logo from '@/assets/cohere.svg'

const BotCard: React.FC<BotCardProp> = ({ bot }) => {

  const navigate = useNavigate()

  return (
    <div className="w-full flex flex-col justify-between rounded-xl border border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-white/5 backdrop-blur-md p-4 transition-all hover:shadow-lg hover:scale-[102%] duration-300">
      <div className="w-12 h-12 p-3 rounded-lg bg-blue-100 dark:bg-secondary flex items-center justify-center mb-4">
        <img src={logo} alt="botforge" className="w-8" />
      </div>
      <div className="space-y-1 flex flex-col h-full justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{bot.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {bot.description}
        </p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          <span className="bg-secondary px-2 py-0.5 rounded-full">{bot.category}</span>
          <span className="bg-secondary px-2 py-0.5 rounded-full flex items-center gap-2">
            <span>
              {bot.model === 'gemini' ? <img src={gemini_logo} alt="gemini" className="w-3" /> : ""}
              {bot.model === 'mistral' ? <img src={mistral_logo} alt="mistral" className="w-3" /> : ""}
              {bot.model === 'cohere' ? <img src={cohere_logo} alt="cohere" className="w-2" /> : ""}
            </span>
            {bot.model.charAt(0).toUpperCase() + bot.model.slice(1)}
          </span>
        </div>

        {/* yaha se hum navigation ka use kar ke chatting page pe jayenge */}
        <button onClick={() => navigate(`/chatting-page/${bot.id}`)} className="mt-4 w-full text-sm bg-gradient-to-r from-red-600 via-blue-500 to-sky-400 text-white py-1.5 rounded-md transition-all flex items-center justify-center gap-1 cursor-pointer">
          <Sparkles size={16} /> Chat Now
        </button>
      </div>
    </div>
  );
};

export default BotCard;
