import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateDeck(color: CardColor): Card[] {
  const symbols: CardSymbol[] = ['boy', 'girl', 'pump', 'carriage'];
  const values: CardValue[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const deck: Card[] = [];

  symbols.forEach((symbol) => {
    values.forEach((value) => {
      deck.push({
        id: `${color}-${symbol}-${value}`,
        color,
        symbol,
        value,
      });
    });
  });

  return deck;
}

export function shuffleDeck<T>(deck: T[]): T[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}