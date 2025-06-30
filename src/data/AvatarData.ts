import others_avatar from "@/assets/others_avatar.jpg"

type AvatarProp = {
    gender: "Male" | "Female" | "Other";
    avatar: string;
};

export const avatarList: AvatarProp[] = [
    {
        gender: "Male",
        avatar: "https://static.vecteezy.com/system/resources/previews/024/183/502/non_2x/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg"
    },
    {
        gender: "Female",
        avatar: "https://t4.ftcdn.net/jpg/02/79/66/93/360_F_279669366_Lk12QalYQKMczLEa4ySjhaLtx1M2u7e6.jpg"
    },
    {
        gender: "Other",
        avatar: others_avatar
    }
];
