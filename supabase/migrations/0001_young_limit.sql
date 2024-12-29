/*
  # Initial Schema Setup for Dutch Blitz Online

  1. New Tables
    - `profiles`
      - User profiles with game statistics
    - `game_rooms`
      - Game session management
    - `game_players`
      - Player participation in games
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE NOT NULL,
  total_games INTEGER DEFAULT 0,
  games_won INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  total_points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Game rooms table
CREATE TABLE IF NOT EXISTS game_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID REFERENCES auth.users(id),
  max_players INTEGER NOT NULL CHECK (max_players BETWEEN 2 AND 10),
  status TEXT NOT NULL CHECK (status IN ('waiting', 'playing', 'finished')),
  current_round INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE game_rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read game rooms"
  ON game_rooms
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Host can update their game room"
  ON game_rooms
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = host_id);

CREATE POLICY "Authenticated users can create game rooms"
  ON game_rooms
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = host_id);

-- Game players table
CREATE TABLE IF NOT EXISTS game_players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID REFERENCES game_rooms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  score INTEGER DEFAULT 0,
  is_ready BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(game_id, user_id)
);

ALTER TABLE game_players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Players can read game participants"
  ON game_players
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Players can update their own game status"
  ON game_players
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Players can join games"
  ON game_players
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);