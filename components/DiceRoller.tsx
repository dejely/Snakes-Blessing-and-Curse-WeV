import { motion } from 'motion/react';
import { Dices } from 'lucide-react';
import { Player } from '../App';

interface DiceRollerProps {
  diceValue: number | null;
  isRolling: boolean;
  onRoll: () => void;
  disabled: boolean;
  currentPlayer: Player;
}

export function DiceRoller({ diceValue, isRolling, onRoll, disabled, currentPlayer }: DiceRollerProps) {
  const renderDiceFace = (value: number) => {
    const dots = [];
    
    // Dice dot patterns
    const patterns: { [key: number]: [number, number][] } = {
      1: [[1, 1]],
      2: [[0, 0], [2, 2]],
      3: [[0, 0], [1, 1], [2, 2]],
      4: [[0, 0], [0, 2], [2, 0], [2, 2]],
      5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
      6: [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]],
    };
    
    const pattern = patterns[value] || [];
    
    return (
      <div className="grid grid-cols-3 gap-2 p-4">
        {Array.from({ length: 9 }, (_, i) => {
          const row = Math.floor(i / 3);
          const col = i % 3;
          const hasDot = pattern.some(([r, c]) => r === row && c === col);
          
          return (
            <div
              key={i}
              className={`
                w-3 h-3 rounded-full transition-colors
                ${hasDot ? 'bg-purple-400' : 'bg-transparent'}
              `}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800">
      <div className="text-center mb-4">
        <h3 className="text-slate-400 mb-2">Current Turn</h3>
        <div className="flex items-center justify-center gap-2">
          <div
            className="w-4 h-4 rounded-full border-2 border-white"
            style={{ backgroundColor: currentPlayer.color }}
          />
          <span className="text-slate-200">{currentPlayer.name}</span>
        </div>
      </div>

      {/* Dice Display */}
      <div className="flex justify-center mb-6">
        {diceValue ? (
          <motion.div
            key={diceValue}
            initial={{ scale: 0.8, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="bg-slate-800 rounded-xl border-2 border-purple-500 shadow-lg shadow-purple-500/20"
          >
            {renderDiceFace(diceValue)}
          </motion.div>
        ) : (
          <div className="bg-slate-800 rounded-xl border-2 border-slate-700 p-8">
            <Dices size={40} className="text-slate-600" />
          </div>
        )}
      </div>

      {/* Roll Button */}
      <motion.button
        onClick={onRoll}
        disabled={disabled}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        className={`
          w-full py-4 rounded-lg transition-all
          flex items-center justify-center gap-2
          ${
            disabled
              ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20'
          }
        `}
      >
        <Dices size={20} />
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </motion.button>

      {diceValue && !isRolling && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-purple-400"
        >
          You rolled a {diceValue}!
        </motion.div>
      )}
    </div>
  );
}
