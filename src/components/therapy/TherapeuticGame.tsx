
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Gamepad, Award, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GameData {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  duration: number; // in minutes
  benefits: string[];
}

interface TherapeuticGameProps {
  game: GameData;
  compact?: boolean;
}

export function TherapeuticGame({ game, compact = false }: TherapeuticGameProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const [colorGrid, setColorGrid] = useState<string[][]>(Array(3).fill(Array(3).fill("#FFFFFF")));
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameCompleted, setGameCompleted] = useState(false);
  
  const colours = [
    "#4ECDC4", "#6E60A0", "#7EC8E3", "#FFD166", 
    "#FF6B6B", "#A5D8FF", "#D4A5FF", "#FFAAA5"
  ];
  
  const handleStartGame = () => {
    setIsPlaying(true);
    setShowGame(true);
    setProgress(0);
    setScore(0);
    setTimeLeft(60);
    setCurrentLevel(1);
    setGameCompleted(false);
    generateNewColorGrid();
  };
  
  const handleEndGame = () => {
    setIsPlaying(false);
    setShowGame(false);
    setGameCompleted(true);
  };
  
  const generateNewColorGrid = () => {
    const newGrid = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        const randomIndex = Math.floor(Math.random() * colours.length);
        row.push(colours[randomIndex]);
      }
      newGrid.push(row);
    }
    setColorGrid(newGrid);
  };
  
  const handleColorClick = (rowIndex: number, colIndex: number) => {
    if (!isPlaying) return;
    
    // Simple matching game logic
    if (rowIndex === colIndex || (rowIndex + colIndex) === 2) {
      // Correct match
      setScore(score + 10);
      if (score + 10 >= currentLevel * 30) {
        // Level completed
        setCurrentLevel(currentLevel + 1);
        generateNewColorGrid();
      }
    } else {
      // Incorrect match
      if (score > 0) setScore(score - 5);
    }
    
    // Update progress
    const newProgress = Math.min(100, (score / 100) * 100);
    setProgress(newProgress);
    
    if (newProgress >= 100) {
      handleEndGame();
    }
  };
  
  // Timer for the game
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleEndGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isPlaying]);
  
  return (
    <Card className={`w-full transition-all duration-300 hover:shadow-md ${compact ? 'max-w-xs' : ''}`}>
      {!showGame && (
        <>
          <div 
            className="h-40 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url(${game.imageUrl || "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61"})` 
            }}
          />
          
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg flex items-center">
                  <Gamepad className="h-5 w-5 mr-2 text-serenity-500" />
                  {game.title}
                </CardTitle>
                <CardDescription>{game.description}</CardDescription>
              </div>
              
              <Badge 
                variant="outline" 
                className={cn(
                  "uppercase text-xs",
                  game.difficulty === "easy" && "bg-green-50 text-green-700 border-green-200",
                  game.difficulty === "medium" && "bg-yellow-50 text-yellow-700 border-yellow-200",
                  game.difficulty === "hard" && "bg-red-50 text-red-700 border-red-200"
                )}
              >
                {game.difficulty}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pb-2">
            {!compact && (
              <div className="flex flex-wrap gap-1 mb-3">
                {game.benefits.map((benefit, index) => (
                  <Badge key={index} variant="secondary" className="bg-serenity-100 text-serenity-700">
                    {benefit}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
              <Clock className="h-4 w-4" />
              <span>{game.duration} min</span>
              <span className="text-xs">•</span>
              <span>{game.category}</span>
            </div>
            
            {gameCompleted && (
              <div className="bg-serenity-50 border border-serenity-200 rounded-md p-4 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-serenity-600 mr-2" />
                    <div>
                      <p className="font-medium">Great job!</p>
                      <p className="text-sm text-muted-foreground">You scored {score} points</p>
                    </div>
                  </div>
                  <Badge className="bg-serenity-500">Level {currentLevel - 1}</Badge>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handleStartGame}
            >
              {gameCompleted ? "Play Again" : "Start Game"}
            </Button>
          </CardFooter>
        </>
      )}
      
      {showGame && (
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{game.title}</h3>
              <p className="text-sm text-muted-foreground">Level {currentLevel}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-sm font-medium">{score}</p>
                <p className="text-xs text-muted-foreground">Points</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">{timeLeft}</p>
                <p className="text-xs text-muted-foreground">Seconds</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <p className="text-sm text-center">
              Click on matching colors to earn points. 
              Diagonal and center matches give bonus points!
            </p>
            
            <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
              {colorGrid.map((row, rowIndex) => (
                row.map((color, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    className="w-full h-20 rounded-md transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(rowIndex, colIndex)}
                  />
                ))
              ))}
            </div>
            
            <div className="flex justify-between w-full">
              <Button 
                variant="outline" 
                onClick={handleEndGame}
              >
                End Game
              </Button>
              <Button onClick={generateNewColorGrid}>
                New Pattern
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
