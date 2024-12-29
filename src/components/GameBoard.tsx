import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Card } from './Card';

export function GameBoard() {
  const { game, currentPlayer } = useGameStore();

  if (!game || !currentPlayer) {
    return null;
  }

  return (
    <div className="w-full h-screen bg-green-800 p-8">
      <div className="relative w-full h-full">
        {/* Dutch Piles (Center) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4">
          {game.dutchPiles.map((pile, index) => (
            <div key={index} className="relative">
              {pile.map((card, cardIndex) => (
                <Card
                  key={card.id}
                  card={card}
                  className="absolute"
                  style={{
                    top: `${cardIndex * 4}px`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Player Areas */}
        <div className="absolute inset-0">
          {game.players.map((player, index) => {
            const angle = (360 / game.players.length) * index;
            const radius = Math.min(window.innerWidth, window.innerHeight) * 0.4;
            const x = Math.cos((angle * Math.PI) / 180) * radius + 50;
            const y = Math.sin((angle * Math.PI) / 180) * radius + 50;

            return (
              <div
                key={player.id}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-white font-bold">{player.username}</span>
                  <span className="text-white">Score: {player.score}</span>
                  <div className="flex gap-2">
                    {/* Blitz Pile */}
                    <div className="relative">
                      {player.blitzPile.map((card, i) => (
                        <Card
                          key={card.id}
                          card={card}
                          faceDown={true}
                          className="absolute"
                          style={{ top: `${i * 2}px` }}
                        />
                      ))}
                    </div>
                    {/* Wood Pile */}
                    <div className="relative">
                      {player.woodPile.map((card, i) => (
                        <Card
                          key={card.id}
                          card={card}
                          className="absolute"
                          style={{ top: `${i * 2}px` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}