import { GoogleGenAI } from "@google/genai";

// Initialize with your Gemini API key
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || "", // safer env handling
});

// Function to fetch response from Gemini
export async function fetchGeminiResponse(
  userMessage: string,
  botRole: string
): Promise<string> {
  try {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: userMessage,
    config: {
      systemInstruction: 'this is your role and you have to follow it strictly' + botRole,
    },
  });

    const text = response.text || "No Response Generated"
    
    return text;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return "Something went wrong, Please try again later";
  }
}
