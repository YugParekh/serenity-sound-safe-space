
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TherapeuticGame, GameData } from "@/components/therapy/TherapeuticGame";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Gamepad, Search, Award, Trophy, Brain } from "lucide-react";

// Sample games data
const gamesData: GameData[] = [
  {
    id: "g1",
    title: "Mindful Matching",
    description: "A pattern matching game that improves focus and attention",
    imageUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
    category: "Focus & Attention",
    difficulty: "easy",
    duration: 5,
    benefits: ["Improved focus", "Stress reduction", "Cognitive training"],
  },
  {
    id: "g2",
    title: "Emotion Explorer",
    description: "Learn to identify and manage emotions through interactive puzzles",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
    category: "Emotional Regulation",
    difficulty: "medium",
    duration: 8,
    benefits: ["Emotional awareness", "Self-regulation", "Mindfulness"],
  },
  {
    id: "g3",
    title: "Anxiety Alleviator",
    description: "Reduce anxiety through breathing exercises and calming puzzles",
    imageUrl: "https://images.unsplash.com/photo-1455849318743-b2233052fcff",
    category: "Anxiety Management",
    difficulty: "easy",
    duration: 10,
    benefits: ["Anxiety reduction", "Relaxation", "Breathing control"],
  },
  {
    id: "g4",
    title: "Memory Master",
    description: "Train your memory with challenging recall exercises",
    imageUrl: "https://images.unsplash.com/photo-1544819667-9bfc1de23d4e",
    category: "Cognitive Skills",
    difficulty: "hard",
    duration: 15,
    benefits: ["Memory improvement", "Cognitive function", "Brain training"],
  },
  {
    id: "g5",
    title: "Social Skills Simulator",
    description: "Practice social interactions in a safe, virtual environment",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    category: "Social Skills",
    difficulty: "medium",
    duration: 12,
    benefits: ["Communication skills", "Empathy development", "Social confidence"],
  },
  {
    id: "g6",
    title: "Mood Lifter",
    description: "Activities designed to boost your mood and increase positive emotions",
    imageUrl: "https://images.unsplash.com/photo-1515669097368-22e68427d265",
    category: "Mood Enhancement",
    difficulty: "easy",
    duration: 7,
    benefits: ["Positive thinking", "Mood improvement", "Joy cultivation"],
  },
];

// Categories
const categories = [
  "All",
  "Focus & Attention",
  "Emotional Regulation",
  "Anxiety Management",
  "Cognitive Skills",
  "Social Skills",
  "Mood Enhancement",
];

const GamesPage = () => {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [userProgress, setUserProgress] = useState({
    gamesCompleted: 12,
    totalMinutes: 87,
    streakDays: 5,
    favoriteCategory: "Focus & Attention"
  });
  
  const filteredGames = gamesData.filter((game) => {
    const matchesCategory = currentCategory === "All" || game.category === currentCategory;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-gray-50">
        <AppSidebar userType="user" />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <header className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center">
                    <Gamepad className="h-6 w-6 mr-2 text-serenity-500" />
                    Therapeutic Games
                  </h1>
                  <p className="text-muted-foreground">
                    Fun activities designed to improve your mental wellbeing
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-full md:w-1/3">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="Search games..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Tabs
                  value={currentCategory}
                  onValueChange={setCurrentCategory}
                  className="w-full md:w-2/3"
                >
                  <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start">
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className="whitespace-nowrap"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </header>
            
            <section className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-serenity-500" />
                      Your Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Games Completed</p>
                        <p className="text-2xl font-bold">{userProgress.gamesCompleted}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Total Time</p>
                        <p className="text-2xl font-bold">{userProgress.totalMinutes} min</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Streak</p>
                        <p className="text-2xl font-bold">{userProgress.streakDays} days</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Weekly Goal</span>
                        <span>70%</span>
                      </div>
                      <Progress value={70} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        You've played 7 out of 10 games this week
                      </p>
                    </div>
                  </CardContent>
                </Card>
              
                <Card className="col-span-1 md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Award className="h-5 w-5 mr-2 text-serenity-500" />
                      Mental Wellness Benefits
                    </CardTitle>
                    <CardDescription>
                      How therapeutic games help your mental health
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-start space-x-2">
                        <div className="mt-1 h-8 w-8 rounded-full bg-serenity-100 flex items-center justify-center">
                          <Brain className="h-4 w-4 text-serenity-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Cognitive Training</h3>
                          <p className="text-sm text-muted-foreground">Improves memory and attention</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <div className="mt-1 h-8 w-8 rounded-full bg-serenity-100 flex items-center justify-center">
                          <svg className="h-4 w-4 text-serenity-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>
                        </div>
                        <div>
                          <h3 className="font-medium">Stress Reduction</h3>
                          <p className="text-sm text-muted-foreground">Decreases anxiety and tension</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <div className="mt-1 h-8 w-8 rounded-full bg-serenity-100 flex items-center justify-center">
                          <svg className="h-4 w-4 text-serenity-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 2a10 10 0 0 1 10 10h-10V2z"></path></svg>
                        </div>
                        <div>
                          <h3 className="font-medium">Emotional Regulation</h3>
                          <p className="text-sm text-muted-foreground">Helps manage emotional responses</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <div className="mt-1 h-8 w-8 rounded-full bg-serenity-100 flex items-center justify-center">
                          <svg className="h-4 w-4 text-serenity-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                        </div>
                        <div>
                          <h3 className="font-medium">Mood Enhancement</h3>
                          <p className="text-sm text-muted-foreground">Boosts positive emotions</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            <section className="space-y-6">
              <h2 className="text-xl font-semibold">Available Games</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map((game) => (
                  <TherapeuticGame key={game.id} game={game} />
                ))}
              </div>
            </section>
            
            <section className="bg-serenity-50 rounded-lg p-6 space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <Gamepad className="h-6 w-6 text-serenity-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Daily Game Challenge</h2>
                  <p className="text-muted-foreground">
                    Play one therapeutic game daily to build a consistent mental wellness practice
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Today's Challenge</CardTitle>
                    <CardDescription>Complete any focus game for 5+ minutes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>0%</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Start Challenge</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Rewards</CardTitle>
                    <CardDescription>What you'll earn by completing challenges</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-serenity-500">3 days</Badge>
                        <span className="font-medium">Meditation Unlock</span>
                      </div>
                      <Trophy className="h-5 w-5 text-serenity-500" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-serenity-600">7 days</Badge>
                        <span className="font-medium">Wellness Badge</span>
                      </div>
                      <Award className="h-5 w-5 text-serenity-600" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-serenity-700">30 days</Badge>
                        <span className="font-medium">Progress Report</span>
                      </div>
                      <svg className="h-5 w-5 text-serenity-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default GamesPage;
