
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Shield, ShieldCheck } from "lucide-react";

interface UserAuthFormProps {
  onSuccess: (email: string) => void;
}

export function UserAuthForm({ onSuccess }: UserAuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent, isSignUp: boolean) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Simulate auth process
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      if (isSignUp) {
        toast.success("Account created successfully!");
      } else {
        toast.success("Logged in successfully!");
      }
      
      onSuccess(email);
    } catch (error) {
      toast.error("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      
      <TabsContent value="login">
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-serenity-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </TabsContent>
      
      <TabsContent value="register">
        <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
              type="email"
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-password">Password</Label>
            <Input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-start space-x-2 text-sm">
            <div className="pt-1 text-serenity-600">
              <Shield size={16} />
            </div>
            <p className="text-muted-foreground">
              Your data is encrypted and protected. We prioritize your privacy and security.
            </p>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </TabsContent>
      
      <div className="mt-6 flex items-center justify-center space-x-2">
        <ShieldCheck className="h-5 w-5 text-serenity-600" />
        <span className="text-sm text-muted-foreground">Secure and private platform</span>
      </div>
    </Tabs>
  );
}
