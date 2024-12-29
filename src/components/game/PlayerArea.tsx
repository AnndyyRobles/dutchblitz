import React from 'react';
import { Card } from './Card';
import { Player } from '../../types/game';

interface PlayerAreaProps {
  player: Player;
  position: number;
  totalPlayers: number;
  onCardPlay: (cardId: string, source: string) => void;
}

export function PlayerArea({ player, position, totalPlayers, onCardPlay }: PlayerAreaProps) {
  const angle = (360 / totalPlayers) * position;
  const radius = Math.min(window.innerWidth, window.innerHeight) * 0.4;
  const x = Math.cos((angle * Math.PI) / 180) * radius + 50;
  const y = Math.sin((angle * Math.PI) / 180) * radius + 50;

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-white font-bold">{player.username}</span>
        <span className="text-white">Score: {player.score}</span>
        
        <div className="flex gap-4">
          {/* Blitz Pile */}
          <div className="relative">
            {player.blitzPile.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                faceDown={true}
                style={{ top: `${index * 2}px` }}
                onClick={() => index === player.blitzPile.length - 1 && onCardPlay(card.id, 'blitz')}
              />
            ))}
          </div>

          {/* Wood Pile */}
          <div className="relative">
            {player.woodPile.slice(-3).map((card, index) => (
              <Card
                key={card.id}
                card={card}
                style={{ top: `${index * 2}px` }}
                onClick={() => index === player.woodPile.length - 1 && onCardPlay(card.id, 'wood')}
              />
            ))}
          </div>

          {/* Post Piles */}
          <div className="flex gap-2">
            {player.postPiles.map((pile, pileIndex) => (
              <div key={pileIndex} className="relative">
                {pile.map((card, cardIndex) => (
                  <Card
                    key={card.id}
                    card={card}
                    style={{ top: `${cardIndex * 2}px` }}
                    onClick={() => cardIndex === pile.length - 1 && onCardPlay(card.id, `post-${pileIndex}`)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}