import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "./ui/sidebar";
import { Edit, Moon, PlusCircle, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/context/theme-provider";
import { useLocation, useNavigate } from "react-router-dom";
import { useBotContext } from "@/context/BotContext";
import { BotSettings } from "./BotSettings";

const Header = () => {
    const { theme, setTheme } = useTheme(); // yaha se hum theme use and set kr rhe hai.
    const location = useLocation(); // location get kr rhe hai.
    const navigate = useNavigate(); // page navigation ke liye.
    const { setBotResponse, setUserMessage } = useBotContext(); // yaha se user message and bot response ko le rhe hai.

    const setNewPage = () => { // when click on new page tb bot response and user message ko empty kr denge.
        setBotResponse("");
        setUserMessage("");
    };

    return (
        <header
            className={`flex h-14 items-center gap-2 z-10 sticky top-0 transition-colors duration-300 `}
        >
            <div className="flex gap-2 items-center">
                <SidebarTrigger className="-ml-1 cursor-pointer backdrop-blur-[10px] " />
                <Separator orientation="vertical" className="h-6" />
                <Edit
                    onClick={setNewPage}
                    size={25}
                    className={`backdrop-blur-[10px] cursor-pointer p-1 rounded-md hover:bg-secondary shadow-none ${location.pathname.includes("chatting-page") ? "flex" : "hidden"
                        }`}
                />
            </div>

            <div className="flex justify-end items-center w-full">
                <div className="flex items-center">
                    {/* Theme toggle ke liye */}
                    <Button
                        aria-label="theme switcher button"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        variant="outline"
                        size="icon"
                        className="backdrop-blur-[10px] bg-transparent shadow-none mr-2"
                    >
                        {theme === "dark" ? (
                            <Sun className="h-4 w-4" />
                        ) : (
                            <Moon className="h-4 w-4" />
                        )}
                    </Button>

                    {/* Create Bot Button*/}
                    <Button
                        onClick={() => navigate("/create-bot")}
                        variant="outline"
                        className={`backdrop-blur-[10px] bg-transparent shadow-none ${location.pathname.includes("chatting-page") ||
                            location.pathname.includes("create-bot")
                            ? "hidden"
                            : "flex"
                            }`}
                    >
                        <PlusCircle />
                        Create Bot
                    </Button>

                    {/* Bot Settings button */}
                    <BotSettings />
                </div>
            </div>
        </header>
    );
};

export default Header;
