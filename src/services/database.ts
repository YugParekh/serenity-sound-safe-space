
import { supabase } from '@/lib/supabase';
import { Profile, TherapySession, MoodEntry, Resource, SoundTrack, TherapeuticGame } from '@/types/database';

export class DatabaseService {
  // Profile operations
  static async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  }

  static async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }

    return data;
  }

  // Therapist operations
  static async getVerifiedTherapists(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'therapist')
      .eq('is_verified', true);

    if (error) {
      console.error('Error fetching therapists:', error);
      return [];
    }

    return data || [];
  }

  // Session operations
  static async getUserSessions(userId: string): Promise<TherapySession[]> {
    const { data, error } = await supabase
      .from('therapy_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('scheduled_at', { ascending: false });

    if (error) {
      console.error('Error fetching sessions:', error);
      return [];
    }

    return data || [];
  }

  static async createSession(session: Omit<TherapySession, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('therapy_sessions')
      .insert(session)
      .select()
      .single();

    if (error) {
      console.error('Error creating session:', error);
      throw error;
    }

    return data;
  }

  // Mood tracking operations
  static async getUserMoodEntries(userId: string, limit = 30): Promise<MoodEntry[]> {
    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching mood entries:', error);
      return [];
    }

    return data || [];
  }

  static async createMoodEntry(entry: Omit<MoodEntry, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('mood_entries')
      .insert(entry)
      .select()
      .single();

    if (error) {
      console.error('Error creating mood entry:', error);
      throw error;
    }

    return data;
  }

  // Resource operations
  static async getResources(): Promise<Resource[]> {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching resources:', error);
      return [];
    }

    return data || [];
  }

  // Sound track operations
  static async getSoundTracks(): Promise<SoundTrack[]> {
    const { data, error } = await supabase
      .from('sound_tracks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sound tracks:', error);
      return [];
    }

    return data || [];
  }

  // Game operations
  static async getTherapeuticGames(): Promise<TherapeuticGame[]> {
    const { data, error } = await supabase
      .from('therapeutic_games')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching games:', error);
      return [];
    }

    return data || [];
  }
}
