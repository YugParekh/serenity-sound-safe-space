
export type UserRole = 'user' | 'therapist' | 'admin';
export type SessionStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
export type ResourceType = 'article' | 'video' | 'audio' | 'exercise' | 'worksheet';
export type MoodLevel = 'very_low' | 'low' | 'neutral' | 'good' | 'very_good';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Profile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: UserRole;
  avatar_url?: string;
  bio?: string;
  specialties?: string[];
  license_number?: string;
  years_experience?: number;
  hourly_rate?: number;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface TherapySession {
  id: string;
  user_id: string;
  therapist_id: string;
  scheduled_at: string;
  duration_minutes: number;
  status: SessionStatus;
  notes?: string;
  rating?: number;
  cost?: number;
  created_at: string;
  updated_at: string;
}

export interface MoodEntry {
  id: string;
  user_id: string;
  mood_level: MoodLevel;
  notes?: string;
  energy_level?: number;
  anxiety_level?: number;
  sleep_hours?: number;
  created_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description?: string;
  content?: string;
  type: ResourceType;
  categories?: string[];
  author_id?: string;
  thumbnail_url?: string;
  read_time_minutes?: number;
  is_free: boolean;
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export interface SoundTrack {
  id: string;
  title: string;
  description?: string;
  audio_url?: string;
  thumbnail_url?: string;
  duration_seconds?: number;
  category?: string;
  created_at: string;
}

export interface TherapeuticGame {
  id: string;
  title: string;
  description?: string;
  thumbnail_url?: string;
  category?: string;
  difficulty?: Difficulty;
  duration_minutes?: number;
  benefits?: string[];
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  metric_name: string;
  metric_value?: number;
  notes?: string;
  recorded_at: string;
}
