import { Mistral } from "@mistralai/mistralai";

const client = new Mistral({
  apiKey: import.meta.env.VITE_MISTRAL_API_KEY,
});

export const fetchMistralResponse = async (userMessage: string, botRole: string) => {
  try {
    const chatCompletion = await client.chat.complete({
      model: "mistral-small-latest",
      messages: [
        { role: "system", content: botRole },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
    });

    return (chatCompletion.choices[0]?.message?.content || "No response found.") as string;
  } catch (error) {
    console.error("Mistral Error:", error);
    return "Something went wrong, Please try again later";
  }
};
