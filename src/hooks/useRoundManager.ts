import { useState, useCallback } from 'react';
import { GameState, Player } from '../types/game';
import { calculateScore } from '../lib/gameUtils';
import { supabase } from '../lib/supabase';

export function useRoundManager(gameState: GameState) {
  const [isRoundActive, setIsRoundActive] = useState(false);

  const startRound = useCallback(async () => {
    setIsRoundActive(true);
    
    // Update game state in Supabase
    await supabase
      .from('game_rooms')
      .update({ 
        status: 'playing',
        current_round: gameState.currentRound 
      })
      .eq('id', gameState.id);
  }, [gameState.id, gameState.currentRound]);

  const endRound = useCallback(async () => {
    setIsRoundActive(false);

    // Calculate scores for all players
    const updatedPlayers = gameState.players.map((player: Player) => ({
      ...player,
      score: player.score + calculateScore(player),
    }));

    // Update scores in Supabase
    const promises = updatedPlayers.map((player) =>
      supabase
        .from('game_players')
        .update({ score: player.score })
        .eq('game_id', gameState.id)
        .eq('user_id', player.id)
    );

    await Promise.all(promises);

    // Update game state
    await supabase
      .from('game_rooms')
      .update({ 
        current_round: gameState.currentRound + 1,
        status: gameState.currentRound >= 3 ? 'finished' : 'waiting'
      })
      .eq('id', gameState.id);
  }, [gameState]);

  return {
    isRoundActive,
    startRound,
    endRound,
  };
}