import { fetchCohereResponse } from "@/api/cohere";
import { fetchGeminiResponse } from "@/api/gemini";
import { fetchMistralResponse } from "@/api/mistral";

export const getModelResponse = async (
  model: string,
  userMessage: string,
  botRole: string
): Promise<string> => {
  try {
    if (model === "mistral") {
      return await fetchMistralResponse(userMessage, botRole);
    } else if (model === "gemini") {
      return await fetchGeminiResponse(userMessage, botRole);
    } else if (model === "cohere") {
      return await fetchCohereResponse(userMessage, botRole);
    } else {
      return "❌ Unsupported model selected.";  // model valid nhi hoga toh yeh message return hoga
    }
  } catch (error) {
    console.error("Error getting model response:", error);
    return "⚠️ Failed to get response from the AI model.";
  }
};
