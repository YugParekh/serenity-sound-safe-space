
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, Clock, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface ResourceData {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  type: "article" | "video" | "guide" | "course";
  categories: string[];
  readTime?: number;
  author?: string;
  rating?: number;
  reviewCount?: number;
  isFree: boolean;
}

interface ResourceCardProps {
  resource: ResourceData;
  compact?: boolean;
}

export function ResourceCard({ resource, compact = false }: ResourceCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  
  const getTypeIcon = () => {
    switch (resource.type) {
      case "article":
        return <BookOpen className="h-4 w-4" />;
      case "video":
        return <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
      case "guide":
        return <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>;
      case "course":
        return <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };
  
  const getTypeColor = () => {
    switch (resource.type) {
      case "article":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "video":
        return "bg-red-50 text-red-700 border-red-200";
      case "guide":
        return "bg-green-50 text-green-700 border-green-200";
      case "course":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <Card className={cn(
      "w-full transition-all duration-300 hover:shadow-md",
      compact ? "max-w-xs" : ""
    )}>
      {!compact && resource.thumbnail && (
        <div
          className="h-40 bg-cover bg-center"
          style={{
            backgroundImage: `url(${resource.thumbnail})`
          }}
        />
      )}
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className={cn("flex items-center", compact ? "text-base" : "text-lg")}>
              {resource.title}
            </CardTitle>
            {!compact && <CardDescription>{resource.description}</CardDescription>}
          </div>
          
          <Badge 
            variant="outline" 
            className={cn(
              "flex items-center space-x-1",
              getTypeColor()
            )}
          >
            <span>{getTypeIcon()}</span>
            <span className="capitalize">{resource.type}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1 mb-3">
          {resource.categories.slice(0, compact ? 1 : 3).map((category, index) => (
            <Badge key={index} variant="secondary" className="bg-serenity-100 text-serenity-700">
              {category}
            </Badge>
          ))}
          {resource.categories.length > (compact ? 1 : 3) && (
            <Badge variant="outline">+{resource.categories.length - (compact ? 1 : 3)}</Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-3 text-sm text-muted-foreground mb-3">
          {resource.readTime && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{resource.readTime} min read</span>
            </div>
          )}
          
          {resource.author && !compact && (
            <>
              <span className="text-xs">•</span>
              <span>By {resource.author}</span>
            </>
          )}
          
          {resource.isFree ? (
            <Badge className="ml-auto bg-green-100 text-green-800 hover:bg-green-200">Free</Badge>
          ) : (
            <Badge className="ml-auto">Premium</Badge>
          )}
        </div>
        
        {resource.rating && !compact && (
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(resource.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : i < resource.rating
                      ? "text-yellow-400 fill-yellow-400 opacity-50"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{resource.rating}</span>
            {resource.reviewCount && (
              <span className="text-sm text-muted-foreground">({resource.reviewCount} reviews)</span>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button className={compact ? "text-sm px-3" : ""}>
          {resource.type === "article" || resource.type === "guide" ? "Read Now" : 
           resource.type === "video" ? "Watch Now" : "Start Course"}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className={cn(isLiked && "text-red-500")}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
        </Button>
      </CardFooter>
    </Card>
  );
}
