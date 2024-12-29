export interface Profile {
  id: string;
  username: string;
  total_games: number;
  games_won: number;
  longest_streak: number;
  total_points: number;
  created_at: string;
}

export interface GameRoom {
  id: string;
  host_id: string;
  max_players: number;
  status: 'waiting' | 'playing' | 'finished';
  current_round: number;
  created_at: string;
}

export interface GamePlayer {
  id: string;
  game_id: string;
  user_id: string;
  score: number;
  is_ready: boolean;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      game_rooms: {
        Row: GameRoom;
        Insert: Omit<GameRoom, 'created_at'>;
        Update: Partial<Omit<GameRoom, 'id' | 'created_at'>>;
      };
      game_players: {
        Row: GamePlayer;
        Insert: Omit<GamePlayer, 'created_at'>;
        Update: Partial<Omit<GamePlayer, 'id' | 'created_at'>>;
      };
    };
  };
}