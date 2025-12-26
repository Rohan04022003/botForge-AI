/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import data from "@/data/BotData.json";
import type { BotContextType, BotsData, Bot, ChatEntry } from "@/types/types";
import { generateId } from "@/utils/generateId";

// Create context
const BotContext = createContext<BotContextType | undefined>(undefined);

// Provider
export const BotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bots, setBots] = useState<BotsData>({ builtInBots: [], userCreatedBots: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [model, setModel] = useState<string>("gemini");
  const [botRole, setBotRole] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [userMessage, setUserMessage] = useState<string>("");
  const [botResponse, setBotResponse] = useState<string>("");
  const [listening, setListening] = useState<boolean>(false); // yeh voice listening active hai ya nahi uske liye hai.

  // Load from localStorage or fallback
  useEffect(() => {
    try {
      const local = localStorage.getItem("ai-bots");
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed?.builtInBots && parsed?.userCreatedBots) {
          setBots(parsed);
          return;
        }
      }
    } catch (err) {
      console.error("Error loading from localStorage:", err);
    }

    // fallback
    setBots(data);
    localStorage.setItem("ai-bots", JSON.stringify(data));
  }, []);

  // Save updated bots
  const saveBots = (updated: BotsData) => {
    try {
      setBots(updated);
      localStorage.setItem("ai-bots", JSON.stringify(updated));
    } catch (err) {
      console.error("Error saving bots:", err);
    }
  };

  //BotForge AI model selection method
  const saveBotModel = (modelValue: string, botId: string) => {

    const updateBot = (bot: Bot) =>
      bot.id === botId
        ? {
          ...bot,
          model: modelValue
        }
        : bot;

    const updated = {
      builtInBots: bots.builtInBots.map(updateBot),
      userCreatedBots: bots.userCreatedBots.map(updateBot),
    };

    saveBots(updated);
  };

  // Bot update chat methods
  const updateChat = (botId: string, chatEntry: ChatEntry) => {
    const date = new Date();
    const today = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
    })

    const updateBot = (bot: Bot) =>
      bot.id === botId
        ? {
          ...bot,
          chatHistory: {
            ...bot.chatHistory,
            [today]: [chatEntry, ...(bot.chatHistory?.[today] || [])],
          },
        }
        : bot;

    const updated = {
      builtInBots: bots.builtInBots.map(updateBot),
      userCreatedBots: bots.userCreatedBots.map(updateBot),
    };

    saveBots(updated);
  };

  //chat selection ke liye jb chat select krenge toh uske ander ka data show hoga means userMessage and botResponse
  const selectChat = (botId: string | undefined, chatID: string) => {
    const allBots = [...bots.builtInBots, ...bots.userCreatedBots];
    const foundBot = allBots.find(bot => bot.id === botId);

    if (!foundBot || !foundBot.chatHistory) return;

    for (const date in foundBot.chatHistory) {
      const chats = foundBot.chatHistory[date];
      const selectedChat = chats.find(chat => chat.id === chatID);

      if (selectedChat) {
        setUserMessage(selectedChat.userMessage);
        setBotResponse(selectedChat.botResponse);
        return;
      }
    }

    console.warn("Chat not found");
  };

  // yeh chat ko delete krne ka function hai
  const deleteChat = (botId: string | undefined, chatID: string) => {
    if (!botId || !chatID) return;

    // Clear chat if it's currently selected
    const allBots = [...bots.builtInBots, ...bots.userCreatedBots];
    const foundBot = allBots.find(bot => bot.id === botId);
    if (foundBot) {
      for (const date in foundBot.chatHistory) {
        const findChat = foundBot.chatHistory[date].find(chat => chat.id === chatID);
        if (findChat?.id === chatID) {
          setUserMessage("");
          setBotResponse("");
          break;
        }
      }
    }

    //bot ko update krne ka functionality
    const updateBot = (bot: Bot): Bot => {
      if (bot.id !== botId || !bot.chatHistory) return bot;

      const updatedHistory: Record<string, ChatEntry[]> = {};
      for (const date in bot.chatHistory) {
        const filteredChats = bot.chatHistory[date].filter(chat => chat.id !== chatID);
        if (filteredChats.length > 0) {
          updatedHistory[date] = filteredChats;
        }
      }

      return {
        ...bot,
        chatHistory: updatedHistory,
      };
    };

    const updated = {
      builtInBots: bots.builtInBots.map(updateBot),
      userCreatedBots: bots.userCreatedBots.map(updateBot),
    };

    saveBots(updated);
  };


  // all chats reset krne ka methods
  const resetAllChats = () => {
    const resetBotChats = (bot: Bot) => ({ ...bot, chatHistory: {} });

    const updated = {
      builtInBots: bots.builtInBots.map(resetBotChats),
      userCreatedBots: bots.userCreatedBots.map(resetBotChats),
    };

    saveBots(updated);
  };

  // New Bot add krne ka methods or userCreated bot add krne ka methods
  const addBot = (
    botName: string,
    greeting: string,
    description: string,
    botRole: string,
    category: string,
    addModel: string
  ) => {


    const newBot = {
      id: generateId(),
      name: botName,
      description: description,
      role: botRole,
      category: category,
      model: addModel,
      greetings: greeting,
      chatHistory: {}
    };

    const updated = {
      builtInBots: bots.builtInBots,
      userCreatedBots: [newBot, ...bots.userCreatedBots]
    };

    saveBots(updated);

  };

  // existing bot ko edit krne ka method
  const editBot = (
    botId: string,
    botName: string,
    greeting: string,
    description: string,
    botRole: string,
    category: string,
    addModel: string
  ) => {

    const edit = (bot: Bot) =>
      bot.id === botId ? { ...bot, name: botName, greetings: greeting, description: description, role: botRole, category: category, model: addModel } : bot;

    const updated = {
      builtInBots: bots.builtInBots,
      userCreatedBots: bots.userCreatedBots.map(edit),
    };

    saveBots(updated);

  };

  // bot deletion method
  const deleteBot = (botId: string) => {

    const updated = {
      builtInBots: bots.builtInBots,
      userCreatedBots: bots.userCreatedBots.filter((bot) => bot.id !== botId),
    };

    saveBots(updated);

  }

  // reset bots methods
  const resetBots = () => {
    setBots(data);
    localStorage.setItem("ai-bots", JSON.stringify(data));
  }


  return (
    <BotContext.Provider
      value={{
        bots,
        loading,
        setLoading,
        model,
        setModel,
        title,
        setTitle,
        botResponse,
        setBotResponse,
        userMessage,
        setUserMessage,
        saveBotModel,
        updateChat,
        resetAllChats,
        setBotRole,
        botRole,
        selectChat,
        deleteChat,
        addBot,
        editBot,
        deleteBot,
        resetBots,
        listening,
        setListening
      }}
    >
      {children}
    </BotContext.Provider>
  );
};

// Hook
export const useBotContext = () => {
  const context = useContext(BotContext);
  if (!context) {
    throw new Error("useBotContext must be used within BotProvider");
  }
  return context;
};
