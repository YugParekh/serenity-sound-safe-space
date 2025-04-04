
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { MoodTracker } from "@/components/dashboard/MoodTracker";
import { TherapistCard, TherapistData } from "@/components/therapy/TherapistCard";
import { SoundPlayer, SoundData } from "@/components/therapy/SoundPlayer";
import { TherapeuticGame, GameData } from "@/components/therapy/TherapeuticGame";
import { ResourceCard, ResourceData } from "@/components/resources/ResourceCard";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MessageSquare, Heart, Gamepad, Headphones, BookOpen, Plus, Star } from "lucide-react";

// Sample data
const therapists: TherapistData[] = [
  {
    id: "t1",
    name: "Dr. Sarah Johnson",
    title: "Licensed Clinical Psychologist",
    specialties: ["Anxiety", "Depression", "Trauma"],
    rating: 4.9,
    reviewCount: 127,
    experience: 12,
    availability: "Available this week",
    price: 120,
    bio: "Dr. Johnson specializes in cognitive behavioral therapy for anxiety and depression. With over 12 years of experience, she helps clients develop coping strategies for life's challenges.",
    verified: true,
  },
  {
    id: "t2",
    name: "Dr. Michael Chen",
    title: "Psychiatrist, MD",
    specialties: ["Medication Management", "Bipolar Disorder", "ADHD"],
    rating: 4.7,
    reviewCount: 98,
    experience: 15,
    availability: "Available next week",
    price: 150,
    bio: "Dr. Chen is a board-certified psychiatrist specializing in medication management and holistic approaches to mental health.",
    verified: true,
  },
];

const sounds: SoundData[] = [
  {
    id: "s1",
    title: "Ocean Waves",
    description: "Gentle ocean waves for relaxation",
    imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d",
    audioUrl: "#", // Would be real file in production
    duration: 180,
    category: "Nature",
  },
  {
    id: "s2",
    title: "Meditation Bells",
    description: "Calming bells for meditation practice",
    imageUrl: "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d",
    audioUrl: "#", // Would be real file in production
    duration: 120,
    category: "Meditation",
  },
];

const games: GameData[] = [
  {
    id: "g1",
    title: "Mindful Matching",
    description: "A pattern matching game that improves focus",
    imageUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
    category: "Focus & Attention",
    difficulty: "easy",
    duration: 5,
    benefits: ["Improved focus", "Stress reduction", "Cognitive training"],
  },
];

const resources: ResourceData[] = [
  {
    id: "r1",
    title: "Understanding Anxiety: A Comprehensive Guide",
    description: "Learn about anxiety symptoms, causes, and management strategies",
    thumbnail: "https://images.unsplash.com/photo-1593062096033-9a26b09da705",
    type: "article",
    categories: ["Anxiety", "Self-Help", "Education"],
    readTime: 15,
    author: "Dr. Emily Martinez",
    rating: 4.8,
    reviewCount: 64,
    isFree: true,
  },
];

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-gray-50">
        <AppSidebar userType="user" />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <header className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Welcome back, Sarah</h1>
                <p className="text-muted-foreground">Here's your wellness summary for today</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Session
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Journal
                </Button>
              </div>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-serenity-500" />
                    Upcoming Session
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-serenity-100 text-serenity-800">SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Dr. Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">Tomorrow, 3:00 PM</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Button variant="outline" size="sm">Reschedule</Button>
                  <Button size="sm">Join Session</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-serenity-500" />
                    Wellness Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold">74/100</span>
                    <Badge className="bg-green-100 text-green-800">Improving</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall progress</span>
                      <span>74%</span>
                    </div>
                    <Progress value={74} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Your wellness score has improved by 12% in the last month.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="p-0 h-auto text-serenity-600" size="sm">
                    View detailed breakdown
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-serenity-500" />
                    Recent Messages
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-b pb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-serenity-100 text-serenity-800">SJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                        <p className="text-xs text-muted-foreground">5 hours ago</p>
                      </div>
                    </div>
                    <p className="text-sm mt-2">
                      Hi Sarah, just following up on your progress with the mindfulness exercises...
                    </p>
                  </div>
                  <div className="border-b pb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-serenity-100 text-serenity-800">MC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Support Team</p>
                        <p className="text-xs text-muted-foreground">Yesterday</p>
                      </div>
                    </div>
                    <p className="text-sm mt-2">
                      Thank you for your feedback on our new sound therapy feature...
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full" size="sm">
                    View All Messages
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MoodTracker />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-serenity-500" />
                    Therapy Progress
                  </CardTitle>
                  <CardDescription>
                    Track your journey with Dr. Sarah Johnson
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-serenity-100 text-serenity-800">SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Dr. Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">12 sessions completed</p>
                      <div className="flex mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="h-4 w-4 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Anxiety Management</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Sleep Quality</span>
                        <span>80%</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Stress Reduction</span>
                        <span>50%</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-serenity-50">
                    <h3 className="font-medium mb-2">Therapist Notes</h3>
                    <p className="text-sm text-muted-foreground">
                      Sarah has been making good progress with anxiety management techniques. 
                      Continue practicing mindfulness exercises 2x daily.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex space-x-2">
                  <Button variant="outline" className="flex-1">View Full Report</Button>
                  <Button className="flex-1">Book Next Session</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center">
                  <Headphones className="h-5 w-5 mr-2 text-serenity-500" />
                  Recommended Sounds
                </h2>
                <Button variant="link" className="text-serenity-600">View All</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sounds.map((sound) => (
                  <SoundPlayer key={sound.id} sound={sound} />
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center">
                  <Gamepad className="h-5 w-5 mr-2 text-serenity-500" />
                  Therapeutic Games
                </h2>
                <Button variant="link" className="text-serenity-600">View All</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {games.map((game) => (
                  <TherapeuticGame key={game.id} game={game} />
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-serenity-500" />
                  Recommended Resources
                </h2>
                <Button variant="link" className="text-serenity-600">View All</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-serenity-500" />
                  Recommended Therapists
                </h2>
                <Button variant="link" className="text-serenity-600">View All</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {therapists.map((therapist) => (
                  <TherapistCard key={therapist.id} therapist={therapist} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
