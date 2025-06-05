
-- Sample data for testing the mental health app

-- Insert sample therapists
INSERT INTO profiles (id, email, first_name, last_name, role, bio, specialties, license_number, years_experience, hourly_rate, is_verified, avatar_url) VALUES
('therapist-1', 'dr.sarah.wilson@serenity.com', 'Dr. Sarah', 'Wilson', 'therapist', 'Specializing in anxiety and depression with over 10 years of experience using CBT and mindfulness techniques.', ARRAY['Anxiety', 'Depression', 'CBT', 'Mindfulness'], 'LIC123456', 10, 120.00, true, 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400'),
('therapist-2', 'dr.michael.chen@serenity.com', 'Dr. Michael', 'Chen', 'therapist', 'Expert in trauma therapy and PTSD with specialized training in EMDR and somatic approaches.', ARRAY['Trauma', 'PTSD', 'EMDR', 'Somatic Therapy'], 'LIC789012', 8, 150.00, true, 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400'),
('therapist-3', 'dr.emma.davis@serenity.com', 'Dr. Emma', 'Davis', 'therapist', 'Specializing in relationship counseling and family therapy with a focus on communication and conflict resolution.', ARRAY['Couples Therapy', 'Family Therapy', 'Communication'], 'LIC345678', 12, 140.00, true, 'https://images.unsplash.com/photo-1594824204769-f7fb26f6fb32?w=400');

-- Insert sample sound tracks
INSERT INTO sound_tracks (title, description, audio_url, thumbnail_url, duration_seconds, category) VALUES
('Ocean Waves', 'Gentle ocean waves for deep relaxation and stress relief', '/sounds/ocean-waves.mp3', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', 3600, 'Nature'),
('Forest Rain', 'Calming rainforest sounds to promote peaceful sleep', '/sounds/forest-rain.mp3', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400', 2700, 'Nature'),
('Meditation Bell', 'Traditional meditation bells for mindfulness practice', '/sounds/meditation-bell.mp3', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', 1800, 'Meditation'),
('White Noise', 'Pure white noise for focus and concentration', '/sounds/white-noise.mp3', 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=400', 3600, 'Focus'),
('Piano Peaceful', 'Gentle piano melodies for relaxation', '/sounds/piano-peaceful.mp3', 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400', 2400, 'Music');

-- Insert sample therapeutic games
INSERT INTO therapeutic_games (title, description, thumbnail_url, category, difficulty, duration_minutes, benefits) VALUES
('Breathing Garden', 'Interactive breathing exercises in a virtual garden setting', 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400', 'Anxiety Relief', 'easy', 10, ARRAY['Reduces anxiety', 'Improves breathing', 'Promotes relaxation']),
('Mood Tracker Quest', 'Gamified mood tracking with achievements and progress rewards', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400', 'Mood Management', 'easy', 5, ARRAY['Mood awareness', 'Self-reflection', 'Progress tracking']),
('Mindful Puzzle', 'Calming puzzle game designed to promote mindfulness and focus', 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400', 'Mindfulness', 'medium', 20, ARRAY['Improves focus', 'Reduces stress', 'Enhances mindfulness']),
('Gratitude Journal', 'Interactive gratitude practice with prompts and reflection exercises', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', 'Positivity', 'easy', 15, ARRAY['Builds gratitude', 'Improves mood', 'Positive thinking']);

-- Insert sample resources
INSERT INTO resources (title, description, content, type, categories, author_id, thumbnail_url, read_time_minutes, is_free, rating, review_count) VALUES
('Understanding Anxiety: A Complete Guide', 'Comprehensive guide to understanding anxiety disorders, symptoms, and coping strategies.', 'Anxiety is a normal human emotion that everyone experiences...', 'article', ARRAY['Anxiety', 'Education'], 'therapist-1', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400', 15, true, 4.8, 234),
('10 Minute Meditation for Beginners', 'Learn the basics of meditation with this beginner-friendly video guide.', 'Meditation can seem intimidating at first...', 'video', ARRAY['Meditation', 'Mindfulness'], 'therapist-2', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', 10, true, 4.6, 189),
('CBT Worksheet: Thought Challenging', 'Interactive worksheet to help identify and challenge negative thought patterns.', 'This worksheet will guide you through...', 'worksheet', ARRAY['CBT', 'Self-Help'], 'therapist-1', 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=400', 20, false, 4.9, 156),
('Managing Depression: Daily Strategies', 'Practical daily strategies for managing depression symptoms and building resilience.', 'Depression affects millions of people...', 'guide', ARRAY['Depression', 'Self-Care'], 'therapist-3', 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400', 25, true, 4.7, 298);
