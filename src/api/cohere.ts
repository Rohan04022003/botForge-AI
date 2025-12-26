export const fetchCohereResponse = async (
  userMessage: string,
  botRole: string
): Promise<string> => {
  try {
    const response = await fetch("https://api.cohere.com/v2/chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command-a-reasoning-08-2025",
        messages: [
          {
            role: "system",
            content: [
              {
                type: "text",
                text: botRole,
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: userMessage,
              },
            ],
          },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Cohere API error:", errorText);
      return "Cohere API error";
    }

    const data = await response.json();
    console.log(data)
    return (
      data?.message?.content?.[1]?.text ||
      "No response received."
    );
  } catch (error) {
    console.error("Cohere API error:", error);
    return "Something went wrong, please try again later";
  }
};
