import { Card, CardColor, CardSymbol, CardValue, GameState, Player } from '../types/game';
import { generateDeck, shuffleDeck } from './utils';

export function initializeGame(gameState: GameState): GameState {
  const colors: CardColor[] = ['red', 'blue', 'yellow', 'green', 'purple', 'orange', 'pink', 'brown', 'teal', 'violet'];
  const playerCount = gameState.players.length;
  
  // Assign colors and deal cards to players
  const updatedPlayers = gameState.players.map((player, index) => {
    const deck = shuffleDeck(generateDeck(colors[index]));
    return {
      ...player,
      blitzPile: deck.slice(0, 10),
      woodPile: deck.slice(10, 40),
      postPiles: [[], [], []],
    };
  });

  return {
    ...gameState,
    players: updatedPlayers,
    dutchPiles: [],
  };
}

export function isValidMove(card: Card, targetPile: Card[]): boolean {
  if (targetPile.length === 0) {
    return card.value === 1;
  }

  const topCard = targetPile[targetPile.length - 1];
  return card.value === topCard.value + 1 && card.color === topCard.color;
}

export function calculateScore(player: Player): number {
  const dutchPileCards = player.woodPile.length - player.woodPile.length; // Cards played to Dutch piles
  const blitzPenalty = player.blitzPile.length * -2;
  return dutchPileCards + blitzPenalty;
}