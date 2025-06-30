import { generateId } from "./generateId";
import { getModelResponse } from "@/router/modelRouter";
import type { ChatEntry, HandleSendProps } from "@/types/types";

export const handleSendMessage = async ({
    message,
    model,
    botRole,
    botID,
    setLoading,
    setUserMessage,
    setBotResponse,
    updateChat,
    setMessage,
}: HandleSendProps) => {
    const trimmed = message.trim();
    if (!trimmed || !botID) return;

    setUserMessage(trimmed);
    setLoading(true);
    setBotResponse("")
    const response = await getModelResponse(model, trimmed, botRole);
    setBotResponse(response);
    setLoading(false);

    if (setMessage) setMessage("");

    const chatEntry: ChatEntry = {
        id: generateId(),
        title: trimmed,
        userMessage: trimmed,
        botResponse: response,
        createdAt: ""
    };

    updateChat(botID, chatEntry);
};
