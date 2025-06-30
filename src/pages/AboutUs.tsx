import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="md:w-3/4 w-full mx-auto pb-10 pt-5 space-y-12 text-base text-neutral-800 dark:text-neutral-200">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">About BotForge</h1>
        <p className="leading-relaxed">
          Welcome to <strong>BotForge</strong> — a powerful, no-code platform that I’ve designed and developed solo to help anyone build, customize, and launch intelligent AI assistants with ease. Whether you’re an individual creator, educator, entrepreneur, or enthusiast, BotForge AI empowers you to create meaningful and useful bots without writing a single line of code.
        </p>
      </div>

      <Separator />

      {/* My Vision */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">My Vision</h2>
        <p className="leading-relaxed">
          I believe in making AI creation accessible to everyone — not just developers. My goal with BotForge AI is to simplify the process of building smart assistants so anyone can bring their ideas to life. Whether it’s for productivity, education, wellness, or fun, I want people to feel empowered and confident creating their own AI bots.
        </p>
      </section>

      <Separator />

      {/* What BotForge AI Offers */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">What BotForge AI Offers</h2>
        <ul className="list-disc pl-6 space-y-2 leading-relaxed">
          <li><strong>No-Code Bot Builder:</strong> Build bots easily through a simple form-based interface — no coding knowledge needed.</li>
          <li><strong>Diverse Categories:</strong> Create bots for productivity, lifestyle, education, wellness, utilities, and more.</li>
          <li><strong>AI Model Options:</strong> Choose from powerful models like <strong>Gemini</strong> (balanced), <strong>Mistral</strong> (fast & technical), and <strong>Cohere</strong> (creative).</li>
          <li><strong>Custom Behavior:</strong> Write your bot’s role and personality in your own words, defining tone, boundaries, and use case.</li>
          <li><strong>Smart Validations:</strong> Built-in checks ensure bot quality, like minimum word limits, duplicate name checks, and required fields.</li>
        </ul>
      </section>

      <Separator />

      {/* Why I Built This */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Why I Built This</h2>
        <p className="leading-relaxed">
          I developed BotForge AI on my own out of a desire to combine my passion for front-end development, UI/UX, and AI. I saw how difficult it can be for non-developers to create useful AI tools, and I wanted to remove that barrier. This app is my contribution toward making AI more human-friendly, approachable, and useful in everyday life.
        </p>
      </section>

      <Separator />

      {/* Resources */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Learning Resources</h2>
        <p className="leading-relaxed">
          If you're new here, don’t worry. I’ve included a complete <Link to="/bot-creation-guide" className="underline text-primary">Bot Creation Guide</Link> to walk you through every step — from naming your bot to defining its purpose and behavior.
        </p>
      </section>

      <Separator />

      {/* Get Started */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Get Started Now</h2>
        <p className="leading-relaxed">
          Excited to build your first bot? Head over to the <Link to="/create-bot" className="underline text-primary">Create Bot</Link> page and start crafting your own AI assistant. Whether you want to make something fun, helpful, or productivity-boosting, BotForge AI gives you the tools to do it.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
