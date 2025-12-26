import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useBotContext } from "@/context/BotContext";
import { Bot } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import BotForm from "./BotForm";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";

export function BotSettings() {

    const [isOpenBotForm, setIsOpenBotForm] = useState(false); // yaha pe check kr rhe hai ki bot settings section open hai ya close.

    const location = useLocation(); // yaha pe page ka location get kr rhe hai.
    const { botID } = useParams<{ botID: string }>(); // yaha pe botId le rhe hai from params.

    const { bots } = useBotContext(); // yaha se hum unn sare bots ko le rhe hai.

    const builtInBotData = bots.builtInBots.find((bot) => bot.id === botID) // yaha pe hum specific bot ko choose kr rhe hai.

    return (
        <Dialog open={isOpenBotForm} onOpenChange={setIsOpenBotForm}>
            <DialogTrigger asChild>
                <Button
                    aria-label="go to bot settings page"
                    variant="outline"
                    size="sm"
                    className={`backdrop-blur-[10px] bg-transparent py-4 shadow-none ${location.pathname.includes("chatting-page")
                        ? builtInBotData
                            ? "hidden"
                            : "flex"
                        : "hidden"
                        }`}
                >
                    <Bot />
                    Settings
                </Button>
            </DialogTrigger>
            <DialogTitle className="hidden">Bot Settings</DialogTitle>
            <DialogDescription aria-describedby={undefined} />
            <DialogContent className="md:max-w-[70%] w-[95vw] md:max-h-[90%] h-[90vh] overflow-y-scroll no-scrollbar px-5 md:pt-2 pt-0 pb-7">
                <BotForm botId={botID} openBotForm={setIsOpenBotForm} /> {/* yaha se bot ka total data botForm me jayega aur waha pe input fields me set ho jayega aur waha se data upload bhi kr sakte hai */}
            </DialogContent>
        </Dialog>
    )
}
