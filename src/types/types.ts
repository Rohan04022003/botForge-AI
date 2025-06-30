// Bot Types
export type ChatEntry = {
    createdAt: string;
    id: string;
    title: string;
    userMessage: string;
    botResponse: string;
};

export type ChatHistory = {
    [date: string]: ChatEntry[];
};

export type Bot = {
    id: string;
    name: string;
    description: string;
    role: string;
    category: string;
    model: string;
    greetings: string;
    chatHistory?: ChatHistory;
};

export type BotsData = {
    builtInBots: Bot[];
    userCreatedBots: Bot[];
};

export type BotCardProp = {
    bot: Bot;
}

export type BotContextType = {
    bots: BotsData;
    loading: boolean;
    setLoading: (arg0: boolean) => void;
    model: string;
    setModel: (model: string) => void;
    botRole: string;
    setBotRole: (model: string) => void;
    title: string;
    setTitle: (title: string) => void
    botResponse: string;
    setBotResponse: (res: string) => void;
    userMessage: string;
    setUserMessage: (userMessage: string) => void;
    saveBotModel: (botId: string, modelValue: string) => void;
    updateChat: (botId: string, entry: ChatEntry) => void;
    resetAllChats: () => void;
    selectChat: (botId: string | undefined, chatId: string) => void;
    deleteChat: (botId: string | undefined, chatId: string) => void;
    addBot: ( botName: string, greeting: string, description: string, botRole: string, category: string, addModel: string ) => void;
    editBot: ( botId: string, botName: string, greeting: string, description: string, botRole: string, category: string, addModel: string ) => void;
    deleteBot: ( botId: string ) => void;
    resetBots: () => void;
};


//handle send message

export type HandleSendProps = {
  message: string;
  model: string;
  botRole: string;
  botID: string;
  setLoading: (value: boolean) => void;
  setUserMessage: (msg: string) => void;
  setBotResponse: (res: string) => void;
  updateChat: (botId: string, entry: ChatEntry) => void;
  setMessage?: (val: string) => void; // optional if you want to reset input field
};

// hero component ka prop hai

export interface HeroProps {
  activeView: string;
  setActiveView: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

//Bot Form categories

export type BotFormProps = {
  botId?: string | null;
  openBotForm?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
};

export type BotCategory =
  | "general"
  | "assistant"
  | "developer"
  | "education"
  | "lifestyle"
  | "productivity"
  | "utility"
  | "wellness"
  | "entertainment";