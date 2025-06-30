export type UserData = {
    name: string;
    email: string;
    gender: string;
};

export type UserContextType = {
    user: UserData | null;
    setUser: (data: UserData) => void;
    deleteUser: () => void
};