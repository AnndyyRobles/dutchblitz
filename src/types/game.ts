export type CardColor = 'red' | 'blue' | 'yellow' | 'green' | 'purple' | 'orange' | 'pink' | 'brown' | 'teal' | 'violet';
export type CardSymbol = 'boy' | 'girl' | 'pump' | 'carriage';
export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface Card {
  id: string;
  color: CardColor;
  symbol: CardSymbol;
  value: CardValue;
}

export interface Player {
  id: string;
  username: string;
  score: number;
  blitzPile: Card[];
  woodPile: Card[];
  postPiles: Card[][];
  isReady: boolean;
}

export interface GameState {
  id: string;
  players: Player[];
  dutchPiles: Card[][];
  status: 'waiting' | 'playing' | 'finished';
  currentRound: number;
  maxPlayers: number;
  createdAt: Date;
  updatedAt: Date;
}