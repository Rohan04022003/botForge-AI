import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";
import { avatarList } from "@/data/AvatarData";
import { useBotContext } from "@/context/BotContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/theme-provider";

const Settings = () => {
  const [deleteEmail, setDeleteEmail] = useState("");
  const [resetChatEmail, setResetChatEmail] = useState("");

  // bot context se resetBots liya hai
  const { resetBots, resetAllChats } = useBotContext();

  // user context se deleteUser liya hai
  const { deleteUser, user, setUser } = useUser();

  // page navigation
  const navigate = useNavigate();

  // dark and light mode toggle ke liye useState
  const { setTheme, theme } = useTheme();

  // user profile update
  const [showProfileForm, setShowPofileForm] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  // yaha pe userData ke help se avatarList ko fetch kr rhe hai.
  const presentUser = avatarList.filter((avatar) => avatar.gender.toLowerCase() === user?.gender)

  // handle profile submit
  const handleSubmit = () => {
    if (!name.trim() || !gender || !email.trim()) return;
    setUser({ name: name.trim(), email: email.trim(), gender });
  };

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setGender(user.gender)
    }
  }, [showProfileForm, user])

  // ------------------------------------------
  // Delete user ka function
  const deleteAccount = () => {
    resetBots();
    deleteUser();
  }

  return (
    <div className="lg:w-2/3 mx-auto py-10 space-y-6">

      {/* User Profile */}
      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">User Profile</CardTitle>
          </div>
          <Button 
            onClick={() => setShowPofileForm(true)} 
            variant="outline" 
            size="sm" 
            className={`shadow-none ${showProfileForm ? "hidden" : "flex"}`}
            aria-label="Update Profile"
          >
            Update Profile
          </Button>
        </CardHeader>

        {!showProfileForm ?

          <CardContent className="flex items-center gap-4">
            {/* Avatar with accessibility */}
            <Avatar className="w-16 h-16">
              <AvatarImage src="/user.png" alt="User Avatar" />
              <AvatarFallback>
                <img src={presentUser[0]?.avatar} alt="Fallback Avatar" />
              </AvatarFallback>
            </Avatar>

            {/* User info */}
            <div>
              <p className="text-base font-medium">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </CardContent>

          :

          // user profile data update krne ke liye form 
          <CardContent>
            <div className="space-y-4">
              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={40}
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your Email."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Gender Select */}
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <div className="flex items-center gap-4" role="radiogroup" aria-label="Select Gender">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                      className="accent-blue-500"
                    />
                    Male
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                      className="accent-pink-500"
                    />
                    Female
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={gender === "other"}
                      onChange={(e) => setGender(e.target.value)}
                      className="accent-purple-500"
                    />
                    Other
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => (handleSubmit(), setShowPofileForm(false))}
                  className="mt-2"
                  disabled={!name.trim() || !email.trim() || !gender || (name === user?.name && email === user.email && gender === user.gender)}
                  aria-label="Update Profile Information"
                >
                  Update
                </Button>
                <Button
                  onClick={() => (setShowPofileForm(false))}
                  className="mt-2"
                  disabled={!name.trim() || !email.trim() || !gender}
                  variant={"destructive"}
                  aria-label="Cancel Profile Update"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        }
      </Card>

      <Separator />

      {/* Appearance Settings */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="darkmode">Dark Mode</Label>
            <Switch
              id="darkmode"
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              className="cursor-pointer"
              aria-label="Toggle Dark Mode"
            />
          </div>
        </CardContent>
      </Card>

      {/* Bot Data Reset Section */}
      <Card className="border-blue-500 shadow-none">
        <CardHeader>
          <CardTitle className="text-blue-600">Reset Bot Chats / All Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            To reset your entire bot chat history or clear data, confirm your email.
          </p>
          <Input
            className="shadow-none"
            type="email"
            placeholder="Enter your email to proceed"
            value={resetChatEmail}
            onChange={(e) => setResetChatEmail(e.target.value)}
            aria-label="Enter your email to reset bot chats"
          />
          <Button
            onClick={() => (resetAllChats(), setResetChatEmail(""))}
            className="shadow-none"
            variant="outline"
            disabled={resetChatEmail !== user?.email}
            aria-label="Reset All Bot Chats"
          >
            Reset All Bot Chats
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone (account deletion) */}
      <Card className="border-red-500 shadow-none">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Deleting your account is permanent. To continue, confirm your email below.
          </p>
          <Input
            className="shadow-none"
            type="email"
            placeholder="Enter your email to confirm"
            value={deleteEmail}
            onChange={(e) => setDeleteEmail(e.target.value)}
            aria-label="Enter your email to delete account"
          />
          <Button
            className="shadow-none"
            variant="destructive"
            disabled={deleteEmail !== user?.email}
            onClick={() => (deleteAccount(), navigate("/"), setDeleteEmail(""))}
            aria-label="Delete Account permanently"
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
