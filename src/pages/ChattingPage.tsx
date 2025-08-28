import { Minus, ChevronDown, ArrowUp } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.svg";
import { useBotContext } from "@/context/BotContext";
import type { Bot } from "@/types/types";
import BotResponseBox from "@/components/BotResponseBox";
import { handleSendMessage } from "@/utils/handleSendMessage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@radix-ui/react-select";
import { modelOptions } from "@/data/ModelOptions";
import { Button } from "@/components/ui/button";
import { VoiceInput } from "@/components/VoiceInput";

const ChatInterface = () => {
  const { botID } = useParams();
  const [message, setMessage] = useState("");
  const [currentBot, setCurrentBot] = useState<Bot | null>(null);

  const {
    bots,
    setModel,
    model,
    loading,
    setLoading,
    userMessage,
    setUserMessage,
    botResponse,
    setBotResponse,
    botRole,
    setBotRole,
    updateChat,
    saveBotModel,
    setListening
  } = useBotContext();

  useEffect(() => {
    // jb userMessage hero se aayega toh empty nhi hoga.
    if (!userMessage) {
      setBotResponse("");
      setUserMessage("");
    }
  }, [botID, setBotResponse, setUserMessage, userMessage]);

  useEffect(() => {
    if (botID && bots) {
      const foundBot =
        bots.builtInBots.find((bot) => bot.id === botID) ||
        bots.userCreatedBots.find((bot) => bot.id === botID);

      if (foundBot) {
        setCurrentBot(foundBot);
        setModel(foundBot.model);
        setBotRole(foundBot.role);
      }
    }
  }, [botID, bots, setModel, setBotRole]);

  const handleModelChange = (newModel: string, id: string = "0") => {
    console.log(newModel);
    setModel(newModel);
    saveBotModel(newModel, id);
  };

  const handleSend = async () => {
    handleSendMessage({
      message,
      model,
      botRole,
      botID: botID || "",
      setLoading,
      setUserMessage,
      setBotResponse,
      updateChat,
      setMessage,
    });
    setMessage("");
  };

  const showGreeting = !userMessage && !botResponse && !loading;

  return (
    <div className="flex flex-col min-h-[90vh] bg-background relative">
      {/* Chat Area */}
      <div className="flex w-full justify-center flex-grow overflow-hidden">
        <div className="lg:w-2/3 w-full py-4 overflow-y-auto no-scrollbar relative">
          <div className="space-y-8">
            {showGreeting && currentBot?.greetings && (
              <div className="w-full flex flex-col justify-center items-center gap-1 h-[65vh]">
                <div className="flex items-center gap-2">
                  <img src={logo} className="w-6" />
                  <p className="text-[1.5rem] text-neutral-500">
                    {currentBot.name}
                  </p>
                </div>
                <p className="md:text-[1.2rem] text-[.8rem] text-center text-neutral-500 italic">
                  {currentBot.greetings}
                </p>
              </div>
            )}

            {/* user ka input show hoga yaha pe  */}

            {userMessage && (
              <div className="user-query flex justify-end w-full">
                <div className="md:max-w-[80%] max-w-[90%] w-fit bg-secondary py-3 px-4 rounded-xl">
                  <p className="text-[0.95rem] dark:text-neutral-300 text-neutral-700">
                    {userMessage}
                  </p>
                </div>
              </div>
            )}

            {/* jbtak data nhi aa jata tabtak yeh loading show hoga  */}

            {loading && (
              <div className="w-full flex items-center gap-2">
                <img src={logo} alt="logo" className="w-9" />
                <div className="flex flex-col gap-1 w-full">
                  <div className="h-2 w-full max-w-[20%] bg-neutral-200 dark:bg-neutral-800 rounded-2xl animate-pulse"></div>
                  <div className="h-2 w-full max-w-[40%] bg-neutral-200 dark:bg-neutral-800 rounded-2xl animate-pulse"></div>
                  <div className="h-2 w-full max-w-[60%] bg-neutral-200 dark:bg-neutral-800 rounded-2xl animate-pulse"></div>
                </div>
              </div>
            )}

            {/* bot response ka view krne ke liye code  */}

            {botResponse && (
              <div className="response-from-ai flex justify-start w-full">
                <div className="w-full">
                  <div className="text-[0.95rem] text-left dark:text-neutral-300 text-neutral-700">
                    <div className="prose dark:prose-invert max-w-none text-[0.95rem]">
                      <BotResponseBox response={botResponse} />{" "}
                      {/*iska use code ko structure krne ke liye kiya hai */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="w-full flex justify-center sticky bottom-0 pt-1 pb-2 bg-background z-10">
        <div className="lg:w-2/3 w-full bg-secondary rounded-xl flex flex-col p-3 gap-3 backdrop-blur-md">
          <textarea
            placeholder="Type or Speak I'm listening..."
            className="flex-1 resize-none min-h-[60px] bg-transparent outline-none dark:text-white placeholder-neutral-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend(); // question send hoga ai ke pass
              }
            }}
          />
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
                <img src={logo} alt="botforge-ai" className="w-4" />
                <span className="text-[.8rem]">{currentBot?.name}</span>
              </span>
              <Minus className="w-4 h-6 rotate-90" />
              <div className="relative">
                <Select
                  value={model}
                  onValueChange={(newModel) =>
                    handleModelChange(newModel, currentBot?.id)
                  }
                >
                  <SelectTrigger className="flex items-center gap-2 md:px-2 md:py-1 p-2 border md:rounded-sm rounded-full outline-none cursor-pointer">
                    <img
                      src={modelOptions.find((m) => m.value === model)?.icon}
                      alt={model}
                      className="w-3"
                    />
                    <span className="text-[.7rem]">
                      {model.charAt(0).toUpperCase() + model.slice(1)}
                    </span>
                    <ChevronDown size={10} className="mt-[.1rem]" />
                  </SelectTrigger>
                  <SelectContent className="bg-background px-1 py-2 rounded-md cursor-pointer fixed left-[15%] top-[20%]">
                    {modelOptions.map(({ label, value, icon }) => (
                      <SelectItem
                        key={value}
                        value={value}
                        className={`flex items-center gap-2 text-[.7rem] px-4 py-1 hover:bg-secondary border-none outline-none rounded-md ${currentBot?.model === value ? "bg-secondary" : ""
                          }`}
                      >
                        <img src={icon} alt={label} className="w-3" />
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* voice input componenets */}

              <VoiceInput setMessage={setMessage} />

              <Button
                onClick={() => { handleSend(); setListening(false) }}
                disabled={!message}
                className={`w-8 h-8 rounded-full ${message
                  ? "bg-blue-500 hover:bg-blue-400"
                  : "border-2 border-neutral-600 bg-transparent"
                  }`}
              >
                <ArrowUp color={message ? "white" : "gray"} size={15} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
