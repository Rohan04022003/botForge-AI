export const fetchCohereResponse = async (
  userMessage: string,
  botRole: string
): Promise<string> => {
  try {
    const response = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command-r-plus",
        message: userMessage,
        chat_history: [],
        connectors: [],
        temperature: 0.3,
        prompt_truncation: "auto",
        preamble: botRole,
      }),
    });

    const data = await response.json();

    return data?.text || "No response received.";
  } catch (error) {
    console.error("Cohere API error:", error);
        return "Something went wrong, Please try again later";

  }
};
