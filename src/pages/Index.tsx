
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserAuthForm } from "@/components/auth/UserAuthForm";
import { TherapistAuthForm } from "@/components/auth/TherapistAuthForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Headphones, Shield, MessageSquare, BookOpen, Check } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("about");
  
  const handleAuthSuccess = (email: string) => {
    // In a real app, we'd set auth state and redirect based on user role
    navigate("/dashboard");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-serenity-50 to-white">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-serenity-500 flex items-center justify-center">
            <span className="font-bold text-white">S</span>
          </div>
          <span className="font-semibold text-xl">Serenity</span>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <button 
            className={cn(
              "text-sm font-medium transition-colors",
              activeTab === "about" ? "text-serenity-700" : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
          <button 
            className={cn(
              "text-sm font-medium transition-colors",
              activeTab === "features" ? "text-serenity-700" : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab("features")}
          >
            Features
          </button>
          <button 
            className={cn(
              "text-sm font-medium transition-colors",
              activeTab === "therapists" ? "text-serenity-700" : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab("therapists")}
          >
            Therapists
          </button>
          <button 
            className={cn(
              "text-sm font-medium transition-colors",
              activeTab === "resources" ? "text-serenity-700" : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab("resources")}
          >
            Resources
          </button>
        </nav>
        
        <div>
          <Button onClick={() => setActiveTab("login")}>Sign In</Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-10">
        {activeTab !== "login" ? (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Your safe space for <span className="text-serenity-600">mental wellness</span>
              </h1>
              
              <p className="text-xl text-muted-foreground">
                Serenity provides a secure and private platform for mental health support, 
                connecting you with verified therapists and therapeutic resources.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="lg" 
                  className="font-medium"
                  onClick={() => setActiveTab("login")}
                >
                  Join Serenity
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="font-medium"
                  onClick={() => setActiveTab("therapists")}
                >
                  Browse Therapists
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 flex-shrink-0 h-6 w-6 rounded-full bg-serenity-100 flex items-center justify-center">
                    <Shield className="h-3 w-3 text-serenity-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Verified Professionals</h3>
                    <p className="text-sm text-muted-foreground">All therapists are vetted and verified</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="mt-1 flex-shrink-0 h-6 w-6 rounded-full bg-serenity-100 flex items-center justify-center">
                    <MessageSquare className="h-3 w-3 text-serenity-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Peer Support</h3>
                    <p className="text-sm text-muted-foreground">Connect with others on similar journeys</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="mt-1 flex-shrink-0 h-6 w-6 rounded-full bg-serenity-100 flex items-center justify-center">
                    <Headphones className="h-3 w-3 text-serenity-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Sound Therapy</h3>
                    <p className="text-sm text-muted-foreground">Calming sounds to reduce stress</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="mt-1 flex-shrink-0 h-6 w-6 rounded-full bg-serenity-100 flex items-center justify-center">
                    <BookOpen className="h-3 w-3 text-serenity-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Resource Library</h3>
                    <p className="text-sm text-muted-foreground">Self-help and mental health resources</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-12 -left-12 h-64 w-64 bg-serenity-100 rounded-full opacity-50 blur-3xl"></div>
              <div className="absolute -bottom-12 -right-12 h-64 w-64 bg-serenity-600 rounded-full opacity-20 blur-3xl"></div>
              
              <div className="relative bg-white rounded-xl shadow-lg border p-6 overflow-hidden">
                <div className="absolute top-0 right-0 h-16 w-16 bg-serenity-100 rounded-bl-full"></div>
                
                <div className="space-y-8">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-serenity-500 flex items-center justify-center">
                      <span className="font-bold text-2xl text-white">S</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Serenity Safe Space</h2>
                      <p className="text-sm text-muted-foreground">Your mental wellness companion</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 hover:bg-serenity-50 transition-colors">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-serenity-100 flex items-center justify-center">
                          <Headphones className="h-4 w-4 text-serenity-700" />
                        </div>
                        <h3 className="font-medium">Sound Therapy</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Soothing sounds to calm your mind</p>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:bg-serenity-50 transition-colors">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-serenity-100 flex items-center justify-center">
                          <svg className="h-4 w-4 text-serenity-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                        </div>
                        <h3 className="font-medium">Mood Journal</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Track your emotional wellness journey</p>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:bg-serenity-50 transition-colors">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-serenity-100 flex items-center justify-center">
                          <svg className="h-4 w-4 text-serenity-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                        </div>
                        <h3 className="font-medium">Therapist Connect</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Find the right professional for you</p>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:bg-serenity-50 transition-colors">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-serenity-100 flex items-center justify-center">
                          <svg className="h-4 w-4 text-serenity-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                        </div>
                        <h3 className="font-medium">Resource Library</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Evidence-based mental health resources</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      className="w-full" 
                      onClick={() => setActiveTab("login")}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-2">
                <div className="h-12 w-12 rounded-full bg-serenity-500 flex items-center justify-center">
                  <span className="font-bold text-2xl text-white">S</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold">Welcome to Serenity</h1>
              <p className="text-muted-foreground">Your secure mental health support platform</p>
            </div>
            
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="user">I'm seeking support</TabsTrigger>
                <TabsTrigger value="therapist">I'm a therapist</TabsTrigger>
              </TabsList>
              
              <TabsContent value="user">
                <div className="border rounded-lg p-6">
                  <UserAuthForm onSuccess={handleAuthSuccess} />
                </div>
              </TabsContent>
              
              <TabsContent value="therapist">
                <div className="border rounded-lg p-6">
                  <TherapistAuthForm onSuccess={handleAuthSuccess} />
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 flex justify-center">
              <button 
                className="text-sm text-muted-foreground hover:text-serenity-600"
                onClick={() => setActiveTab("about")}
              >
                ← Back to homepage
              </button>
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-serenity-50 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Serenity</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-serenity-600">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-serenity-600">Our Mission</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-serenity-600">Join Our Team</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-serenity-600">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-serenity-600">Mental Health Library</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-serenity-600">Sound Therapy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-serenity-600">Wellness Exercises</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-serenity-600">Self-Help Tools</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Therapists</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-serenity-600">Join Our Network</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-serenity-600">Verification Process</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-serenity-600">Tools & Resources</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-serenity-600">Community Guidelines</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-serenity-600">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-serenity-600">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-serenity-600">Data Security</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-serenity-600">HIPAA Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-serenity-500 flex items-center justify-center">
                <span className="font-bold text-white">S</span>
              </div>
              <span className="font-semibold">Serenity</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Serenity Safe Space. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
