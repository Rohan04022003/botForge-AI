/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenAI } from "@google/genai";

// Initialize with your Gemini API key
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || "", // apikey .env file se load kr rhe hai.
});

// Function to fetch response from Gemini
export async function fetchGeminiResponse(
  userMessage: string,
  botRole: string
): Promise<string> {
  try {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: userMessage,
    config: {
      systemInstruction: 'this is your role and you have to follow it strictly' + botRole,
    },
  });

    const text = response.text || "No Response Generated"
    
    return text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return "Something went wrong, Please try again later";
  }
}
