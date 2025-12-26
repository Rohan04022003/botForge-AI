import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UserOnboardingModal = () => {
    const { setUser } = useUser(); // yaha se user ke data ko set kr rhe hai. jb user first time login krega.
    const [name, setName] = useState(""); // user ka name.
    const [gender, setGender] = useState(""); // user ka gender.
    const [email, setEmail] = useState(""); // user ka email.

    const handleSubmit = () => { // jb user click krega tb user set ho jayeaga local storage me.
        if (!name.trim() || !gender || !email.trim()) return;
        setUser({ name: name.trim(), email: email.trim(), gender });
    };

    return (
        <Dialog open>
            <DialogContent className="max-w-sm w-[95%]" showCloseButton={false}>
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
                        aria-label="user name"
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
                        aria-label="user email"
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
                    aria-label="user submit"
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
