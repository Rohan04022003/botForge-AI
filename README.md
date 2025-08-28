# BotForge AI 🤖

[Live Demo](https://bot-forge-ai.vercel.app/) | [GitHub Repository](https://github.com/Rohan04022003/botForge-AI)

## 🚀 Overview
BotForge AI is a cutting-edge, full-stack web application that empowers users to create, customize, and interact with AI chatbots powered by multiple state-of-the-art language models. Built with modern React and TypeScript, it offers a comprehensive platform for AI bot creation, management, and intelligent conversations.

---

## ✨ Key Features

### 🤖 **AI Model Integration**
- **Multi-Model Support**: Seamlessly switch between Gemini, Mistral, and Cohere AI models
- **Real-time Chat**: Instant responses with loading states and error handling
- **Model Persistence**: Save and remember your preferred AI model for each bot

### 🎯 **Bot Management System**
- **Custom Bot Creation**: Build personalized AI assistants with custom roles, greetings, and descriptions
- **Bot Categories**: Organize bots by purpose (General, Developer, Education, Wellness, etc.)
- **Built-in Bots**: 10+ pre-configured specialized bots for various use cases
- **Bot Editing**: Modify existing bots or create new ones from scratch

### 💬 **Advanced Chat Experience**
- **Voice Input**: Speech-to-text functionality for hands-free interaction
- **Markdown Support**: Rich text formatting with syntax highlighting for code
- **Chat History**: Persistent conversation memory with date-based organization
- **Export to PDF**: Download complete chat conversations as formatted PDF documents
- **Copy Code**: One-click code copying with visual feedback

### 🎨 **Modern User Interface**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Themes**: Toggle between themes with persistent preferences
- **Sidebar Navigation**: Quick access to all features and chat history
- **Search & Filter**: Find bots quickly with intelligent search functionality
- **Beautiful Animations**: Smooth transitions and interactive elements

### 👤 **User Experience**
- **User Onboarding**: Personalized welcome modal with name, email, and gender
- **Avatar System**: Gender-based avatar selection for personalization
- **Dashboard**: Centralized view of all bots with smart categorization
- **Statistics**: Track your chat usage and bot interactions

---

## 🏗️ Technical Architecture

### **Frontend Stack**
- **React 19** with TypeScript for type safety
- **Vite 6** for lightning-fast development and building
- **Tailwind CSS 4** for modern, utility-first styling
- **Radix UI** components for accessible, customizable UI primitives

### **State Management**
- **React Context API** for global state management
- **Custom Hooks** for reusable logic and side effects
- **Local Storage** for persistent data and user preferences

### **AI Integration**
- **Google Generative AI** (Gemini) integration
- **Mistral AI** API support
- **Cohere AI** language model integration
- **Modular API architecture** for easy model addition

### **Additional Libraries**
- **jsPDF** for PDF export functionality
- **React Markdown** for rich text rendering
- **React Syntax Highlighter** for code formatting
- **Lucide React** for beautiful, consistent icons

---

## 📁 Project Structure
```
AI Chatbot/
├── public/                  # Static assets and icons
├── src/
│   ├── api/                 # AI model integrations (Gemini, Mistral, Cohere)
│   ├── assets/              # Images, SVGs, and brand assets
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # shadcn/ui primitives (buttons, cards, etc.)
│   │   ├── BotCard.tsx      # Bot display component
│   │   ├── BotForm.tsx      # Bot creation/editing form
│   │   ├── BotResponseBox.tsx # Chat response display with markdown
│   │   ├── VoiceInput.tsx   # Speech-to-text functionality
│   │   └── UserOnboardingModal.tsx # User welcome modal
│   ├── context/             # React context providers
│   │   ├── BotContext.tsx   # Bot and chat state management
│   │   ├── UserContext.tsx  # User data and preferences
│   │   └── theme-provider.tsx # Theme switching functionality
│   ├── data/                # Static configuration and data
│   │   ├── BotData.json     # Pre-configured bot definitions
│   │   ├── ModelOptions.ts  # Available AI models
│   │   └── SidebarLinks.ts  # Navigation structure
│   ├── hooks/               # Custom React hooks
│   ├── layout/              # Layout components and routing
│   ├── pages/               # Application pages and views
│   │   ├── Dashboard.tsx    # Main dashboard with bot overview
│   │   ├── CreateBot.tsx    # Bot creation interface
│   │   ├── ChattingPage.tsx # Main chat interface
│   │   ├── MyBots.tsx       # User-created bots management
│   │   └── Settings.tsx     # User preferences and settings
│   ├── router/              # Application routing configuration
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   │   ├── exportChatToPDF.ts # PDF export functionality
│   │   └── handleSendMessage.ts # Message handling logic
│   └── index.css            # Global styles and Tailwind configuration
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration
└── README.md                # This file
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v18 or above)
- npm or yarn package manager
- API keys for AI models (optional for development)

### **Installation Steps**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rohan04022003/botForge-AI.git
   cd AI-Chatbot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables (optional):**
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key
   VITE_MISTRAL_API_KEY=your_mistral_api_key
   VITE_COHERE_API_KEY=your_cohere_api_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:5173](http://localhost:5173)

---

## 🎯 Usage Guide

### **Getting Started**
1. **User Onboarding**: Complete the welcome modal with your details
2. **Explore Built-in Bots**: Try the pre-configured specialized bots
3. **Start Chatting**: Click on any bot to begin a conversation

### **Creating Custom Bots**
1. Navigate to "Create Bot" from the sidebar
2. Fill in bot details:
   - **Name**: Choose a descriptive name
   - **Greeting**: Set a welcome message
   - **Description**: Explain what your bot does
   - **Role**: Define the bot's personality and capabilities
   - **Category**: Select from predefined categories
   - **Model**: Choose your preferred AI model
3. Save and start chatting with your custom bot

### **Advanced Features**
- **Voice Input**: Click the microphone icon for speech-to-text
- **Export Chats**: Download conversation history as PDF
- **Code Copying**: Click the copy button on code blocks
- **Theme Switching**: Toggle between light and dark modes
- **Search & Filter**: Find bots quickly using the search bar

---

## 🛠️ Customization

### **Adding New AI Models**
1. Create a new API integration file in `src/api/`
2. Add the model to `src/data/ModelOptions.ts`
3. Update the bot handling logic in `src/utils/handleSendMessage.ts`

### **Creating New Bot Categories**
1. Add new category types in `src/types/types.ts`
2. Update the category options in `src/components/BotForm.tsx`
3. Add corresponding icons and styling

### **Modifying the UI Theme**
1. Edit Tailwind configuration in `tailwind.config.js`
2. Update CSS variables in `src/index.css`
3. Modify component-specific styles as needed

---

## 🔧 Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build
- **`npm run lint`** - Run ESLint for code quality

---

## 🌟 Built-in Bots

The platform comes with 10+ specialized bots:

- **BotForge AI** - General purpose assistant
- **Gym Guider** - Fitness and workout planning
- **Career Coach** - Resume and interview preparation
- **Mindful Monk** - Meditation and stress relief
- **Code Helper** - Programming assistance
- **Chef Bot** - Recipe recommendations
- **Study Buddy** - Academic tutoring
- **Daily Planner** - Productivity and time management
- **Finance Friend** - Personal finance advice
- **Travel Guide** - Travel planning and tips

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Use meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 🐛 Troubleshooting

### **Common Issues**

**API Errors**
- Verify your API keys are correct and not expired
- Check the browser console for detailed error messages
- Ensure you have sufficient API credits

**Build Issues**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Update Node.js to the latest LTS version
- Check for conflicting dependency versions

**UI/UX Problems**
- Clear browser cache and local storage
- Check browser compatibility (Chrome, Firefox, Safari, Edge)
- Verify all dependencies are properly installed

---

## ❓ Frequently Asked Questions

**Q: Can I use my own AI models?**
A: Yes! The modular architecture makes it easy to add new AI model integrations.

**Q: How is chat history stored?**
A: Chat history is currently stored in browser memory and localStorage. For production use, consider adding a backend database.

**Q: Is this production-ready?**
A: The codebase is well-structured and feature-complete, but for production deployment, add proper security measures, error handling, and backend services.

**Q: Can I deploy this on my own server?**
A: Absolutely! The project is designed to be easily deployable on any hosting platform that supports Node.js.

**Q: How do I add new bot categories?**
A: Extend the `BotCategory` type in `types.ts` and update the form components accordingly.

---

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful, accessible UI components
- **Tailwind CSS** for the utility-first CSS framework
- **Vite** for the fast build tool
- **React Team** for the amazing framework
- **AI Model Providers** (Google, Mistral, Cohere) for their APIs

---

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/Rohan04022003/botForge-AI/issues)
- **Live Demo**: [Try the application](https://bot-forge-ai.vercel.app/)
- **Documentation**: Check the code comments and types for detailed information

---

**Made with ❤️ by the Rohan Kumar Mahto**
