import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { GameRoom } from '../types/supabase';

export function useGameRooms() {
  const [rooms, setRooms] = useState<GameRoom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
    
    // Subscribe to room changes
    const subscription = supabase
      .channel('game_rooms')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'game_rooms' 
      }, () => {
        fetchRooms();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchRooms = async () => {
    const { data, error } = await supabase
      .from('game_rooms')
      .select('*')
      .eq('status', 'waiting')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setRooms(data);
    }
    setLoading(false);
  };

  const createRoom = async (maxPlayers: number) => {
    const { data, error } = await supabase
      .from('game_rooms')
      .insert([{
        max_players: maxPlayers,
        status: 'waiting',
        host_id: supabase.auth.getUser().then(({ data }) => data.user?.id)
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  return {
    rooms,
    loading,
    createRoom,
  };
}