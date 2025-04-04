
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { ResourceCard, ResourceData } from "@/components/resources/ResourceCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Search, BookmarkPlus, ExternalLink } from "lucide-react";

// Sample resources data
const resourcesData: ResourceData[] = [
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
  {
    id: "r2",
    title: "Cognitive Behavioral Therapy Techniques",
    description: "Evidence-based CBT exercises you can practice at home",
    thumbnail: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f",
    type: "guide",
    categories: ["Depression", "Anxiety", "Therapy"],
    readTime: 25,
    author: "Dr. James Wilson",
    rating: 4.9,
    reviewCount: 128,
    isFree: true,
  },
  {
    id: "r3",
    title: "Mindfulness Meditation for Beginners",
    description: "Learn the basics of mindfulness meditation with this easy guide",
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    type: "video",
    categories: ["Mindfulness", "Meditation", "Stress"],
    readTime: 10,
    author: "Sarah Chen, LMFT",
    rating: 4.7,
    reviewCount: 95,
    isFree: true,
  },
  {
    id: "r4",
    title: "Overcoming Social Anxiety: Step by Step",
    description: "Practical techniques to manage social anxiety in various situations",
    thumbnail: "https://images.unsplash.com/photo-1543269865-cbf427effbad",
    type: "course",
    categories: ["Anxiety", "Social Skills"],
    readTime: 45,
    author: "Dr. Michael Thompson",
    rating: 4.6,
    reviewCount: 76,
    isFree: false,
  },
  {
    id: "r5",
    title: "Sleep Hygiene: Improving Your Rest",
    description: "Evidence-based strategies to improve sleep quality and duration",
    thumbnail: "https://images.unsplash.com/photo-1455203459393-8c39915f40b7",
    type: "article",
    categories: ["Sleep", "Self-Care"],
    readTime: 12,
    author: "Dr. Lisa Patel",
    rating: 4.5,
    reviewCount: 54,
    isFree: true,
  },
  {
    id: "r6",
    title: "Trauma Recovery Workbook",
    description: "Exercises and prompts for processing and healing from trauma",
    thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    type: "workbook",
    categories: ["Trauma", "PTSD", "Self-Help"],
    readTime: 30,
    author: "Dr. Rebecca Martinez, PhD",
    rating: 4.9,
    reviewCount: 112,
    isFree: false,
  }
];

// Categories for filtering
const categories = [
  "All",
  "Anxiety",
  "Depression",
  "Mindfulness",
  "Sleep",
  "Trauma",
  "Therapy",
  "Self-Care",
  "Social Skills"
];

// Resource types for filtering
const resourceTypes = [
  "All Types",
  "Article",
  "Guide",
  "Video",
  "Course",
  "Workbook"
];

const ResourcesPage = () => {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [currentType, setCurrentType] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  
  const filteredResources = resourcesData.filter((resource) => {
    const matchesCategory = currentCategory === "All" || resource.categories.includes(currentCategory);
    const matchesType = currentType === "All Types" || resource.type.toLowerCase() === currentType.toLowerCase();
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFree = !showFreeOnly || resource.isFree;
    
    return matchesCategory && matchesType && matchesSearch && matchesFree;
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
                    <BookOpen className="h-6 w-6 mr-2 text-serenity-500" />
                    Mental Health Resources
                  </h1>
                  <p className="text-muted-foreground">
                    Evidence-based articles, guides, and tools for your wellbeing journey
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <BookmarkPlus className="h-4 w-4 mr-2" />
                    Saved
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-full md:w-1/3">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="Search resources..."
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
              
              <div className="flex flex-wrap gap-3">
                <Tabs
                  value={currentType}
                  onValueChange={setCurrentType}
                  className="flex-1"
                >
                  <TabsList className="overflow-x-auto flex flex-nowrap justify-start">
                    {resourceTypes.map((type) => (
                      <TabsTrigger
                        key={type}
                        value={type}
                        className="whitespace-nowrap"
                      >
                        {type}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
                
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer space-x-2">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-5 w-5 text-serenity-600" 
                      checked={showFreeOnly}
                      onChange={() => setShowFreeOnly(!showFreeOnly)}
                    />
                    <span className="text-sm font-medium">Free resources only</span>
                  </label>
                </div>
              </div>
            </header>
            
            <section className="space-y-6">
              <h2 className="text-xl font-semibold">Featured Resources</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </section>
            
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <svg className="h-5 w-5 mr-2 text-serenity-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    Serenity Journal
                  </CardTitle>
                  <CardDescription>
                    Track your thoughts, feelings, and mental health journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-md p-4 bg-serenity-50">
                    <h3 className="font-medium mb-2">Journal Prompts</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="h-5 w-5 text-serenity-500 mr-2">•</span>
                        <span>What are three things you're grateful for today?</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 text-serenity-500 mr-2">•</span>
                        <span>How would you describe your mood, and what influenced it?</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 text-serenity-500 mr-2">•</span>
                        <span>What's one small step you can take toward a goal today?</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Open Journal</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <ExternalLink className="h-5 w-5 mr-2 text-serenity-500" />
                    Crisis Resources
                  </CardTitle>
                  <CardDescription>
                    Immediate support for urgent mental health needs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">24/7 Crisis Lines</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start space-x-2">
                        <span className="font-medium">National Suicide Prevention Lifeline:</span>
                        <span className="text-serenity-700">1-800-273-8255</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="font-medium">Crisis Text Line:</span>
                        <span className="text-serenity-700">Text HOME to 741741</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="font-medium">Veteran's Crisis Line:</span>
                        <span className="text-serenity-700">1-800-273-8255 (Press 1)</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    If you are experiencing a medical emergency, are in danger, or are feeling suicidal, 
                    please call 911 or go to your nearest emergency room.
                  </p>
                </CardContent>
                <CardFooter className="flex space-x-2">
                  <Button variant="outline" className="flex-1">Chat Support</Button>
                  <Button className="flex-1">Call Now</Button>
                </CardFooter>
              </Card>
            </section>
            
            <section className="bg-serenity-50 rounded-lg p-6 space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <BookOpen className="h-6 w-6 text-serenity-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Create Your Wellness Plan</h2>
                  <p className="text-muted-foreground">
                    Build a personalized plan with resources tailored to your needs
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="border rounded-md p-4 bg-white">
                  <h3 className="font-medium mb-2">Assessment</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete a brief wellness assessment to identify your needs
                  </p>
                  <Button variant="outline" className="w-full">Start Assessment</Button>
                </div>
                
                <div className="border rounded-md p-4 bg-white">
                  <h3 className="font-medium mb-2">Personalized Resources</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get recommendations based on your assessment results
                  </p>
                  <Button variant="outline" className="w-full">View Recommendations</Button>
                </div>
                
                <div className="border rounded-md p-4 bg-white">
                  <h3 className="font-medium mb-2">Progress Tracking</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Monitor your wellness journey with regular check-ins
                  </p>
                  <Button variant="outline" className="w-full">Track Progress</Button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ResourcesPage;
