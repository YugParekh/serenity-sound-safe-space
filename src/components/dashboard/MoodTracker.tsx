
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Smile, SmilePlus, Heart, Check, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MoodData {
  date: string;
  mood: number;
  energy: number;
  anxiety: number;
}

// Sample mood data
const moodHistory: MoodData[] = [
  { date: "Mon", mood: 3, energy: 2, anxiety: 4 },
  { date: "Tue", mood: 4, energy: 4, anxiety: 3 },
  { date: "Wed", mood: 2, energy: 3, anxiety: 5 },
  { date: "Thu", mood: 3, energy: 4, anxiety: 3 },
  { date: "Fri", mood: 5, energy: 5, anxiety: 2 },
  { date: "Sat", mood: 4, energy: 3, anxiety: 2 },
  { date: "Sun", mood: 4, energy: 4, anxiety: 1 },
];

export function MoodTracker() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentMood, setCurrentMood] = useState<number | null>(null);
  const moods = [1, 2, 3, 4, 5];
  
  const getMoodIcon = (mood: number) => {
    if (mood <= 2) return "😔";
    if (mood === 3) return "😐";
    if (mood === 4) return "🙂";
    return "😊";
  };
  
  const getMoodColor = (mood: number) => {
    if (mood <= 2) return "text-blue-500";
    if (mood === 3) return "text-yellow-500";
    if (mood >= 4) return "text-green-500";
    return "";
  };
  
  const handleSaveMood = () => {
    if (currentMood !== null) {
      // In a real app, you'd save this to your state or backend
      console.log("Saved mood:", currentMood, "for date:", date);
      setCurrentMood(null);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center">
              <Heart className="h-5 w-5 mr-2 text-serenity-500" />
              Mood Tracker
            </CardTitle>
            <CardDescription>
              Track your mood to identify patterns
            </CardDescription>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[240px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">How are you feeling today?</p>
          <div className="flex justify-between items-center p-4 border rounded-md bg-serenity-50">
            <div className="flex space-x-4">
              {moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setCurrentMood(mood)}
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center text-xl transition-all",
                    currentMood === mood 
                      ? "bg-serenity-500 text-white scale-110" 
                      : "bg-white border hover:bg-serenity-100"
                  )}
                >
                  {getMoodIcon(mood)}
                </button>
              ))}
            </div>
            <Button
              size="sm"
              onClick={handleSaveMood}
              disabled={currentMood === null}
            >
              <Check className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
        
        <div className="h-64">
          <p className="text-sm font-medium mb-2 flex items-center">
            <SmilePlus className="h-4 w-4 mr-1 text-serenity-600" />
            Your Mood History
            <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
              <HelpCircle className="h-3 w-3" />
            </Button>
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={moodHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
              <Tooltip
                formatter={(value, name) => {
                  return [value, name === "mood" ? "Mood" : name === "energy" ? "Energy" : "Anxiety"];
                }}
                labelFormatter={(label) => `Day: ${label}`}
              />
              <Bar
                dataKey="mood"
                name="Mood"
                fill="#4ECDC4"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="energy"
                name="Energy"
                fill="#6E60A0"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="anxiety"
                name="Anxiety"
                fill="#FF6B6B"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <span>Average mood this week: 3.6/5</span>
        <Button variant="link" size="sm" className="text-serenity-600 p-0">
          View detailed insights
        </Button>
      </CardFooter>
    </Card>
  );
}
