
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookmarkPlus, BookmarkCheck, ExternalLink, Clock, Star } from "lucide-react";

export interface ResourceData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  type: string;
  categories: string[];
  readTime: number; // in minutes
  author: string;
  rating: number;
  reviewCount: number;
  isFree: boolean;
}

interface ResourceCardProps {
  resource: ResourceData;
  compact?: boolean;
}

export function ResourceCard({ resource, compact = false }: ResourceCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  
  const toggleSaved = () => {
    setIsSaved(!isSaved);
  };
  
  const getResourceTypeIcon = () => {
    switch (resource.type.toLowerCase()) {
      case "article":
        return <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
      case "video":
        return <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>;
      case "guide":
        return <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
      case "course":
        return <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>;
      case "workbook":
        return <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6.25278V19.2528M12 6.25278L6.25 10.0028M12 6.25278L17.75 10.0028M17.75 10.0028V15.7528M17.75 10.0028L12 13.7528L6.25 10.0028M6.25 10.0028V15.7528"></path></svg>;
      default:
        return <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6.25278V19.2528M12 6.25278L6.25 10.0028M12 6.25278L17.75 10.0028M17.75 10.0028V15.7528M17.75 10.0028L12 13.7528L6.25 10.0028M6.25 10.0028V15.7528"></path></svg>;
    }
  };
  
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md ${compact ? 'max-w-xs' : ''}`}>
      <div className="relative">
        <div 
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${resource.thumbnail})` }}
        />
        <div className="absolute top-0 left-0 right-0 px-3 py-2 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex justify-between items-start">
            <Badge className="bg-serenity-500 uppercase text-xs">
              {resource.type}
            </Badge>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-white"
              onClick={toggleSaved}
            >
              {isSaved ? (
                <BookmarkCheck className="h-5 w-5 fill-white" />
              ) : (
                <BookmarkPlus className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        {!resource.isFree && (
          <Badge className="absolute bottom-3 right-3 bg-serenity-700">
            Premium
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-medium line-clamp-2">{resource.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {resource.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            {getResourceTypeIcon()}
            <span className="ml-1 capitalize">{resource.type}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{resource.readTime} min</span>
          </div>
        </div>
        
        {!compact && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {resource.categories.map((category, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-serenity-50 text-serenity-700 hover:bg-serenity-100"
              >
                {category}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="px-4 py-3 bg-gray-50 flex justify-between items-center">
        <div>
          <p className="text-xs text-muted-foreground">By {resource.author}</p>
          <div className="flex items-center mt-0.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`h-3.5 w-3.5 ${star <= Math.round(resource.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">
              ({resource.reviewCount})
            </span>
          </div>
        </div>
        <Button size="sm" className="gap-1.5">
          <span>View</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
