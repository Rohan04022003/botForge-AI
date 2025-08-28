import type { ChatHistory } from "@/types/types";
import jsPDF from "jspdf";
import { marked } from "marked";

// Helper: Convert HTML to plain text (browser safe)
const htmlToPlainText = (html: string): string => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  return tempElement.innerText;
};

// Main Export Function
export const exportChatToPDF = async (chatHistory: ChatHistory, botName: string) => {
  const doc = new jsPDF();
  let y = 20;
  const pageHeight = doc.internal.pageSize.height;

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text(`${botName} - Chat Export`, 10, 10);

  const sortedDates = Object.keys(chatHistory).sort();

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  for (const date of sortedDates) {
    const entries = chatHistory[date];
    if (!entries?.length) continue;

    for (const entry of entries) {
      // ---- USER MESSAGE ----
      doc.setFont("helvetica", "bold");
      doc.setTextColor(50, 50, 50);
      y = addWrappedText(doc, `You: ${entry.userMessage}`, 10, y, pageHeight);

      // ---- BOT RESPONSE (with markdown) ----
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100);

      // Markdown -> HTML -> Plain Text
      const html = await marked.parse(entry.botResponse || "");
      const plainText = htmlToPlainText(html);

      y = addWrappedText(doc, `Bot: ${plainText}`, 10, y, pageHeight, 180, 7);
      y += 10; // extra gap between chats
    }

    y += 5;
  }

  addFooter(doc);
  doc.save(`${botName}-chat-history.pdf`);
};

// Text wrapping + auto page break
const addWrappedText = (
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  pageHeight: number,
  maxWidth = 180,
  lineHeight = 5
) => {
  const lines = doc.splitTextToSize(text, maxWidth);
  lines.forEach((line: string | string[]) => {
    if (y + lineHeight > pageHeight - 20) {
      addFooter(doc);
      doc.addPage();
      y = 20;

      // 🔥 Page break ke baad font reset karo
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(100);
    }
    doc.text(line, x, y);
    y += lineHeight;
  });
  return y;
};


// Footer
const addFooter = (doc: jsPDF) => {
  const pageNumber = doc.getNumberOfPages();
  const footerText = `Page ${pageNumber}`;
  const textWidth = doc.getTextWidth(footerText);

  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text("BotForge AI", 10, 285);
  doc.text(footerText, 200 - textWidth, 285);
};
