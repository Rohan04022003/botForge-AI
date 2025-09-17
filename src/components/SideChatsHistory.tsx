import { useBotContext } from "@/context/BotContext";
import type { ChatEntry } from "@/types/types";
import { CalendarDays, FileText, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { exportChatToPDF } from "@/utils/exportChatToPDF";
import { useSidebar } from "./ui/sidebar";

const SideChatsHistory: React.FC<{ botID?: string }> = ({ botID }) => {
  const { bots, selectChat, deleteChat } = useBotContext();

  // navbar open close ke liye hai shadcn built in feature hai
  const { isMobile, setOpenMobile } = useSidebar();

  const handleNavClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  const foundBot =
    botID && bots
      ? bots.builtInBots.find((bot) => bot.id === botID) ||
      bots.userCreatedBots.find((bot) => bot.id === botID)
      : undefined;

  return (
    <div className={`h-full mb-1 px-3 relative ${botID ? "block" : "hidden"}`}>
      <div className="flex items-center justify-between">
        <h2 className="sticky top-0 dark:bg-[#171717] bg-[#FAFAFA] py-1 w-full text-sm font-semibold text-neutral-600 dark:text-neutral-300 z-20">Chats</h2>
        <Button
        aria-label="for export chat to pdf"
          size={"sm"}
          onClick={() =>
            foundBot?.chatHistory &&
            Object.keys(foundBot.chatHistory).length &&
            exportChatToPDF(foundBot.chatHistory, foundBot.name) // pdf creation ke liye
          }
          className={`text-[.7rem] ${(foundBot?.chatHistory &&
            Object.keys(foundBot.chatHistory).length > 0) ? "flex" : "hidden"}`} // length greater then zero hota tb pdf export ka button show hoga
        >
          <FileText className="w-4 h-4" />
          Export
        </Button>
      </div>


      {foundBot?.chatHistory && Object.keys(foundBot.chatHistory).length > 0 ? (
        Object.entries(foundBot.chatHistory)
          .sort((a, b) => {
            // date ko convert karega "22 June" real date object me
            const parseDate = (d: string) => new Date(`${d} ${new Date().getFullYear()}`);
            return parseDate(b[0]).getTime() - parseDate(a[0]).getTime(); // jo date latest hoga woh pehle aayega.
          })
          .map(([date, entries]) => (
            <div key={date} className="mt-1">
              <div className="flex items-center gap-2 text-sm text-neutral-400 dark:text-neutral-600 mb-2">
                <CalendarDays className="w-4 h-4" />
                <span>{date}</span>
              </div>
              {entries
                .slice() // sort karne se pehle close bnaya hai
                .sort((a, b) => {
                  const getTime = (e: ChatEntry) => new Date(e.createdAt || "").getTime();
                  return getTime(b) - getTime(a); // latest pehle hoga
                })
                .map((entry) => (
                  <div
                    onClick={() => (selectChat(botID, entry.id), handleNavClick())}
                    key={entry.id}
                    className="relative text-sm text-neutral-800 dark:text-neutral-400 py-1 px-2 rounded-md hover:bg-secondary cursor-pointer group/chat"
                  >
                    {entry.title.slice(0, 30) + (entry.title.length > 25 ? "..." : "")}
                    <button
                    aria-label="for deleting chat"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(botID, entry.id);
                      }}
                      className="absolute top-1/2 -translate-y-1/2 right-1 bg-red-100 text-red-700 p-1 rounded-sm cursor-pointer sm:hidden group-hover/chat:flex"
                    >
                      <Trash size={12} />
                    </button>
                  </div>
                ))}
            </div>
          ))
      ) : (
        <p aria-label="when chats not found" className="text-neutral-400 italic text-sm mt-2">No chat history found.</p>
      )}

    </div>
  );
};

export default SideChatsHistory;
