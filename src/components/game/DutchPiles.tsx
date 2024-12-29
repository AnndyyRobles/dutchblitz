import React from 'react';
import { Card as CardType } from '../../types/game';
import { Card } from './Card';

interface DutchPilesProps {
  piles: CardType[][];
  onCardPlace: (pileIndex: number) => void;
}

export function DutchPiles({ piles, onCardPlace }: DutchPilesProps) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="grid grid-cols-5 gap-4">
        {piles.map((pile, index) => (
          <div
            key={index}
            className="relative h-36"
            onClick={() => onCardPlace(index)}
          >
            {pile.map((card, cardIndex) => (
              <Card
                key={card.id}
                card={card}
                className="absolute"
                style={{
                  top: `${cardIndex * 4}px`,
                  zIndex: cardIndex,
                }}
              />
            ))}
            {pile.length === 0 && (
              <div className="w-24 h-36 border-2 border-dashed border-white/30 rounded-lg" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}