
-- Enable RLS (Row Level Security)
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Create custom types
CREATE TYPE user_role AS ENUM ('user', 'therapist', 'admin');
CREATE TYPE session_status AS ENUM ('scheduled', 'in_progress', 'completed', 'cancelled');
CREATE TYPE resource_type AS ENUM ('article', 'video', 'audio', 'exercise', 'worksheet');
CREATE TYPE mood_level AS ENUM ('very_low', 'low', 'neutral', 'good', 'very_good');

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role user_role DEFAULT 'user',
  avatar_url TEXT,
  bio TEXT,
  specialties TEXT[], -- For therapists
  license_number TEXT, -- For therapists
  years_experience INTEGER, -- For therapists
  hourly_rate DECIMAL(10,2), -- For therapists
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Therapy sessions
CREATE TABLE therapy_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  therapist_id UUID REFERENCES profiles(id) NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status session_status DEFAULT 'scheduled',
  notes TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  cost DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mood tracking
CREATE TABLE mood_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  mood_level mood_level NOT NULL,
  notes TEXT,
  energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
  anxiety_level INTEGER CHECK (anxiety_level >= 1 AND anxiety_level <= 10),
  sleep_hours DECIMAL(3,1),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resources (articles, videos, exercises)
CREATE TABLE resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  type resource_type NOT NULL,
  categories TEXT[],
  author_id UUID REFERENCES profiles(id),
  thumbnail_url TEXT,
  read_time_minutes INTEGER,
  is_free BOOLEAN DEFAULT TRUE,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sound therapy tracks
CREATE TABLE sound_tracks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  audio_url TEXT,
  thumbnail_url TEXT,
  duration_seconds INTEGER,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Therapeutic games
CREATE TABLE therapeutic_games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  category TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  duration_minutes INTEGER,
  benefits TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages between users and therapists
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES profiles(id) NOT NULL,
  recipient_id UUID REFERENCES profiles(id) NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User progress tracking
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  metric_name TEXT NOT NULL,
  metric_value DECIMAL(10,2),
  notes TEXT,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE therapy_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE sound_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE therapeutic_games ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Therapists are publicly viewable" ON profiles
  FOR SELECT USING (role = 'therapist' AND is_verified = true);

-- Session policies
CREATE POLICY "Users can view their own sessions" ON therapy_sessions
  FOR SELECT USING (auth.uid() = user_id OR auth.uid() = therapist_id);

CREATE POLICY "Users can create sessions" ON therapy_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Mood entries policies
CREATE POLICY "Users can manage their own mood entries" ON mood_entries
  FOR ALL USING (auth.uid() = user_id);

-- Resources policies
CREATE POLICY "Everyone can view resources" ON resources
  FOR SELECT USING (true);

-- Sound tracks policies
CREATE POLICY "Everyone can view sound tracks" ON sound_tracks
  FOR SELECT USING (true);

-- Games policies
CREATE POLICY "Everyone can view games" ON therapeutic_games
  FOR SELECT USING (true);

-- Messages policies
CREATE POLICY "Users can view their own messages" ON messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Progress policies
CREATE POLICY "Users can manage their own progress" ON user_progress
  FOR ALL USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_therapy_sessions_user_id ON therapy_sessions(user_id);
CREATE INDEX idx_therapy_sessions_therapist_id ON therapy_sessions(therapist_id);
CREATE INDEX idx_mood_entries_user_id ON mood_entries(user_id);
CREATE INDEX idx_mood_entries_created_at ON mood_entries(created_at);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
