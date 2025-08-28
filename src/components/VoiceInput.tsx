import React, { useRef, useEffect } from "react";
import { Mic } from "lucide-react";
import { useBotContext } from "@/context/BotContext";
import { useTheme } from "@/context/theme-provider";

// Add global type for SpeechRecognition
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition: any;
  }
}

type SpeechRecognition = typeof window.webkitSpeechRecognition;

type VoiceInputProps = {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const VoiceInput: React.FC<VoiceInputProps> = ({ setMessage }) => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef<string>("");

  const {theme} = useTheme();

  const { listening, setListening } = useBotContext();

  useEffect(() => {
    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("❌ Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // "hi-IN" for Hindi
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognition) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscriptRef.current += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      // 📝 Show both final + interim in input
      setMessage(finalTranscriptRef.current + interimTranscript);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: { error: any; }) => {
      console.error("🎤 Speech recognition error:", event.error);
    };

    recognitionRef.current = recognition;
  }, [setMessage]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      finalTranscriptRef.current = "";
      setMessage(""); // clear input also
      recognitionRef.current.start();
      setListening(true);
    }
  };


  return (
    <div
      onClick={toggleListening}
      className={`w-8 h-8 rounded-full border ${listening ? "bg-red-500 border-none animate-pulse" : "bg-transparent border-2 dark:border-neutral-700 border-[#408BFF]"
        } flex justify-center items-center cursor-pointer transition `}
    >
      <Mic size={16} color={listening ? "white" : theme === "dark" ? "gray" : "#408BFF" } />
    </div>
  );
};
