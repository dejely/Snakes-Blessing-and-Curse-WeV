import { Player } from '../App';
import { Trophy, Target } from 'lucide-react';

interface GameInfoProps {
  players: Player[];
  currentPlayerIndex: number;
  winner: Player | null;
  gameStarted: boolean;
}

export function GameInfo({ players, currentPlayerIndex, winner, gameStarted }: GameInfoProps) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800">
      <h3 className="text-slate-400 mb-4 flex items-center gap-2">
        <Target size={18} />
        Explorers' Progress
      </h3>

      <div className="space-y-4">
        {players.map((player, index) => {
          const isCurrentTurn = index === currentPlayerIndex;
          const isWinner = winner?.id === player.id;
          
          return (
            <div
              key={player.id}
              className={`
                p-4 rounded-lg border transition-all
                ${
                  isCurrentTurn
                    ? 'border-purple-500 bg-purple-950/30'
                    : 'border-slate-700 bg-slate-800/30'
                }
                ${isWinner ? 'border-yellow-500 bg-yellow-950/30' : ''}
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white"
                    style={{ backgroundColor: player.color }}
                  />
                  <span className="text-slate-200">{player.name}</span>
                  {isWinner && <Trophy size={16} className="text-yellow-400" />}
                </div>
                <span className="text-purple-400">
                  {player.position}/100
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`
                    h-full transition-all duration-500 rounded-full
                    ${isWinner ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' : 'bg-gradient-to-r from-purple-600 to-pink-600'}
                  `}
                  style={{ width: `${player.position}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {!gameStarted && (
        <div className="mt-4 p-3 bg-purple-950/30 rounded-lg border border-purple-800">
          <p className="text-xs text-purple-300 text-center">
            Roll the dice to begin your journey through limbo...
          </p>
        </div>
      )}

      {winner && (
        <div className="mt-4 p-4 bg-gradient-to-r from-yellow-950/50 to-purple-950/50 rounded-lg border border-yellow-600">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy size={20} className="text-yellow-400" />
            <h4 className="text-yellow-400">Victory!</h4>
          </div>
          <p className="text-sm text-center text-slate-300">
            {winner.name} has escaped the underworld!
          </p>
        </div>
      )}
    </div>
  );
}
