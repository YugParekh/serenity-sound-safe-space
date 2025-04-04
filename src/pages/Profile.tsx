
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Calendar, 
  Settings, 
  Shield, 
  Bell, 
  Lock, 
  FileText, 
  CreditCard,
  Save,
  Headphones,
  Gamepad,
  BookOpen
} from "lucide-react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    birthday: "1990-04-15",
    address: "123 Main Street, Anytown, CA 12345",
    emergencyContact: "John Johnson (Husband) - (555) 987-6543",
    bio: "I'm working on managing anxiety and improving my work-life balance. I enjoy hiking, painting, and spending time with my family.",
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailReminders: true,
    sessionAlerts: true,
    resourceUpdates: false,
    marketingEmails: false,
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    shareProgress: false,
    anonymousData: true,
    publicProfile: false,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const toggleNotification = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };
  
  const togglePrivacy = (setting: keyof typeof privacySettings) => {
    setPrivacySettings({
      ...privacySettings,
      [setting]: !privacySettings[setting],
    });
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-gray-50">
        <AppSidebar userType="user" />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-serenity-300 text-serenity-800 text-2xl">
                    SJ
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">Sarah Johnson</h1>
                  <p className="text-muted-foreground">Member since October 2023</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Update Photo
                </Button>
                <Button size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </header>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-1 md:grid-cols-4">
                <TabsTrigger value="profile" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger value="wellness" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Wellness Metrics</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>Privacy & Security</span>
                </TabsTrigger>
                <TabsTrigger value="payments" className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span>Billing</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your profile details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="birthday">Date of Birth</Label>
                        <Input 
                          id="birthday" 
                          name="birthday" 
                          type="date" 
                          value={formData.birthday} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          name="address" 
                          value={formData.address} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">Emergency Contact</Label>
                        <Input 
                          id="emergencyContact" 
                          name="emergencyContact" 
                          value={formData.emergencyContact} 
                          onChange={handleInputChange} 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">About Me</Label>
                      <Textarea 
                        id="bio" 
                        name="bio" 
                        rows={4} 
                        value={formData.bio} 
                        onChange={handleInputChange} 
                        placeholder="Share a bit about yourself, your goals, and what you hope to achieve on your wellness journey."
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Therapy Preferences</CardTitle>
                    <CardDescription>
                      Set your preferences for therapy sessions and content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-base font-medium">Areas of Focus</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-serenity-500">Anxiety</Badge>
                        <Badge className="bg-serenity-100 text-serenity-700 hover:bg-serenity-200">Depression</Badge>
                        <Badge className="bg-serenity-100 text-serenity-700 hover:bg-serenity-200">Work Stress</Badge>
                        <Badge className="bg-serenity-500">Sleep</Badge>
                        <Badge className="bg-serenity-100 text-serenity-700 hover:bg-serenity-200">Relationships</Badge>
                        <Badge className="bg-serenity-100 text-serenity-700 hover:bg-serenity-200">Self-Esteem</Badge>
                        <Badge className="bg-serenity-100 text-serenity-700 hover:bg-serenity-200">Trauma</Badge>
                        <Button variant="outline" size="sm" className="h-6">+ Add</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-base font-medium">Preferred Therapeutic Approaches</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-serenity-500">CBT</Badge>
                        <Badge className="bg-serenity-100 text-serenity-700 hover:bg-serenity-200">Psychodynamic</Badge>
                        <Badge className="bg-serenity-500">Mindfulness</Badge>
                        <Badge className="bg-serenity-100 text-serenity-700 hover:bg-serenity-200">ACT</Badge>
                        <Badge className="bg-serenity-100 text-serenity-700 hover:bg-serenity-200">DBT</Badge>
                        <Button variant="outline" size="sm" className="h-6">+ Add</Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h3 className="text-base font-medium">Session Preferences</h3>
                        <div className="border rounded-md p-4">
                          <div className="flex items-center justify-between mb-3">
                            <Label htmlFor="videoPreference">Video Sessions</Label>
                            <Switch id="videoPreference" checked={true} />
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <Label htmlFor="textPreference">Text-Based Support</Label>
                            <Switch id="textPreference" checked={true} />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="inPersonPreference">In-Person (when available)</Label>
                            <Switch id="inPersonPreference" checked={false} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-base font-medium">Therapist Preferences</h3>
                        <div className="border rounded-md p-4">
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="genderPreference">Preferred Gender</Label>
                              <select 
                                id="genderPreference" 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                              >
                                <option value="no-preference">No Preference</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="non-binary">Non-Binary</option>
                              </select>
                            </div>
                            <div>
                              <Label htmlFor="agePreference">Age Range</Label>
                              <select 
                                id="agePreference" 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                              >
                                <option value="no-preference">No Preference</option>
                                <option value="30-40">30-40</option>
                                <option value="40-50">40-50</option>
                                <option value="50+">50+</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="wellness" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <svg className="h-5 w-5 mr-2 text-serenity-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 2a10 10 0 0 1 10 10h-10V2z"></path><path d="M12 2v10h10"></path></svg>
                        Overall Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-3xl font-bold">74/100</span>
                        <Badge className="bg-green-100 text-green-800">+12%</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Wellness Score</span>
                          <span>74%</span>
                        </div>
                        <Progress value={74} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Your score has improved by 12% in the last 30 days
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-serenity-500" />
                        Activity Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-2xl font-bold">12</p>
                          <p className="text-xs text-muted-foreground">Sessions</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">24</p>
                          <p className="text-xs text-muted-foreground">Resources</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">16</p>
                          <p className="text-xs text-muted-foreground">Games</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Weekly Goal</span>
                          <span>80%</span>
                        </div>
                        <Progress value={80} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          You've completed 4 of 5 weekly activities
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <svg className="h-5 w-5 mr-2 text-serenity-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                        Mood Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium">Last 30 Days</span>
                        <Badge>Improving</Badge>
                      </div>
                      <div className="h-24 bg-gray-100 rounded-md flex items-end justify-between p-2">
                        {/* Simple chart representation */}
                        <div className="w-2 bg-serenity-300 rounded-t-sm" style={{ height: '40%' }}></div>
                        <div className="w-2 bg-serenity-300 rounded-t-sm" style={{ height: '35%' }}></div>
                        <div className="w-2 bg-serenity-300 rounded-t-sm" style={{ height: '50%' }}></div>
                        <div className="w-2 bg-serenity-400 rounded-t-sm" style={{ height: '45%' }}></div>
                        <div className="w-2 bg-serenity-400 rounded-t-sm" style={{ height: '60%' }}></div>
                        <div className="w-2 bg-serenity-500 rounded-t-sm" style={{ height: '55%' }}></div>
                        <div className="w-2 bg-serenity-500 rounded-t-sm" style={{ height: '65%' }}></div>
                        <div className="w-2 bg-serenity-600 rounded-t-sm" style={{ height: '75%' }}></div>
                        <div className="w-2 bg-serenity-600 rounded-t-sm" style={{ height: '70%' }}></div>
                        <div className="w-2 bg-serenity-700 rounded-t-sm" style={{ height: '80%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Your mood has been trending upward over the past month
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-serenity-500" />
                        Therapy Progress
                      </CardTitle>
                      <CardDescription>
                        Your journey with Dr. Sarah Johnson
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
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
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Work-Life Balance</span>
                            <span>45%</span>
                          </div>
                          <Progress value={45} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4 bg-serenity-50">
                        <h3 className="font-medium mb-2">Therapist Notes</h3>
                        <p className="text-sm text-muted-foreground">
                          Sarah is making good progress with anxiety management techniques. 
                          Sleep has improved significantly. Continue focusing on stress reduction 
                          and work-life balance strategies in upcoming sessions.
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>View Full Report</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <svg className="h-5 w-5 mr-2 text-serenity-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                        Activity Breakdown
                      </CardTitle>
                      <CardDescription>
                        Your engagement with different platform features
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-full bg-serenity-100 flex items-center justify-center">
                            <Headphones className="h-5 w-5 text-serenity-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Sound Therapy</span>
                              <span>120 minutes</span>
                            </div>
                            <Progress value={60} className="h-2" />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-full bg-serenity-100 flex items-center justify-center">
                            <Gamepad className="h-5 w-5 text-serenity-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Therapeutic Games</span>
                              <span>85 minutes</span>
                            </div>
                            <Progress value={40} className="h-2" />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-full bg-serenity-100 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-serenity-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Resource Library</span>
                              <span>14 resources</span>
                            </div>
                            <Progress value={70} className="h-2" />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-full bg-serenity-100 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-serenity-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Therapy Sessions</span>
                              <span>12 sessions</span>
                            </div>
                            <Progress value={90} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline">Download Data</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-serenity-500" />
                      Notification Settings
                    </CardTitle>
                    <CardDescription>
                      Manage how we communicate with you
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-md divide-y">
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <h3 className="font-medium">Session Reminders</h3>
                          <p className="text-sm text-muted-foreground">
                            Receive email reminders about upcoming therapy sessions
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.emailReminders} 
                          onCheckedChange={() => toggleNotification('emailReminders')} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <h3 className="font-medium">Session Alerts</h3>
                          <p className="text-sm text-muted-foreground">
                            Get notified when your therapist is online or available
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.sessionAlerts} 
                          onCheckedChange={() => toggleNotification('sessionAlerts')} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <h3 className="font-medium">Resource Updates</h3>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about new resources in your areas of interest
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.resourceUpdates} 
                          onCheckedChange={() => toggleNotification('resourceUpdates')} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <h3 className="font-medium">Marketing Communications</h3>
                          <p className="text-sm text-muted-foreground">
                            Receive newsletters and promotional emails
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.marketingEmails} 
                          onCheckedChange={() => toggleNotification('marketingEmails')} 
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Notification Preferences</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="h-5 w-5 mr-2 text-serenity-500" />
                      Privacy Settings
                    </CardTitle>
                    <CardDescription>
                      Control how your information is used and shared
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-md divide-y">
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <h3 className="font-medium">Progress Sharing</h3>
                          <p className="text-sm text-muted-foreground">
                            Allow your therapist to share your progress with other healthcare providers
                          </p>
                        </div>
                        <Switch 
                          checked={privacySettings.shareProgress} 
                          onCheckedChange={() => togglePrivacy('shareProgress')} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <h3 className="font-medium">Anonymous Data Collection</h3>
                          <p className="text-sm text-muted-foreground">
                            Allow Serenity to use your anonymized data to improve our services
                          </p>
                        </div>
                        <Switch 
                          checked={privacySettings.anonymousData} 
                          onCheckedChange={() => togglePrivacy('anonymousData')} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <h3 className="font-medium">Public Profile</h3>
                          <p className="text-sm text-muted-foreground">
                            Make your profile visible to other Serenity users
                          </p>
                        </div>
                        <Switch 
                          checked={privacySettings.publicProfile} 
                          onCheckedChange={() => togglePrivacy('publicProfile')} 
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="font-medium mb-2">Account Security</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-between">
                          <span>Change Password</span>
                          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"></path></svg>
                        </Button>
                        
                        <Button variant="outline" className="w-full justify-between">
                          <span>Two-Factor Authentication</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Enabled</Badge>
                        </Button>
                        
                        <Button variant="outline" className="w-full justify-between text-destructive hover:text-destructive">
                          <span>Delete Account</span>
                          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Privacy Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="payments" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-serenity-500" />
                      Subscription Plan
                    </CardTitle>
                    <CardDescription>
                      Manage your subscription and billing details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-md p-4 bg-serenity-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Serenity Premium</h3>
                          <p className="text-sm text-muted-foreground">Monthly Plan</p>
                          <div className="flex items-center mt-1">
                            <Badge className="bg-serenity-600">Active</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">$29.99</p>
                          <p className="text-sm text-muted-foreground">per month</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="text-sm font-medium mb-2">Plan Features:</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span>Unlimited therapy sessions</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span>Full access to all therapeutic games</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span>All premium resources and content</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span>Priority therapist matching</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                      <Button variant="outline">Change Plan</Button>
                      <Button variant="outline" className="text-destructive hover:text-destructive">Cancel Subscription</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Manage your payment options
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-12 bg-gray-200 rounded flex items-center justify-center">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 04/2025</p>
                          </div>
                        </div>
                        <Badge>Default</Badge>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      Add Payment Method
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>
                      View your past invoices and payment history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md divide-y">
                      <div className="flex justify-between items-center p-4">
                        <div>
                          <p className="font-medium">April 01, 2024</p>
                          <p className="text-sm text-muted-foreground">Serenity Premium - Monthly</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$29.99</p>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Paid</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-4">
                        <div>
                          <p className="font-medium">March 01, 2024</p>
                          <p className="text-sm text-muted-foreground">Serenity Premium - Monthly</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$29.99</p>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Paid</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-4">
                        <div>
                          <p className="font-medium">February 01, 2024</p>
                          <p className="text-sm text-muted-foreground">Serenity Premium - Monthly</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$29.99</p>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Paid</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Invoices
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ProfilePage;
