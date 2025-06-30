import type { ChatHistory } from "@/types/types";
import jsPDF from "jspdf";

export const exportChatToPDF = (chatHistory: ChatHistory, botName: string) => {
    const doc = new jsPDF();
    let y = 20;

    // Pehle page ka tile set kiya hai
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text(`${botName} - Chat Export`, 10, 10);

    const sortedDates = Object.keys(chatHistory).sort();

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    sortedDates.forEach((date) => {
        const entries = chatHistory[date];
        if (!entries?.length) return;

        entries.forEach((entry) => {
            // Page break if needed
            if (y > 270) {
                addFooter(doc); // new page se pehle footer add hoga
                doc.addPage();
                y = 20;

                // page change hone ke baad font reset hoga means 12
                doc.setFont("helvetica", "normal");
                doc.setFontSize(12);
            }

            // yaha pe user message ko write kiya hai
            doc.setFont("helvetica", "bold");
            doc.setTextColor(50, 50, 50);
            const userLines = doc.splitTextToSize(`You: ${entry.userMessage}`, 180);
            doc.text(userLines, 10, y);
            y += userLines.length * 9;

            // Bot Response ko write kiya hai
            doc.setFont("helvetica", "normal");
            doc.setTextColor(100);
            const botLines = doc.splitTextToSize(`Bot: ${entry.botResponse}`, 180);
            doc.text(botLines, 10, y);
            y += botLines.length * 7 + 20;
        });

        y += 5;
    });

    // 
    addFooter(doc);

    // Save PDF
    doc.save(`${botName}-chat-history.pdf`);
};

// ✅ Footer ko set kiya hai left me BotForge AI and right me page number
const addFooter = (doc: jsPDF) => {
    const pageNumber = doc.getNumberOfPages();
    const footerText = `Page ${pageNumber}`;
    const textWidth = doc.getTextWidth(footerText);

    doc.setFontSize(10);
    doc.setTextColor(150);

    
    doc.text("BotForge AI", 10, 285); // Left me align hai

    doc.text(footerText, 200 - textWidth, 285); // right side me align kiya hai
};
