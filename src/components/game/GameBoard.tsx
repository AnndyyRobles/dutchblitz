import React, { useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { useGameActions } from '../../hooks/useGameActions';
import { useGameSync } from '../../hooks/useGameSync';
import { useRoundManager } from '../../hooks/useRoundManager';
import { PlayerArea } from './PlayerArea';
import { DutchPiles } from './DutchPiles';
import { RoundControls } from './RoundControls';
import { initializeGame } from '../../lib/gameUtils';

interface GameBoardProps {
  gameState: GameState;
}

export function GameBoard({ gameState }: GameBoardProps) {
  const { selectedCard, playCard, placeToDutchPile } = useGameActions(gameState);
  const { broadcastState } = useGameSync(gameState.id, (newState) => {
    // Update local game state with new state from server
    // This will be handled by the parent component
  });
  const { isRoundActive, startRound, endRound } = useRoundManager(gameState);

  const isHost = gameState.players[0]?.id === gameState.currentPlayer?.id;

  useEffect(() => {
    if (gameState.dutchPiles.length === 0) {
      initializeGame(gameState);
    }
  }, []);

  return (
    <div className="relative w-full h-screen bg-green-800 overflow-hidden">
      <RoundControls
        isHost={isHost}
        isRoundActive={isRoundActive}
        onStartRound={startRound}
        onEndRound={endRound}
        currentRound={gameState.currentRound}
      />

      {gameState.players.map((player, index) => (
        <PlayerArea
          key={player.id}
          player={player}
          position={index}
          totalPlayers={gameState.players.length}
          onCardPlay={playCard}
        />
      ))}

      <DutchPiles
        piles={gameState.dutchPiles}
        onCardPlace={placeToDutchPile}
      />

      {selectedCard && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 px-4 py-2 rounded-full text-white">
          Selected: {selectedCard.card.color} {selectedCard.card.value}
        </div>
      )}
    </div>
  );
}