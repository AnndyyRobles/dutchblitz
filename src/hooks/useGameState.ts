import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { GameState, Player } from '../types/game';

export function useGameState(gameId: string) {
  const { user } = useAuth();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!gameId || !user) return;

    fetchGameState();

    const subscription = supabase
      .channel(`game:${gameId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'game_rooms',
        filter: `id=eq.${gameId}`,
      }, () => {
        fetchGameState();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [gameId, user]);

  const fetchGameState = async () => {
    if (!gameId) return;

    const { data: room, error: roomError } = await supabase
      .from('game_rooms')
      .select(`
        *,
        game_players (*)
      `)
      .eq('id', gameId)
      .single();

    if (roomError) {
      setError(roomError.message);
      setLoading(false);
      return;
    }

    if (!room) {
      setError('Game not found');
      setLoading(false);
      return;
    }

    // Transform the data into our GameState type
    const players = room.game_players.map((player: any): Player => ({
      id: player.user_id,
      username: player.username,
      score: player.score,
      isReady: player.is_ready,
      blitzPile: [],
      woodPile: [],
      postPiles: [[], [], []],
    }));

    setGameState({
      id: room.id,
      players,
      currentPlayer: players.find(p => p.id === user?.id) || null,
      dutchPiles: [],
      status: room.status,
      currentRound: room.current_round,
      maxPlayers: room.max_players,
      createdAt: new Date(room.created_at),
      updatedAt: new Date(room.created_at),
    });

    setLoading(false);
  };

  const joinGame = async () => {
    if (!user || !gameId) return;

    const { error } = await supabase
      .from('game_players')
      .insert([{
        game_id: gameId,
        user_id: user.id,
        score: 0,
        is_ready: false,
      }]);

    if (error && error.code !== '23505') { // Ignore unique violation
      setError(error.message);
    }
  };

  const toggleReady = async () => {
    if (!user || !gameId) return;

    const { error } = await supabase
      .from('game_players')
      .update({ is_ready: !gameState?.currentPlayer?.isReady })
      .eq('game_id', gameId)
      .eq('user_id', user.id);

    if (error) {
      setError(error.message);
    }
  };

  const startGame = async () => {
    if (!gameId) return;

    const { error } = await supabase
      .from('game_rooms')
      .update({ status: 'playing' })
      .eq('id', gameId);

    if (error) {
      setError(error.message);
    }
  };

  return {
    gameState,
    loading,
    error,
    joinGame,
    toggleReady,
    startGame,
  };
}