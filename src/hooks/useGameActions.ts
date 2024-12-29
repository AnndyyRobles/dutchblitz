import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Card, GameState } from '../types/game';
import { isValidMove } from '../lib/gameUtils';

export function useGameActions(gameState: GameState) {
  const [selectedCard, setSelectedCard] = useState<{ card: Card; source: string } | null>(null);

  const playCard = async (cardId: string, source: string) => {
    const card = findCard(cardId, source);
    if (!card) return;

    setSelectedCard({ card, source });
  };

  const placeToDutchPile = async (pileIndex: number) => {
    if (!selectedCard) return;

    const targetPile = gameState.dutchPiles[pileIndex] || [];
    if (!isValidMove(selectedCard.card, targetPile)) return;

    // Update game state in Supabase
    const { error } = await supabase.rpc('play_card', {
      game_id: gameState.id,
      card_id: selectedCard.card.id,
      source_pile: selectedCard.source,
      target_pile: pileIndex,
    });

    if (error) {
      console.error('Error playing card:', error);
    }

    setSelectedCard(null);
  };

  const findCard = (cardId: string, source: string): Card | null => {
    const player = gameState.currentPlayer;
    if (!player) return null;

    if (source === 'blitz') {
      return player.blitzPile.find(c => c.id === cardId) || null;
    }
    if (source === 'wood') {
      return player.woodPile.find(c => c.id === cardId) || null;
    }
    if (source.startsWith('post-')) {
      const pileIndex = parseInt(source.split('-')[1]);
      return player.postPiles[pileIndex]?.find(c => c.id === cardId) || null;
    }
    return null;
  };

  return {
    selectedCard,
    playCard,
    placeToDutchPile,
  };
}