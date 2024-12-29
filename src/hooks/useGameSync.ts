import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { GameState } from '../types/game';

export function useGameSync(gameId: string, onStateUpdate: (state: GameState) => void) {
  useEffect(() => {
    const channel = supabase
      .channel(`game:${gameId}`)
      .on('broadcast', { event: 'game_state' }, ({ payload }) => {
        onStateUpdate(payload as GameState);
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [gameId, onStateUpdate]);

  const broadcastState = async (state: GameState) => {
    await supabase.channel(`game:${gameId}`).send({
      type: 'broadcast',
      event: 'game_state',
      payload: state,
    });
  };

  return { broadcastState };
}