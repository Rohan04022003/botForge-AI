import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import gemini_logo from '@/assets/gemini.svg';
import mistral_logo from '@/assets/mistral.svg';
import cohere_logo from '@/assets/cohere.svg';
import { useBotContext } from "@/context/BotContext";
import type { BotCategory, BotFormProps } from "@/types/types";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { RotateCcw, Sparkles, } from "lucide-react";
import { toast } from "sonner";

const BotForm: React.FC<BotFormProps> = ({ botId, openBotForm }) => {
    const [addModel, setAddModel] = useState("gemini");
    const [botName, setBotName] = useState("");
    const [greetings, setGreetings] = useState("");
    const [description, setDescription] = useState("");
    const [role, setRole] = useState("");
    const [category, setCategory] = useState("");
    const [isBotNameDuplicate, setIsBotNameDuplicate] = useState(false);
    const [confirmDeleteInput, setConfirmDeleteInput] = useState("");

    // page navigation ke liye
    const navigate = useNavigate();

    //bot ka name params se liya hai
    const [searchParams] = useSearchParams();
    const suggestedName = searchParams.get("botName")

    const { addBot, editBot, deleteBot, bots } = useBotContext();

    const currentBotSettings = bots.userCreatedBots.find((bot) => bot.id === botId)

    const categories: { key: BotCategory; label: string }[] = [
        { key: "general", label: "General Assistant" },
        { key: "assistant", label: "Personal Assistant" },
        { key: "developer", label: "Developer Tools" },
        { key: "education", label: "Education & Learning" },
        { key: "lifestyle", label: "Lifestyle & Hobbies" },
        { key: "productivity", label: "Productivity" },
        { key: "utility", label: "Smart Utilities" },
        { key: "wellness", label: "Wellness & Self-Care" },
        { key: "entertainment", label: "Entertainment" },
    ];

    // yeh function mere current bot ka data load krega

    const setCurrentbotSettings = () => {
        if (currentBotSettings) {
            setBotName(currentBotSettings.name);
            setGreetings(currentBotSettings.greetings);
            setDescription(currentBotSettings.description);
            setRole(currentBotSettings.role);
            setCategory(currentBotSettings.category);
            setAddModel(currentBotSettings.model);
        }
    }

    // yaha pe bot name ko searchParams se leke bot name field me set krne ka logic 

    useEffect(() => {
        if (suggestedName) {
            setBotName(suggestedName)
        }
    }, [suggestedName])

    // useEffect se bot ka present data ko load krne ke liye

    useEffect(() => {
        setCurrentbotSettings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBotSettings])

    // Handle duplicate name check
    const checkDuplicateBotName = (name: string) => {
        const trimmed = name.trim();
        const botNameArray = bots.userCreatedBots.map(bot => bot.name.trim().toLowerCase());
        setIsBotNameDuplicate(botNameArray.includes(trimmed.toLowerCase()));
    };

    // Form submission handler
    const handleSubmit = () => {
        const trimmedName = botName.trim();
        const trimmedGreeting = greetings.trim();
        const trimmedDescription = description.trim();
        const trimmedRole = role.trim();

        if (currentBotSettings && botId) {
            editBot(botId, trimmedName, trimmedGreeting, trimmedDescription, trimmedRole, category, addModel); //yaha pe bot present hai toh edit hoga
        } else {
            addBot(trimmedName, trimmedGreeting, trimmedDescription, trimmedRole, category, addModel); //bot present nhi hai toh create hoga
            setAddModel("gemini")
            setGreetings("")
            setBotName("")
            setRole("")
            setDescription("")
            setCategory("")
        }
    };

    return (
        <div className={`${botId ? "" : "md:w-2/3 pt-2 pb-10"} w-full mx-auto`}>
            <div className={`rounded-lg shadow-none ${botId ? "bg-background" : ""}`}>
                <div className="flex justify-between items-start md:items-center gap-2 pb-8">
                    <h2 className="text-xl font-semibold">
                        {botId ? currentBotSettings?.name : "Create a New Bot"}
                    </h2>
                    <Link
                        to="/bot-creation-guide"
                        className={`${currentBotSettings ? "hidden" : "block"} text-sm underline text-neutral-500 dark:text-neutral-500 hover:text-neutral-600 transition`}
                    >
                        Bot Creation Guide
                    </Link>
                </div>
                <div className="space-y-6">

                    {/* Bot Name */}
                    <div className="space-y-2">
                        <Label htmlFor="botName">Bot Name</Label>
                        <Input
                            className="shadow-none"
                            id="botName"
                            placeholder="Enter bot name"
                            value={botName}
                            maxLength={20}
                            onChange={(e) => {
                                const value = e.target.value;
                                setBotName(value);
                                checkDuplicateBotName(value);
                            }}
                        />
                        <div className={`text-xs text-red-500 ${isBotNameDuplicate ? "flex" : "hidden"}`}>
                            {botName.trim()} bot already exists.
                        </div>
                    </div>

                    {/* Greetings */}
                    <div className="space-y-2">
                        <Label htmlFor="greetings">Greetings</Label>
                        <Input
                            className="shadow-none"
                            id="greetings"
                            placeholder="Hello there, how can I help you today?"
                            value={greetings}
                            maxLength={50}
                            onChange={(e) => setGreetings(e.target.value)}
                        />
                        <div className="text-xs text-muted-foreground text-right">
                            {greetings.length}/50
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Short Description</Label>
                        <Input
                            className="shadow-none"
                            id="description"
                            placeholder="Max 100 characters"
                            value={description}
                            maxLength={100}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="text-xs text-muted-foreground text-right">
                            {description.length}/100
                        </div>
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                        <Label htmlFor="role">Bot Role / Behavior</Label>
                        <Textarea
                            id="role"
                            placeholder="Define bot's instructions, tone, and purpose..."
                            value={role}
                            minLength={301}
                            maxLength={1500}
                            onChange={(e) => setRole(e.target.value)}
                            className="min-h-[160px] shadow-none"
                        />
                        <div className="w-full flex items-center justify-between text-xs text-muted-foreground">
                            <div>
                                {role.length !== 0 && role.length < 300 ? (
                                    <p className="text-red-500">Please write at least 300 characters.</p>
                                ) : role.length >= 300 ? (
                                    <p className="text-green-700">Looks good! You've provided enough detail.</p>
                                ) : null}
                            </div>
                            <p>{role.length}/1500</p>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger id="category">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category, index) => (
                                    <SelectItem key={index} value={category.key}>
                                        {category.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Model */}
                    <div className="space-y-2">
                        <Label htmlFor="model">AI Model</Label>
                        <Select value={addModel} onValueChange={setAddModel}>
                            <SelectTrigger id="model">
                                <SelectValue placeholder="Select Model" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="gemini">
                                    <img src={gemini_logo} alt="gemini" className="w-5 pr-1 inline-block" /> Gemini
                                </SelectItem>
                                <SelectItem value="mistral">
                                    <img src={mistral_logo} alt="mistral" className="w-5 pr-1 inline-block" /> Mistral
                                </SelectItem>
                                <SelectItem value="cohere">
                                    <img src={cohere_logo} alt="cohere" className="w-5 pr-1 inline-block" /> Cohere
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Submit */}
                    <div className="pt-2 flex items-center justify-center gap-3">
                        <Button
                            onClick={() => {
                                handleSubmit();
                                if (!botId) {
                                    navigate("/my-bots");
                                } else {
                                    openBotForm?.(false);
                                }
                            }}
                            type="submit"
                            className={`${currentBotSettings ? "w-1/2" : "w-full"}`}
                            disabled={
                                !botName.trim() ||
                                !greetings.trim() ||
                                !description.trim() ||
                                role.trim().length < 299 ||
                                !category ||
                                !addModel ||
                                isBotNameDuplicate ||
                                (currentBotSettings && (
                                    botName.trim() === currentBotSettings.name &&
                                    greetings.trim() === currentBotSettings.greetings &&
                                    description.trim() === currentBotSettings.description &&
                                    role.trim() === currentBotSettings.role &&
                                    category === currentBotSettings.category &&
                                    addModel === currentBotSettings.model
                                ))
                            }
                        >
                            <Sparkles /> {currentBotSettings ? "Save Changes" : "Create Bot"}
                        </Button>

                        <Button
                            onClick={setCurrentbotSettings}
                            className={`w-1/2 bg-green-500 hover:bg-green-400 text-white ${currentBotSettings ? "flex" : "hidden"}`}
                            disabled={
                                (currentBotSettings && (
                                    botName.trim() === currentBotSettings.name &&
                                    greetings.trim() === currentBotSettings.greetings &&
                                    description.trim() === currentBotSettings.description &&
                                    role.trim() === currentBotSettings.role &&
                                    category === currentBotSettings.category &&
                                    addModel === currentBotSettings.model
                                ))
                            }
                        >
                            <RotateCcw /> Reset Settings
                        </Button>

                    </div>
                    {
                        (!botName.trim() ||
                            !greetings.trim() ||
                            !description.trim() ||
                            role.trim().length < 300 ||
                            !category ||
                            !addModel) && (
                            <p className={`text-sm text-muted-foreground text-center mt-2 ${currentBotSettings ? "hidden" : "text-center"}`}>
                                Please fill all fields correctly.
                            </p>
                        )
                    }

                    {currentBotSettings && (
                        <div className="w-full flex flex-col md:flex-row items-center gap-3 md:gap-5">
                            <Input
                                placeholder="Type bot name to confirm delete"
                                value={confirmDeleteInput}
                                onChange={(e) => setConfirmDeleteInput(e.target.value)}
                            />
                            <Button
                                onClick={() => {
                                    if (botId) {
                                        deleteBot(botId);
                                        openBotForm?.(false)
                                        navigate("/");
                                    } else {
                                        toast.error("Bot Not Found!!!")
                                    }
                                }}
                                variant="destructive"
                                className="w-full md:w-1/4"
                                disabled={confirmDeleteInput.trim() !== currentBotSettings?.name}
                            >
                                Delete Bot
                            </Button>

                        </div>
                    )}


                </div>
            </div>
        </div>
    );
};

export default BotForm;
