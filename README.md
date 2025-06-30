# AI Chatbot

## 🧠 Overview
AI Chatbot is a full-featured, modern web application that enables users to interact with multiple state-of-the-art AI models (Cohere, Gemini, Mistral, and more) through a seamless chat interface. Designed for flexibility, extensibility, and a delightful user experience, this project is ideal for learning, prototyping, or deploying your own AI-powered assistant.

---

## ✨ Features
- **Multi-Model Support:** Chat with different AI models (Cohere, Gemini, Mistral, etc.) and easily switch between them.
- **User Authentication & Onboarding:** Secure login and onboarding modal for new users.
- **Sidebar Navigation:** Access chat history, bot management, and settings from a responsive sidebar.
- **Bot Management:** Create, view, and manage custom bots tailored to your needs.
- **Chat History:** Persistent chat history with export options.
- **Export to PDF:** Download your chat conversations as a PDF file for record-keeping or sharing.
- **Responsive UI:** Works beautifully on both desktop and mobile devices.
- **Theme Switching:** Toggle between light and dark modes.
- **Modern UI/UX:** Built with Tailwind CSS and Lucide icons for a clean, modern look.
- **Extensible Architecture:** Easily add new AI models or features.

---

## 🚀 Demo
*If you have a live demo, add the link here.*

---

## 🏗️ Architecture
- **Frontend:** React (with TypeScript), Vite, Tailwind CSS
- **State Management:** React Context API
- **Routing:** React Router
- **API Integration:** Modular API files for each AI model
- **PDF Export:** jsPDF

---

## 📁 Folder Structure
```
AI Chatbot/
├── public/                  # Static assets
├── src/
│   ├── api/                 # API integrations for AI models
│   ├── assets/              # Images and SVGs
│   ├── components/          # Reusable UI components
│   │   └── ui/              # UI primitives (button, card, etc.)
│   ├── context/             # React context providers (theme, user, bot)
│   ├── data/                # Static data/config (bot data, options, etc.)
│   ├── hooks/               # Custom React hooks
│   ├── layout/              # Layout components (Dashboard, etc.)
│   ├── lib/                 # Utility libraries
│   ├── pages/               # Application pages (Dashboard, CreateBot, etc.)
│   ├── router/              # App routing
│   ├── types/               # TypeScript types
│   ├── utils/               # Utility functions (e.g., export to PDF)
│   └── index.css            # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🛠️ Technologies Used
- **React** & **TypeScript**: Component-based UI and type safety
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **jsPDF**: PDF generation for chat export
- **React Router**: Routing and navigation
- **Lucide Icons**: Icon library
- **Context API**: State management

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v16 or above)
- npm or yarn

### Installation Steps
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd AI-Chatbot
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   - If your AI APIs require keys, create a `.env` file in the root and add your keys:
     ```env
     VITE_COHERE_API_KEY=your_cohere_key
     VITE_GEMINI_API_KEY=your_gemini_key
     VITE_MISTRAL_API_KEY=your_mistral_key
     # ...add more as needed
     ```
4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. **Open your browser:**
   Go to [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## 🧩 Usage
- **Sign Up / Log In:** Start by creating an account or logging in.
- **Chat:** Select a bot or model from the sidebar and start chatting.
- **Create Bots:** Use the "Create Bot" page to add your own custom bots.
- **Export Chat:** Click the export button in a chat to download the conversation as a PDF.
- **Settings:** Update your profile, theme, and preferences in the settings page.

---

## 🛠️ Customization
- **Add a New AI Model:**
  - Create a new file in `src/api/` for your model integration.
  - Add the model to `src/data/ModelOptions.ts`.
  - Update UI components to include the new model if needed.
- **Change Theme Colors:**
  - Edit Tailwind config or override classes in `index.css`.
- **Modify Sidebar Links:**
  - Update `src/data/SidebarLinks.ts`.

---

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

---

## 🐞 Troubleshooting
- **API Errors:** Ensure your API keys are correct and not expired.
- **Build Issues:** Delete `node_modules` and reinstall dependencies.
- **UI Bugs:** Check the browser console for errors and review recent code changes.

---

## ❓ FAQ
**Q: Can I use my own AI model?**  
A: Yes! Add your integration in `src/api/` and update the model options.

**Q: How is chat history stored?**  
A: Chat history is managed in React state/context. You can extend it to use localStorage or a backend.

**Q: Is this production-ready?**  
A: This project is intended for learning, prototyping, and demonstration. For production, add proper security, error handling, and backend support.

---

## 📄 License
This project is for educational and demonstration purposes only. See [LICENSE](LICENSE) if provided.
