import { create } from 'zustand';
import { GameState, Player, Card } from '../types/game';

interface GameStore {
  game: GameState | null;
  currentPlayer: Player | null;
  isLoading: boolean;
  error: string | null;
  setGame: (game: GameState) => void;
  setCurrentPlayer: (player: Player) => void;
  playCard: (card: Card, fromPile: string, toPile: string) => void;
  joinGame: (gameId: string) => Promise<void>;
  createGame: (maxPlayers: number) => Promise<void>;
  leaveGame: () => Promise<void>;
}

export const useGameStore = create<GameStore>((set, get) => ({
  game: null,
  currentPlayer: null,
  isLoading: false,
  error: null,

  setGame: (game) => set({ game }),
  setCurrentPlayer: (player) => set({ currentPlayer: player }),

  playCard: async (card, fromPile, toPile) => {
    // Implementation will be added when we set up Supabase
  },

  joinGame: async (gameId) => {
    // Implementation will be added when we set up Supabase
  },

  createGame: async (maxPlayers) => {
    // Implementation will be added when we set up Supabase
  },

  leaveGame: async () => {
    // Implementation will be added when we set up Supabase
  },
}));