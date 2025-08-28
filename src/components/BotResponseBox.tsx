import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "@/context/theme-provider";
import copy from "@/assets/copy.png";
import right from "@/assets/right.png";

type Props = {
  response: string;
};

const BotResponseBox: React.FC<Props> = ({ response }) => {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { theme } = useTheme();

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className="reset-tw"
      style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
    >
      <div
        style={{
          maxWidth: "95%",
          fontSize: "0.95rem",
          lineHeight: "1.75rem",
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <>{children}</>,

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            code: ({ inline, className, children, node }: any) => {
              const match = /language-(\w+)/.exec(className || "");
              const uniqueId = node?.position?.start.offset ?? Math.random(); // unique id per block

              return !inline && match ? (
                <div style={{ position: "relative" }}>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        String(children).replace(/\n$/, ""),
                        uniqueId
                      )
                    }
                    style={{
                      position: "absolute",
                      right: "0.5rem",
                      top: "0.4rem",
                      padding: "0.4rem",
                      borderRadius: "5px",
                      cursor: "pointer",
                      border: "2px solid gray",
                      backgroundColor: "transparent",
                    }}
                  >
                    {copiedId === uniqueId ? (
                      <img
                        src={right}
                        style={{
                          width: ".9rem",
                          height: ".7rem",
                          color: "green",
                          display: "inline-block",
                        }}
                      />
                    ) : (
                      <img
                        src={copy}
                        style={{
                          width: ".9rem",
                          height: ".7rem",
                          display: "inline-block",
                        }}
                      />
                    )}
                  </button>
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      borderRadius: "6px",
                      marginTop: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code
                  style={{
                    background: `${theme === "dark" ? "#353535" : "#e1e1e1"}`,
                    padding: "2px 4px",
                    borderRadius: "4px",
                    fontSize: "0.85rem",
                  }}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {response}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default BotResponseBox;
