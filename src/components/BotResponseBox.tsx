import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";

type Props = {
  response: string;
};

const BotResponseBox: React.FC<Props> = ({ response }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, language: string) => {
    navigator.clipboard.writeText(text);
    setCopied(language);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="response-from-ai flex justify-start w-full">
      <div className="md:max-w-[95%] max-w-[98%] prose dark:prose-invert text-[0.95rem] leading-7">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{

            p: ({ children }) => <>{children}</>,

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            code: ({ inline, className, children }: any) => {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <div className="relative group">
                  <button
                    onClick={() =>
                      copyToClipboard(
                        String(children).replace(/\n$/, ""),
                        match[1]
                      )
                    }
                    className="absolute right-2 top-2 p-2 rounded-md bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors cursor-pointer"
                  >
                    {copied === match[1] ? (
                      <Check className="w-4 h-4 dark:text-green-300 text-green-800" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-md my-2"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-sm">
                  {children}
                </code>
              );
            },

            // ✅ Custom Headings
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold mb-4 mt-6 text-neutral-900 dark:text-neutral-100">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-bold mb-3 mt-5 text-neutral-800 dark:text-neutral-200">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-bold mb-2 mt-4 text-neutral-700 dark:text-neutral-300">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-base font-bold mb-2 mt-3 text-neutral-600 dark:text-neutral-400">
                {children}
              </h4>
            ),

            // ✅ Lists
            ul: ({ children }) => (
              <ul className="list-disc pl-6 mb-4 space-y-2 text-neutral-700 dark:text-neutral-300">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-6 mb-4 space-y-2 text-neutral-700 dark:text-neutral-300">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="leading-7">{children}</li>
            ),

            // ✅ Blockquote
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-neutral-300 dark:border-neutral-600 pl-4 italic my-4 text-neutral-600 dark:text-neutral-400">
                {children}
              </blockquote>
            ),

            // ✅ Links
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-blue-600 dark:text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
          }}
        >
          {response}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default BotResponseBox;
