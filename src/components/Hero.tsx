import {
    ArrowRight,
    ArrowUp,
    Bot as BotIcon,
    ChevronDown,
    Hammer,
    Minus,
    Search,
} from "lucide-react";
import { Button } from "./ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@radix-ui/react-select";
import { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import { useBotContext } from "@/context/BotContext";
import logo from "@/assets/logo.svg";
import { getPlaceholder } from "@/data/HeroInputPlaceholders";
import { handleSendMessage } from "@/utils/handleSendMessage";
import { modelOptions } from "@/data/ModelOptions";
import GreetingHeader from "./GreetingHeader";
import type { HeroProps } from "@/types/types";
import { VoiceInput } from "./VoiceInput";



const Hero: React.FC<HeroProps> = ({ activeView, setActiveView, search, setSearch }) => {
    const [message, setMessage] = useState("")

    const navigate = useNavigate(); // navigation ke liye.
    const {
        setUserMessage,
        setModel,
        model,
        botRole,
        setBotRole,
        bots,
        saveBotModel,
        setBotResponse,
        setLoading,
        updateChat,
        setListening
    } = useBotContext(); // bot ke sare configs ko le rhe hai aur use kr rhe hai.

    useEffect(() => {
        setUserMessage(message);
    }, [message, setUserMessage]); //yaha pe user message set kr rhe hai.

    useEffect(() => {
        if (bots.builtInBots.length > 0) { // yaha pe jo hamara botforge main ai hai uske model ho set kr rhe hai aur role ko bhi.
            setModel(bots.builtInBots[0].model);
            setBotRole(bots.builtInBots[0].role);
        }
    }, [bots.builtInBots, setModel, setBotRole]);

    const navButtons = [
        { label: "BotForge AI", icon: <img src={logo} alt="botforge-ai" className="w-4" />, badge: "new" },
        { label: "Built in Bots", icon: <Hammer className="w-4 h-4" /> },
        { label: "Your Bots", icon: <BotIcon className="w-4 h-4" /> },
    ];

    const handleSend = () => { // yaha se botforge ai ke data ko handle kr rhe hai.
        handleSendMessage({
            message,
            model,
            botRole,
            botID: "0",
            setLoading,
            setUserMessage,
            setBotResponse,
            updateChat,
            setMessage,
        });
        navigate("chatting-page/0");
    };

    const handleModelChange = (newModel: string, id: string = "0") => { // yaha se botforge ke model ko access or change kr rhe hai.
        setModel(newModel);
        saveBotModel(newModel, id);
    };

    return (
        <div className="w-full">

            {/* yeh component greetings ke liye hai */}
            {activeView === "BotForge AI" && <GreetingHeader />}

            <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
                {navButtons.map((btn) => (
                    <Button
                        key={btn.label}
                        onClick={() => setActiveView(btn.label)}
                        variant="outline"
                        size="sm"
                        className={`relative shadow-none rounded-md text-sm px-3 py-1 flex items-center gap-2 transition-all backdrop-blur-[10px] ${activeView === btn.label
                            ? "bg-blue-50 border-blue-300 text-blue-900 dark:bg-secondary dark:text-white"
                            : ""
                            }`}
                    >
                        {btn.badge && (
                            <span className="bg-blue-700 text-white rounded-[4px] px-2 py-[.1rem] text-[.6rem] -top-3 -right-1 absolute">
                                {btn.badge}
                            </span>
                        )}
                        {btn.icon}
                        <span className="text-[.7rem]">{btn.label}</span>
                    </Button>
                ))}
            </div>

            <div className="flex justify-center">
                <div className="relative w-full md:w-4/5 lg:w-2/3 group">
                    <div className="z-0 absolute -inset-1 rounded-full blur opacity-0 group-focus-within:opacity-40 transition duration-500 group-focus-within:blur-[10rem] pointer-events-none bg-gradient-to-r from-red-400 via-blue-400 to-sky-400" />

                    <div className="relative rounded-md border bg-white dark:bg-[#101010] transition-all p-2">
                        {activeView === "BotForge AI" ? (
                            <>
                                <textarea
                                    aria-label="user message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder={getPlaceholder(activeView)}
                                    className="w-full resize-none border-none outline-none shadow-none p-2 h-[7rem] overflow-y-auto rounded-md text-sm dark:placeholder:text-gray-500 placeholder:text-gray-400"
                                />
                                <div className="flex justify-between items-center mt-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <img src={logo} alt="botforge ai logo" className="w-4" />
                                        <span className="dark:text-neutral-400 text-neutral-600">BotForge</span>
                                        <Minus size={20} className="rotate-90" />
                                        <Select value={model} onValueChange={handleModelChange}>
                                            <SelectTrigger aria-label="model seletion" className="flex items-center gap-2 px-2 py-1 border rounded-sm outline-none cursor-pointer">
                                                <img
                                                    src={modelOptions.find((m) => m.value === model)?.icon}
                                                    alt=""
                                                    className="w-4"
                                                />
                                                <span>{model.charAt(0).toUpperCase() + model.slice(1)}</span>
                                                <ChevronDown size={10} className="mt-1" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-secondary px-1 py-2 rounded-md cursor-pointer">
                                                {modelOptions.map(({ label, value, icon }) => (
                                                    <SelectItem
                                                        key={value}
                                                        value={value}
                                                        className={`flex items-center gap-2 text-sm px-4 py-1 hover:bg-background border-none outline-none rounded-md ${model === value ? "bg-background" : ""}`}
                                                    >
                                                        <img src={icon} alt={label} className="w-4" />
                                                        {label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {/* voice input componenets */}

                                        <VoiceInput setMessage={setMessage} />

                                        <Button
                                            aria-label="send user query"
                                            onClick={() => { handleSend(); setListening(false) }}
                                            disabled={!message}
                                            className={`w-8 h-8 rounded-full ${message ? "bg-blue-500 hover:bg-blue-400" : "border border-neutral-600 bg-transparent"}`}
                                        >
                                            <ArrowUp color={message ? "white" : "gray"} size={15} />
                                        </Button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center px-2">
                                <Search size={18} className="text-gray-500" />
                                <input
                                    aria-label="search bot"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder={getPlaceholder(activeView)}
                                    className="w-full bg-transparent text-sm px-3 py-4 outline-none"
                                />
                                <Button
                                    disabled={!search}
                                    className={`w-8 h-8 rounded-full ${search ? "bg-blue-500 hover:bg-blue-400" : "border border-neutral-600 bg-transparent"}`}
                                >
                                    <ArrowRight color={search ? "white" : "gray"} size={15} />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;