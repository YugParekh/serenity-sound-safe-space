
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Star, MessageSquare, Shield, Heart } from "lucide-react";

export interface TherapistData {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  experience: number;
  availability: string;
  price: number;
  bio: string;
  verified: boolean;
  imageUrl?: string;
}

interface TherapistCardProps {
  therapist: TherapistData;
  compact?: boolean;
}

export function TherapistCard({ therapist, compact = false }: TherapistCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md ${compact ? 'max-w-xs' : ''}`}>
      <CardContent className="p-4">
        <div className="flex space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={therapist.imageUrl} />
            <AvatarFallback className="bg-serenity-100 text-serenity-800">
              {therapist.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">{therapist.name}</h3>
                  {therapist.verified && (
                    <Badge className="ml-2 bg-green-100 text-green-800 flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      <span>Verified</span>
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{therapist.title}</p>
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
            
            <div className="flex flex-wrap gap-1.5 mt-2">
              {therapist.specialties.slice(0, compact ? 2 : undefined).map((specialty, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="bg-serenity-50 text-serenity-700"
                >
                  {specialty}
                </Badge>
              ))}
              {compact && therapist.specialties.length > 2 && (
                <Badge variant="outline">+{therapist.specialties.length - 2}</Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-4 w-4 ${star <= Math.round(therapist.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm ml-1">
                  {therapist.rating} ({therapist.reviewCount})
                </span>
              </div>
              
              <div className="text-sm">
                <span className="text-muted-foreground">{therapist.experience} years exp.</span>
              </div>
            </div>
          </div>
        </div>
        
        {!compact && (
          <>
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {therapist.availability}
              </Badge>
              <p className="font-medium">${therapist.price}/session</p>
            </div>
            
            {showDetails && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2">About</h4>
                <p className="text-sm text-muted-foreground">{therapist.bio}</p>
              </div>
            )}
          </>
        )}
      </CardContent>
      
      {!compact ? (
        <CardFooter className="px-4 py-3 bg-gray-50 flex space-x-2">
          <Button variant="outline" className="flex-1" onClick={toggleDetails}>
            {showDetails ? "Show Less" : "Show More"}
          </Button>
          <Button className="flex-1">
            <Calendar className="h-4 w-4 mr-2" />
            Book Session
          </Button>
        </CardFooter>
      ) : (
        <CardFooter className="px-4 py-3 bg-gray-50 flex justify-between items-center">
          <div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {therapist.availability}
            </Badge>
            <p className="text-sm font-medium mt-1">${therapist.price}/session</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button size="sm">
              <Calendar className="h-4 w-4 mr-1" />
              Book
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
