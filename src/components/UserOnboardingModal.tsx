import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UserOnboardingModal = () => {
    const { setUser } = useUser();
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        if (!name.trim() || !gender || !email.trim()) return;
        setUser({ name: name.trim(), email: email.trim(), gender });
    };

    return (
        <Dialog open>
            <DialogContent className="max-w-sm w-[95%]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">
                        👋 Welcome to <span className="text-primary">BotForge</span>
                    </DialogTitle>
                </DialogHeader>

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

                    <div className="space-y-2">
                        <Label htmlFor="name">Email</Label>
                        <Input
                            id="name"
                            type="email"
                            placeholder="Enter your Email."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Gender Select */}
                    <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select onValueChange={setGender}>
                            <SelectTrigger id="gender">
                                <SelectValue placeholder="Select your gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">👨 Male</SelectItem>
                                <SelectItem value="female">👩 Female</SelectItem>
                                <SelectItem value="other">⚧️ Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Submit Button */}
                    <Button
                        onClick={handleSubmit}
                        className="w-full mt-2"
                        disabled={!name.trim() || !email.trim() || !gender}
                    >
                        Continue to BotForge
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UserOnboardingModal;
