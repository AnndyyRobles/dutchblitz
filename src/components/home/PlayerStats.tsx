import React from 'react';
import { Trophy, Star, Hash, Award } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';

export function PlayerStats() {
  const { profile, loading } = useProfile();

  if (loading) {
    return <div className="animate-pulse bg-white p-6 rounded-lg shadow-md">Loading...</div>;
  }

  if (!profile) return null;

  const stats = [
    { icon: Trophy, label: 'Games Won', value: profile.games_won },
    { icon: Hash, label: 'Total Games', value: profile.total_games },
    { icon: Star, label: 'Best Streak', value: profile.longest_streak },
    { icon: Award, label: 'Total Points', value: profile.total_points },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
      <div className="space-y-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon size={20} className="text-indigo-600" />
            <div>
              <div className="text-sm text-gray-500">{label}</div>
              <div className="font-medium">{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}