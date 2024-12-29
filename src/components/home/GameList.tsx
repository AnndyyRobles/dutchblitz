import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus } from 'lucide-react';
import { useGameRooms } from '../../hooks/useGameRooms';
import { GameRoom } from '../../types/supabase';

export function GameList() {
  const { rooms, createRoom } = useGameRooms();
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    const room = await createRoom(4); // Default to 4 players
    if (room) {
      navigate(`/game/${room.id}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Available Games</h2>
        <button
          onClick={handleCreateRoom}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          <Plus size={20} />
          Create Game
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room: GameRoom) => (
          <div
            key={room.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Game #{room.id.slice(0, 8)}</span>
              <span className="text-sm text-gray-500">
                {room.status === 'waiting' ? 'Waiting' : 'In Progress'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={16} />
              <span>
                {/* TODO: Add player count */} / {room.max_players} players
              </span>
            </div>
            {room.status === 'waiting' && (
              <button
                onClick={() => navigate(`/game/${room.id}`)}
                className="mt-3 w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Join Game
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
)}