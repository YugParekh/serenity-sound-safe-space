
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Volume, VolumeX, Play, Pause, SkipBack, SkipForward, Heart } from "lucide-react";

export interface SoundData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  category: string;
}

interface SoundPlayerProps {
  sound: SoundData;
  compact?: boolean;
}

export function SoundPlayer({ sound, compact = false }: SoundPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio(sound.audioUrl);
    
    const updateProgress = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };
    
    const audioElement = audioRef.current;
    
    audioElement.addEventListener('timeupdate', updateProgress);
    audioElement.addEventListener('ended', () => setIsPlaying(false));
    
    return () => {
      audioElement.pause();
      audioElement.removeEventListener('timeupdate', updateProgress);
      audioElement.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [sound.audioUrl]);
  
  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);
  
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const handleTimeChange = (value: number[]) => {
    if (!audioRef.current) return;
    
    const newTime = value[0];
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0 && isMuted) setIsMuted(false);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleNext = () => {
    // In a real app, you'd go to the next track
    console.log("Next track");
  };
  
  const handlePrevious = () => {
    // In a real app, you'd go to the previous track
    console.log("Previous track");
  };

  return (
    <Card className={cn(
      "w-full overflow-hidden transition-all duration-300 hover:shadow-md",
      compact ? "max-w-xs" : ""
    )}>
      <div 
        className="h-40 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url(${sound.imageUrl || 'https://images.unsplash.com/photo-1491466424936-e304919aada7'})` 
        }}
      />
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{sound.title}</CardTitle>
        <CardDescription>{sound.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="space-y-1">
            <Slider
              defaultValue={[0]}
              max={sound.duration}
              step={1}
              value={[currentTime]}
              onValueChange={handleTimeChange}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(sound.duration)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={handlePrevious}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button
                variant="default"
                size="icon"
                className="h-10 w-10 rounded-full bg-serenity-500 hover:bg-serenity-600"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 pl-1" />
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={handleNext}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={toggleMute}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume className="h-4 w-4" />
                )}
              </Button>
              
              {!compact && (
                <Slider
                  defaultValue={[volume]}
                  max={100}
                  step={1}
                  value={[volume]}
                  onValueChange={handleVolumeChange}
                  className="w-24 cursor-pointer"
                />
              )}
              
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8",
                  isLiked && "text-red-500"
                )}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      
      {!compact && (
        <CardFooter className="text-xs text-muted-foreground">
          <span>Soothing {sound.category} • Helps with stress reduction</span>
        </CardFooter>
      )}
    </Card>
  );
}
