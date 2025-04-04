
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MessageSquare, Star, Shield, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  profileImage?: string;
}

interface TherapistCardProps {
  therapist: TherapistData;
  compact?: boolean;
}

export function TherapistCard({ therapist, compact = false }: TherapistCardProps) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleBookSession = () => {
    navigate(`/sessions/book/${therapist.id}`);
  };

  const handleViewProfile = () => {
    navigate(`/therapist/${therapist.id}`);
  };

  const handleContact = () => {
    navigate(`/messages/new/${therapist.id}`);
  };

  return (
    <Card className={`w-full transition-all duration-300 hover:shadow-md ${compact ? 'max-w-xs' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={therapist.profileImage} alt={therapist.name} />
              <AvatarFallback className="bg-serenity-100 text-serenity-800">
                {therapist.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{therapist.name}</CardTitle>
              <CardDescription>{therapist.title}</CardDescription>
            </div>
          </div>
          {therapist.verified && (
            <Badge variant="outline" className="bg-serenity-50 text-serenity-700 flex items-center">
              <Check className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1 mb-3">
          {therapist.specialties.slice(0, compact ? 2 : 3).map((specialty, index) => (
            <Badge key={index} variant="secondary" className="bg-serenity-100 text-serenity-700 hover:bg-serenity-200">
              {specialty}
            </Badge>
          ))}
          {therapist.specialties.length > (compact ? 2 : 3) && (
            <Badge variant="outline">+{therapist.specialties.length - (compact ? 2 : 3)}</Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(therapist.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : i < therapist.rating
                    ? "text-yellow-400 fill-yellow-400 opacity-50"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium">{therapist.rating}</span>
          <span className="text-sm text-muted-foreground">({therapist.reviewCount} reviews)</span>
        </div>
        
        {!compact && (
          <div className={`transition-all duration-300 overflow-hidden ${expanded ? 'max-h-40' : 'max-h-12'}`}>
            <p className="text-sm text-muted-foreground">{therapist.bio}</p>
          </div>
        )}
        
        {!compact && therapist.bio.length > 120 && (
          <button 
            onClick={() => setExpanded(!expanded)} 
            className="text-xs text-serenity-600 hover:underline mt-1"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
        
        <div className="flex flex-wrap gap-y-2 mt-3">
          <div className="flex items-center text-sm text-muted-foreground mr-4">
            <Shield className="h-4 w-4 mr-1 text-serenity-600" />
            <span>{therapist.experience} years exp.</span>
          </div>
          
          {!compact && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1 text-serenity-600" />
              <span>{therapist.availability}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className={`flex ${compact ? 'flex-col space-y-2' : 'space-x-2'}`}>
        <Button 
          variant="default" 
          className={`${compact ? 'w-full' : 'flex-1'}`}
          onClick={handleBookSession}
        >
          Book Session
        </Button>
        
        {!compact ? (
          <>
            <Button variant="outline" className="flex-1" onClick={handleViewProfile}>
              View Profile
            </Button>
            <Button variant="ghost" size="icon" onClick={handleContact}>
              <MessageSquare className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button variant="outline" className="w-full" onClick={handleViewProfile}>
            View Profile
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
