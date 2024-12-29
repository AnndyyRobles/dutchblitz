import React from 'react';
import { cn } from '../lib/utils';
import { Card as CardType } from '../types/game';

interface CardProps {
  card: CardType;
  faceDown?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Card({ card, faceDown = false, onClick, className }: CardProps) {
  return (
    <div
      className={cn(
        'relative w-24 h-36 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105',
        `bg-${card.color}-500`,
        faceDown && 'bg-gray-800',
        className
      )}
      onClick={onClick}
    >
      {!faceDown && (
        <div className="absolute inset-0 p-2 flex flex-col items-center justify-between">
          <span className="text-2xl font-bold text-white">{card.value}</span>
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            {/* We'll add proper card symbols/images here */}
            <span className="text-sm">{card.symbol}</span>
          </div>
          <span className="text-2xl font-bold text-white rotate-180">{card.value}</span>
        </div>
      )}
    </div>
  );
}