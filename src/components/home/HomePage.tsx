import React from 'react';
import { Trophy, User } from 'lucide-react';
import { GameList } from './GameList';
import { PlayerStats } from './PlayerStats';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Dutch Blitz Online</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1fr_300px]">
          <GameList />
          <PlayerStats />
        </div>
      </main>
    </div>
  );
}