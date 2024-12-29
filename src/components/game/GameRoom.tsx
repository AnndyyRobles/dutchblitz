import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGameState } from '../../hooks/useGameState';
import { GameLobby } from './GameLobby';
import { GameBoard } from './GameBoard';
import { LoadingScreen } from '../ui/LoadingScreen';

export function GameRoom() {
  const { id } = useParams<{ id: string }>();
  const { gameState, loading, error, joinGame } = useGameState(id!);

  useEffect(() => {
    if (id) {
      joinGame();
    }
  }, [id]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!gameState) {
    return <div>Game not found</div>;
  }

  return gameState.status === 'waiting' ? (
    <GameLobby gameState={gameState} />
  ) : (
    <GameBoard gameState={gameState} />
  );
}