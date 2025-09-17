import others_avatar from "@/assets/others_avatar.jpg"
import male_avatar from "@/assets/male_avatar.jpg"
import female_avatar from "@/assets/female_avatar.jpg"

type AvatarProp = {
    gender: "Male" | "Female" | "Other";
    avatar: string;
};

export const avatarList: AvatarProp[] = [
    {
        gender: "Male",
        avatar: male_avatar
    },
    {
        gender: "Female",
        avatar: female_avatar
    },
    {
        gender: "Other",
        avatar: others_avatar
    }
];
