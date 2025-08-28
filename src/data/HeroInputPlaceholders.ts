export const getPlaceholder = (view: string) => {
        switch (view) {
            case "BotForge AI":
                return "Ask anything... I'm your all in one AI assistant!";
            case "Built in Bots":
                return "Search for built-in bots like Interview Coach, Fitness Guide, etc.";
            case "Your Bots":
                return "Search your custom bots by name...";
            default:
                return "Type something...";
        }
    };