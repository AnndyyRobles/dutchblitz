import React from 'react';
import { Users, Play } from 'lucide-react';
import { useGameState } from '../../hooks/useGameState';
import { GameState } from '../../types/game';

interface GameLobbyProps {
  gameState: GameState;
}

export function GameLobby({ gameState }: GameLobbyProps) {
  const { startGame, toggleReady } = useGameState(gameState.id);
  const isHost = gameState.players[0]?.id === gameState.currentPlayer?.id;
  const canStart = gameState.players.length >= 2 && 
                  gameState.players.every(p => p.isReady);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Game Lobby</h2>
          <div className="flex items-center gap-2">
            <Users size={20} />
            <span>{gameState.players.length} / {gameState.maxPlayers}</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {gameState.players.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <div className="flex items-center gap-3">
                {player.id === gameState.players[0]?.id && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Host
                  </span>
                )}
                <span className="font-medium">{player.username}</span>
              </div>
              <div className="flex items-center gap-2">
                {player.isReady ? (
                  <span className="text-green-600">Ready</span>
                ) : (
                  <span className="text-gray-400">Not Ready</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          {isHost ? (
            <button
              onClick={startGame}
              disabled={!canStart}
              className={`flex items-center gap-2 px-6 py-2 rounded-md ${
                canStart
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
              }`}
            >
              <Play size={20} />
              Start Game
            </button>
          ) : (
            <button
              onClick={toggleReady}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {gameState.currentPlayer?.isReady ? 'Not Ready' : 'Ready'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}