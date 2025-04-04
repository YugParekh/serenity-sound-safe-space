
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Volume2, Volume, Heart, SkipBack, SkipForward, Clock } from "lucide-react";

export interface SoundData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  audioUrl: string;
  duration: number; // in seconds
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
  const [isFavorite, setIsFavorite] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // In a real app, this would use an actual audio element
  // For this demo, we'll simulate playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 1;
          if (newTime >= sound.duration) {
            setIsPlaying(false);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, sound.duration]);
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    
    // In a real implementation, this would control the audio element
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };
  
  const handleTimeChange = (newValue: number[]) => {
    const newTime = newValue[0];
    setCurrentTime(newTime);
    
    // In a real implementation, this would seek the audio element
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };
  
  const handleVolumeChange = (newValue: number[]) => {
    const newVolume = newValue[0];
    setVolume(newVolume);
    
    // In a real implementation, this would set the audio volume
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md ${compact ? 'max-w-xs' : ''}`}>
      <div 
        className="h-40 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${sound.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group">
          <Button 
            className="h-14 w-14 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 opacity-90 group-hover:opacity-100 transition-all"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-1" />
            )}
          </Button>
        </div>
        <Badge className="absolute top-3 right-3 bg-black/50 text-white backdrop-blur-sm">
          {sound.category}
        </Badge>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{sound.title}</h3>
            {!compact && (
              <p className="text-sm text-muted-foreground">{sound.description}</p>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-8 w-8 ${isFavorite ? 'text-red-500' : ''}`}
            onClick={toggleFavorite}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9 rounded-full"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SkipForward className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2 ml-auto relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              >
                {volume > 0 ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <Volume className="h-4 w-4" />
                )}
              </Button>
              {showVolumeSlider && (
                <div className="absolute bottom-full right-0 p-3 bg-white shadow-lg rounded-md border z-10 min-w-[120px]">
                  <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                    className="w-full"
                  />
                </div>
              )}
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{formatTime(sound.duration)}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(sound.duration)}</span>
            </div>
            <Slider
              value={[currentTime]}
              max={sound.duration}
              step={1}
              onValueChange={handleTimeChange}
            />
          </div>
        </div>
        
        {/* Hidden audio element - would be used in a real implementation */}
        <audio 
          ref={audioRef} 
          src={sound.audioUrl} 
          preload="metadata"
          style={{ display: 'none' }}
        />
      </CardContent>
    </Card>
  );
}
