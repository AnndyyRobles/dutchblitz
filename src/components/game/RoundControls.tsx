import React from 'react';
import { Play, Square } from 'lucide-react';

interface RoundControlsProps {
  isHost: boolean;
  isRoundActive: boolean;
  onStartRound: () => void;
  onEndRound: () => void;
  currentRound: number;
}

export function RoundControls({
  isHost,
  isRoundActive,
  onStartRound,
  onEndRound,
  currentRound,
}: RoundControlsProps) {
  if (!isHost) return null;

  return (
    <div className="fixed top-4 right-4 flex items-center gap-4">
      <span className="text-white font-medium">Round {currentRound}/3</span>
      {!isRoundActive ? (
        <button
          onClick={onStartRound}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          <Play size={20} />
          Start Round
        </button>
      ) : (
        <button
          onClick={onEndRound}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          <Square size={20} />
          End Round
        </button>
      )}
    </div>
  );
}