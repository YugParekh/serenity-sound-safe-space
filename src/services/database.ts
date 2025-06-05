
import { supabase } from '@/lib/supabase';
import { Profile, TherapySession, MoodEntry, Resource, SoundTrack, TherapeuticGame, Message, UserProgress, MoodLevel, SessionStatus } from '@/types/database';

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

  static async updateProfile(userId: string, updates: Partial<Profile>): Promise<boolean> {
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);

    if (error) {
      console.error('Error updating profile:', error);
      return false;
    }

    return true;
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

  static async createSession(session: Omit<TherapySession, 'id' | 'created_at' | 'updated_at'>): Promise<TherapySession | null> {
    const { data, error } = await supabase
      .from('therapy_sessions')
      .insert(session)
      .select()
      .single();

    if (error) {
      console.error('Error creating session:', error);
      return null;
    }

    return data;
  }

  // Mood tracking operations
  static async getUserMoodEntries(userId: string, limit: number = 30): Promise<MoodEntry[]> {
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

  static async addMoodEntry(entry: Omit<MoodEntry, 'id' | 'created_at'>): Promise<boolean> {
    const { error } = await supabase
      .from('mood_entries')
      .insert(entry);

    if (error) {
      console.error('Error adding mood entry:', error);
      return false;
    }

    return true;
  }

  // Resources operations
  static async getResources(category?: string): Promise<Resource[]> {
    let query = supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });

    if (category) {
      query = query.contains('categories', [category]);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching resources:', error);
      return [];
    }

    return data || [];
  }

  // Sound tracks operations
  static async getSoundTracks(category?: string): Promise<SoundTrack[]> {
    let query = supabase
      .from('sound_tracks')
      .select('*')
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching sound tracks:', error);
      return [];
    }

    return data || [];
  }

  // Games operations
  static async getTherapeuticGames(category?: string): Promise<TherapeuticGame[]> {
    let query = supabase
      .from('therapeutic_games')
      .select('*')
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching games:', error);
      return [];
    }

    return data || [];
  }

  // Messages operations
  static async getMessages(userId: string, otherUserId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${userId},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${userId})`)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return [];
    }

    return data || [];
  }

  static async sendMessage(message: Omit<Message, 'id' | 'created_at'>): Promise<boolean> {
    const { error } = await supabase
      .from('messages')
      .insert(message);

    if (error) {
      console.error('Error sending message:', error);
      return false;
    }

    return true;
  }

  // Progress tracking operations
  static async getUserProgress(userId: string, metricName?: string): Promise<UserProgress[]> {
    let query = supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .order('recorded_at', { ascending: false });

    if (metricName) {
      query = query.eq('metric_name', metricName);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching progress:', error);
      return [];
    }

    return data || [];
  }

  static async addProgressEntry(entry: Omit<UserProgress, 'id'>): Promise<boolean> {
    const { error } = await supabase
      .from('user_progress')
      .insert(entry);

    if (error) {
      console.error('Error adding progress entry:', error);
      return false;
    }

    return true;
  }
}
