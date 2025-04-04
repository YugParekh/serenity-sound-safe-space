
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SoundPlayer, SoundData } from "@/components/therapy/SoundPlayer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Headphones, Search, Heart, Clock, Volume } from "lucide-react";

// Sample sounds data
const soundsData: SoundData[] = [
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
  {
    id: "s3",
    title: "Forest Ambience",
    description: "Immersive forest sounds with birds and gentle wind",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b",
    audioUrl: "#", // Would be real file in production
    duration: 240,
    category: "Nature",
  },
  {
    id: "s4",
    title: "Gentle Rain",
    description: "Soothing rainfall without thunder",
    imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e695",
    audioUrl: "#", // Would be real file in production
    duration: 150,
    category: "Nature",
  },
  {
    id: "s5",
    title: "Binaural Focus",
    description: "Binaural beats for enhanced concentration",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    audioUrl: "#", // Would be real file in production
    duration: 300,
    category: "Focus",
  },
  {
    id: "s6",
    title: "Tibetan Singing Bowls",
    description: "Traditional singing bowls for deep meditation",
    imageUrl: "https://images.unsplash.com/photo-1514302240736-b1fee5985889",
    audioUrl: "#", // Would be real file in production
    duration: 210,
    category: "Meditation",
  },
];

// Categories
const categories = [
  "All",
  "Nature",
  "Meditation",
  "Focus",
  "Sleep",
  "Anxiety Relief",
  "Relaxation",
];

const SoundTherapyPage = () => {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredSounds = soundsData.filter((sound) => {
    const matchesCategory = currentCategory === "All" || sound.category === currentCategory;
    const matchesSearch = sound.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sound.description.toLowerCase().includes(searchQuery.toLowerCase());
    
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
                    <Headphones className="h-6 w-6 mr-2 text-serenity-500" />
                    Sound Therapy
                  </h1>
                  <p className="text-muted-foreground">
                    Explore calming sounds to reduce stress and improve focus
                  </p>
                </div>
                <Button>
                  <Heart className="h-4 w-4 mr-2" />
                  Favorites
                </Button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-full md:w-1/3">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="Search sounds..."
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSounds.length > 0 ? (
                  filteredSounds.map((sound) => (
                    <SoundPlayer key={sound.id} sound={sound} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Volume className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No sounds found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filter to find what you're looking for
                    </p>
                  </div>
                )}
              </div>
            </section>
            
            <section className="space-y-6">
              <h2 className="text-xl font-semibold">Sound Therapy Benefits</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Stress Reduction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Nature sounds and gentle music can activate the parasympathetic nervous system, 
                      reducing cortisol levels and promoting relaxation.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Improved Focus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Binaural beats and ambient sounds can enhance concentration by masking 
                      distracting noises and creating an optimal mental state.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Better Sleep</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Sounds like white noise, gentle rain, or soft melodies can help mask environmental 
                      noises and prepare your brain for restorative sleep.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            <section className="bg-serenity-50 rounded-lg p-6 space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <Clock className="h-6 w-6 text-serenity-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Daily Sound Therapy Challenge</h2>
                  <p className="text-muted-foreground">
                    Listen to a therapeutic sound for at least 10 minutes daily to build a consistent relaxation practice
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="border rounded-md p-4 bg-white">
                  <h3 className="font-medium mb-2">Morning Ritual</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start your day with gentle meditation bells to set a peaceful tone
                  </p>
                  <Badge variant="outline" className="bg-serenity-50 text-serenity-700">
                    5-10 minutes
                  </Badge>
                </div>
                
                <div className="border rounded-md p-4 bg-white">
                  <h3 className="font-medium mb-2">Midday Reset</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use nature sounds during a short break to refresh your mind
                  </p>
                  <Badge variant="outline" className="bg-serenity-50 text-serenity-700">
                    10-15 minutes
                  </Badge>
                </div>
                
                <div className="border rounded-md p-4 bg-white">
                  <h3 className="font-medium mb-2">Evening Wind Down</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Listen to gentle rain or ocean waves before sleep
                  </p>
                  <Badge variant="outline" className="bg-serenity-50 text-serenity-700">
                    15-30 minutes
                  </Badge>
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button>
                  Start Today's Challenge
                </Button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SoundTherapyPage;
