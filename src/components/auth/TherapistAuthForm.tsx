
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Shield, Upload, Check } from "lucide-react";

interface TherapistAuthFormProps {
  onSuccess: (email: string) => void;
}

export function TherapistAuthForm({ onSuccess }: TherapistAuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [license, setLicense] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [documentUploaded, setDocumentUploaded] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!documentUploaded) {
      toast.error("Please upload your credentials");
      return;
    }
    
    setIsLoading(true);

    try {
      // Simulate verification process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast.success("Registration submitted for verification!");
      onSuccess(email);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = () => {
    // Simulate file upload
    setTimeout(() => {
      setDocumentUploaded(true);
      toast.success("Document uploaded successfully");
    }, 1500);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-center">Therapist Registration</h2>
        <p className="text-muted-foreground text-center mt-2">
          Join our platform to provide mental health support
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Dr. Jane Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Professional Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="dr.jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="license">License Number</Label>
          <Input
            id="license"
            type="text"
            placeholder="PSY12345"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="specialization">Specialization</Label>
          <Input
            id="specialization"
            type="text"
            placeholder="Anxiety, Depression, PTSD"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio">Professional Bio</Label>
          <Textarea
            id="bio"
            placeholder="Share your experience and approach to therapy..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            className="min-h-[100px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="border rounded-md p-4 space-y-3">
          <Label className="block">Upload Credentials</Label>
          <p className="text-sm text-muted-foreground">
            Please upload your license and certification documents for verification
          </p>
          
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer
                ${documentUploaded ? 'border-serenity-500 bg-serenity-50' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {documentUploaded ? (
                  <>
                    <Check className="w-8 h-8 mb-2 text-serenity-600" />
                    <p className="text-sm text-serenity-600">Document uploaded successfully</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="text-sm text-gray-500">Click to upload documents</p>
                  </>
                )}
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        </div>
        
        <div className="flex items-start space-x-2 text-sm">
          <div className="pt-1 text-serenity-600">
            <Shield size={16} />
          </div>
          <p className="text-muted-foreground">
            We verify all therapist credentials. This process may take 1-3 business days.
          </p>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Submitting for verification..." : "Submit Registration"}
        </Button>
      </form>
      
      <div className="mt-6 flex items-center justify-center">
        <Badge variant="outline" className="bg-serenity-50 text-serenity-700">
          Verified Therapists Only
        </Badge>
      </div>
    </div>
  );
}
