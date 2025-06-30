import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BotCreationGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="md:w-3/4 w-full mx-auto space-y-12 pb-10 pt-4 text-base text-neutral-800 dark:text-neutral-200">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">Bot Creation Guide</h1>
        <p>Learn how to create helpful and smart bots using our platform. This guide covers all required fields and provides useful tips and examples.</p>
      </div>

      <Separator />

      {/* Step-by-step instructions */}
      <section>
        <h2 className="text-base font-medium text-neutral-800 dark:text-neutral-100">Step-by-Step Instructions</h2>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li><strong>Bot Name</strong>: Unique and clear name (max 20 characters).</li>
          <li><strong>Greetings</strong>: A friendly welcome message your bot will use initially.</li>
          <li><strong>Short Description</strong>: A 1–2 line summary of what the bot does (max 100 characters).</li>
          <li><strong>Role / Behavior</strong>: Detailed instructions about how the bot should behave (min 300 characters).</li>
          <li><strong>Category</strong>: Choose the category that best fits your bot’s purpose.</li>
          <li><strong>AI Model</strong>: Select between Gemini, Mistral, or Cohere.</li>
        </ul>
      </section>

      <Separator />

      {/* Role writing tips */}
      <section>
        <h2 className="text-base font-medium text-neutral-800 dark:text-neutral-100">Bot Role Writing Tips</h2>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Set the tone: e.g., "You respond politely and professionally."</li>
          <li>Define boundaries: e.g., "You do not give medical or legal advice."</li>
          <li>State the purpose: e.g., "You help users with daily productivity and task planning."</li>
        </ul>
      </section>

      <Separator />

      {/* Example Role */}
      <section>
        <h2 className="text-base font-medium text-neutral-800 dark:text-neutral-100">Example Bot Role</h2>
        <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-md text-sm mt-4">
          You are a personal productivity assistant. Your goal is to help users plan their day, manage their tasks, and stay focused. You speak in a calm, supportive tone and avoid technical jargon. You do not answer questions unrelated to productivity or task management.
        </div>
      </section>

      <Separator />

      {/* AI Model Comparison */}
      <section>
        <h2 className="text-base font-medium text-neutral-800 dark:text-neutral-100">Choosing the Right AI Model</h2>
        <p className="mt-2">Each AI model has its unique strengths. Choose the right one based on your bot's purpose:</p>

        <div className="mt-4 space-y-4">
          {/* Gemini */}
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">🧠 Gemini (by Google)</h3>
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li><strong>Type</strong>: General-purpose conversational AI</li>
              <li><strong>Strengths</strong>: Balanced, safe, reliable, and informative</li>
              <li><strong>Best For</strong>: Helpdesk bots, general assistants, productivity tools</li>
              <li><strong>Why Use?</strong> Accurate responses, safe tone, great for user trust and help-based bots</li>
            </ul>
          </div>

          {/* Mistral */}
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">⚡ Mistral</h3>
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li><strong>Type</strong>: Lightweight, high-speed transformer</li>
              <li><strong>Strengths</strong>: Fast, technical, concise</li>
              <li><strong>Best For</strong>: Developer tools, code support bots, technical utilities</li>
              <li><strong>Why Use?</strong> Excellent for logic-based tasks and developers needing efficiency</li>
            </ul>
          </div>

          {/* Cohere */}
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">🎨 Cohere</h3>
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li><strong>Type</strong>: Creative, writing-oriented language model</li>
              <li><strong>Strengths</strong>: Long-form text, emotional tone, expressive responses</li>
              <li><strong>Best For</strong>: Lifestyle, wellness, journaling or storytelling bots</li>
              <li><strong>Why Use?</strong> Human-like responses for content-focused and soft-tone use-cases</li>
            </ul>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="text-sm w-full mt-4 border border-border rounded-md">
              <thead className="bg-neutral-200 dark:bg-neutral-700">
                <tr>
                  <th className="p-2 text-left">Feature / Model</th>
                  <th className="p-2 text-left">Gemini</th>
                  <th className="p-2 text-left">Mistral</th>
                  <th className="p-2 text-left">Cohere</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2">Best For</td>
                  <td className="p-2">Helpdesk, FAQs, Personal Assistants</td>
                  <td className="p-2">Code bots, logic tools, utilities</td>
                  <td className="p-2">Writing, journaling, therapy</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Speed</td>
                  <td className="p-2">Fast</td>
                  <td className="p-2">Very Fast</td>
                  <td className="p-2">Moderate</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">Tone</td>
                  <td className="p-2">Safe, factual</td>
                  <td className="p-2">Concise, logical</td>
                  <td className="p-2">Creative, emotional</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <div className="text-center">
        <Button onClick={() => navigate("/create-bot")} className="mt-4">
          Go to Create Bot Page
        </Button>
      </div>
    </div>
  );
};

export default BotCreationGuide;
