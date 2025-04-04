
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Plus,
  Filter,
  FileText
} from "lucide-react";
import { format } from "date-fns";

interface SessionData {
  id: string;
  therapistName: string;
  therapistAvatar?: string;
  therapistInitials: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: "video" | "chat" | "in-person";
  status: "upcoming" | "completed" | "cancelled";
  notes?: string;
}

const sessionsData: SessionData[] = [
  {
    id: "s1",
    therapistName: "Dr. Sarah Johnson",
    therapistInitials: "SJ",
    date: new Date(2025, 3, 5, 15, 0), // April 5, 2025, 3:00 PM
    startTime: "3:00 PM",
    endTime: "4:00 PM",
    type: "video",
    status: "upcoming",
  },
  {
    id: "s2",
    therapistName: "Dr. Sarah Johnson",
    therapistInitials: "SJ",
    date: new Date(2025, 3, 12, 15, 0), // April 12, 2025, 3:00 PM
    startTime: "3:00 PM",
    endTime: "4:00 PM",
    type: "video",
    status: "upcoming",
  },
  {
    id: "s3",
    therapistName: "Dr. Michael Chen",
    therapistInitials: "MC",
    date: new Date(2025, 3, 8, 10, 0), // April 8, 2025, 10:00 AM
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    type: "chat",
    status: "upcoming",
  },
  {
    id: "s4",
    therapistName: "Dr. Sarah Johnson",
    therapistInitials: "SJ",
    date: new Date(2025, 3, 1, 15, 0), // April 1, 2025, 3:00 PM
    startTime: "3:00 PM",
    endTime: "4:00 PM",
    type: "video",
    status: "completed",
    notes: "Discussed anxiety management techniques and identified triggers. Assigned breathing exercises for daily practice. Patient reported improved sleep quality since last session."
  },
  {
    id: "s5",
    therapistName: "Dr. Sarah Johnson",
    therapistInitials: "SJ",
    date: new Date(2025, 2, 25, 15, 0), // March 25, 2025, 3:00 PM
    startTime: "3:00 PM",
    endTime: "4:00 PM",
    type: "video",
    status: "completed",
    notes: "Reviewed progress with sleep hygiene practices. Patient reported fewer anxiety symptoms. Discussed work-related stressors and developed coping strategies."
  },
  {
    id: "s6",
    therapistName: "Dr. Michael Chen",
    therapistInitials: "MC",
    date: new Date(2025, 2, 28, 10, 0), // March 28, 2025, 10:00 AM
    startTime: "10:00 AM",
    endTime: "10:30 AM",
    type: "chat",
    status: "completed",
    notes: "Quick check-in about medication side effects. Patient reports improvement with reduced drowsiness. Will continue current dosage."
  },
  {
    id: "s7",
    therapistName: "Dr. Emily Martinez",
    therapistInitials: "EM",
    date: new Date(2025, 2, 20, 14, 0), // March 20, 2025, 2:00 PM
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    type: "in-person",
    status: "cancelled",
  },
];

const SessionsPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(null);
  
  const upcomingSessions = sessionsData.filter(session => session.status === "upcoming");
  const completedSessions = sessionsData.filter(session => session.status === "completed");
  const cancelledSessions = sessionsData.filter(session => session.status === "cancelled");
  
  const getSessionsForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    return sessionsData.filter(session => 
      session.date.getDate() === date.getDate() &&
      session.date.getMonth() === date.getMonth() &&
      session.date.getFullYear() === date.getFullYear()
    );
  };
  
  const sessionsForSelectedDate = getSessionsForDate(date);
  
  const getSessionTypeIcon = (type: "video" | "chat" | "in-person") => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "chat":
        return <MessageSquare className="h-4 w-4" />;
      case "in-person":
        return <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
    }
  };
  
  const getSessionStatusBadge = (status: "upcoming" | "completed" | "cancelled") => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
    }
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-gray-50">
        <AppSidebar userType="user" />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <header className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Therapy Sessions</h1>
                <p className="text-muted-foreground">
                  Schedule and manage your therapy appointments
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Session
                </Button>
              </div>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-serenity-500" />
                    Calendar
                  </CardTitle>
                  <CardDescription>
                    Select a date to view sessions
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
                <CardFooter className="flex justify-center">
                  <div className="text-sm text-muted-foreground">
                    {date && `Selected: ${format(date, 'PPP')}`}
                  </div>
                </CardFooter>
              </Card>
              
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>Sessions for {date ? format(date, 'MMMM d, yyyy') : 'Today'}</CardTitle>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon">
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {sessionsForSelectedDate.length > 0 ? (
                      <div className="space-y-4">
                        {sessionsForSelectedDate.map((session) => (
                          <div 
                            key={session.id}
                            className="flex items-start p-3 rounded-md border hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => setSelectedSession(session)}
                          >
                            <div className="flex-shrink-0 mr-3">
                              <Avatar>
                                <AvatarImage src={session.therapistAvatar} />
                                <AvatarFallback className="bg-serenity-100 text-serenity-800">
                                  {session.therapistInitials}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between">
                                <h3 className="font-medium truncate">{session.therapistName}</h3>
                                {getSessionStatusBadge(session.status)}
                              </div>
                              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                <span>{session.startTime} - {session.endTime}</span>
                              </div>
                              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                {getSessionTypeIcon(session.type)}
                                <span className="ml-1 capitalize">{session.type} Session</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="flex-shrink-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                        <h3 className="mt-4 text-lg font-medium">No sessions scheduled</h3>
                        <p className="mt-1 text-muted-foreground">
                          No therapy sessions are scheduled for this date
                        </p>
                        <Button className="mt-4">
                          <Plus className="h-4 w-4 mr-2" />
                          Schedule Session
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {selectedSession && (
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Session Details</CardTitle>
                          <CardDescription>{format(selectedSession.date, 'MMMM d, yyyy')}</CardDescription>
                        </div>
                        {getSessionStatusBadge(selectedSession.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-14 w-14">
                          <AvatarImage src={selectedSession.therapistAvatar} />
                          <AvatarFallback className="bg-serenity-100 text-serenity-800 text-lg">
                            {selectedSession.therapistInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{selectedSession.therapistName}</h3>
                          <p className="text-sm text-muted-foreground">Licensed Clinical Psychologist</p>
                          <div className="flex items-center mt-1">
                            <div className="flex items-center">
                              {Array(5).fill(0).map((_, i) => (
                                <svg key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/></svg>
                              ))}
                            </div>
                            <span className="ml-1 text-xs text-muted-foreground">127 reviews</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="border rounded-md p-4">
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Date</h4>
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2 text-serenity-500" />
                            <span>{format(selectedSession.date, 'MMMM d, yyyy')}</span>
                          </div>
                        </div>
                        
                        <div className="border rounded-md p-4">
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Time</h4>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-serenity-500" />
                            <span>{selectedSession.startTime} - {selectedSession.endTime}</span>
                          </div>
                        </div>
                        
                        <div className="border rounded-md p-4">
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Session Type</h4>
                          <div className="flex items-center">
                            {getSessionTypeIcon(selectedSession.type)}
                            <span className="ml-2 capitalize">{selectedSession.type} Session</span>
                          </div>
                        </div>
                      </div>
                      
                      {selectedSession.notes && (
                        <div className="border rounded-md p-4">
                          <h4 className="text-sm font-medium mb-2 flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-serenity-500" />
                            Session Notes
                          </h4>
                          <p className="text-sm">{selectedSession.notes}</p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-3">
                      {selectedSession.status === "upcoming" && (
                        <>
                          <Button variant="outline" className="sm:flex-1">Reschedule</Button>
                          <Button variant="outline" className="sm:flex-1 text-destructive hover:text-destructive">
                            Cancel Session
                          </Button>
                          <Button className="sm:flex-1">Join Session</Button>
                        </>
                      )}
                      {selectedSession.status === "completed" && (
                        <>
                          <Button variant="outline" className="sm:flex-1">View Recording</Button>
                          <Button className="sm:flex-1">Book Follow-up</Button>
                        </>
                      )}
                    </CardFooter>
                  </Card>
                )}
              </div>
            </div>
            
            <div className="space-y-6">
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="grid grid-cols-3 w-full md:w-auto">
                  <TabsTrigger value="upcoming">
                    Upcoming ({upcomingSessions.length})
                  </TabsTrigger>
                  <TabsTrigger value="completed">
                    Completed ({completedSessions.length})
                  </TabsTrigger>
                  <TabsTrigger value="cancelled">
                    Cancelled ({cancelledSessions.length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Sessions</CardTitle>
                      <CardDescription>
                        Your scheduled therapy appointments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {upcomingSessions.length > 0 ? (
                        <div className="space-y-4">
                          {upcomingSessions.map((session) => (
                            <div 
                              key={session.id}
                              className="flex items-start p-3 rounded-md border hover:bg-gray-50 cursor-pointer transition-colors"
                              onClick={() => setSelectedSession(session)}
                            >
                              <div className="flex-shrink-0 mr-3">
                                <Avatar>
                                  <AvatarImage src={session.therapistAvatar} />
                                  <AvatarFallback className="bg-serenity-100 text-serenity-800">
                                    {session.therapistInitials}
                                  </AvatarFallback>
                                </Avatar>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between">
                                  <h3 className="font-medium truncate">{session.therapistName}</h3>
                                  {getSessionStatusBadge(session.status)}
                                </div>
                                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                  <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                                  <span>{format(session.date, 'MMMM d, yyyy')}</span>
                                </div>
                                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                  <Clock className="h-3.5 w-3.5 mr-1" />
                                  <span>{session.startTime} - {session.endTime}</span>
                                </div>
                                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                  {getSessionTypeIcon(session.type)}
                                  <span className="ml-1 capitalize">{session.type} Session</span>
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                          <h3 className="mt-4 text-lg font-medium">No upcoming sessions</h3>
                          <p className="mt-1 text-muted-foreground">
                            You don't have any upcoming therapy sessions scheduled
                          </p>
                          <Button className="mt-4">
                            <Plus className="h-4 w-4 mr-2" />
                            Schedule Session
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="completed" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Completed Sessions</CardTitle>
                      <CardDescription>
                        Your past therapy sessions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {completedSessions.length > 0 ? (
                        <div className="space-y-4">
                          {completedSessions.map((session) => (
                            <div 
                              key={session.id}
                              className="flex items-start p-3 rounded-md border hover:bg-gray-50 cursor-pointer transition-colors"
                              onClick={() => setSelectedSession(session)}
                            >
                              <div className="flex-shrink-0 mr-3">
                                <Avatar>
                                  <AvatarImage src={session.therapistAvatar} />
                                  <AvatarFallback className="bg-serenity-100 text-serenity-800">
                                    {session.therapistInitials}
                                  </AvatarFallback>
                                </Avatar>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between">
                                  <h3 className="font-medium truncate">{session.therapistName}</h3>
                                  {getSessionStatusBadge(session.status)}
                                </div>
                                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                  <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                                  <span>{format(session.date, 'MMMM d, yyyy')}</span>
                                </div>
                                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                  <Clock className="h-3.5 w-3.5 mr-1" />
                                  <span>{session.startTime} - {session.endTime}</span>
                                </div>
                                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                  {getSessionTypeIcon(session.type)}
                                  <span className="ml-1 capitalize">{session.type} Session</span>
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                          <h3 className="mt-4 text-lg font-medium">No completed sessions</h3>
                          <p className="mt-1 text-muted-foreground">
                            You don't have any completed therapy sessions yet
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="cancelled" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cancelled Sessions</CardTitle>
                      <CardDescription>
                        Sessions that were cancelled
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {cancelledSessions.length > 0 ? (
                        <div className="space-y-4">
                          {cancelledSessions.map((session) => (
                            <div 
                              key={session.id}
                              className="flex items-start p-3 rounded-md border hover:bg-gray-50 cursor-pointer transition-colors"
                              onClick={() => setSelectedSession(session)}
                            >
                              <div className="flex-shrink-0 mr-3">
                                <Avatar>
                                  <AvatarImage src={session.therapistAvatar} />
                                  <AvatarFallback className="bg-serenity-100 text-serenity-800">
                                    {session.therapistInitials}
                                  </AvatarFallback>
                                </Avatar>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between">
                                  <h3 className="font-medium truncate">{session.therapistName}</h3>
                                  {getSessionStatusBadge(session.status)}
                                </div>
                                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                  <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                                  <span>{format(session.date, 'MMMM d, yyyy')}</span>
                                </div>
                                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                  <Clock className="h-3.5 w-3.5 mr-1" />
                                  <span>{session.startTime} - {session.endTime}</span>
                                </div>
                                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                  {getSessionTypeIcon(session.type)}
                                  <span className="ml-1 capitalize">{session.type} Session</span>
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                <Button variant="outline" size="sm">
                                  Reschedule
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <svg className="h-12 w-12 mx-auto text-muted-foreground opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                          <h3 className="mt-4 text-lg font-medium">No cancelled sessions</h3>
                          <p className="mt-1 text-muted-foreground">
                            You don't have any cancelled therapy sessions
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SessionsPage;
