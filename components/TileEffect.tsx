import { motion } from 'motion/react';
import { SpecialTile } from '../App';
import { Skull, Sparkles, Zap, AlertTriangle } from 'lucide-react';

interface TileEffectProps {
  effect: SpecialTile;
}

export function TileEffect({ effect }: TileEffectProps) {
  const getEffectIcon = () => {
    switch (effect.type) {
      case 'snake':
        return <Skull size={48} className="text-red-400" />;
      case 'vine':
        return <Sparkles size={48} className="text-emerald-400" />;
      case 'boon':
        return <Zap size={48} className="text-purple-400" />;
      case 'curse':
        return <AlertTriangle size={48} className="text-orange-400" />;
    }
  };

  const getEffectColor = () => {
    switch (effect.type) {
      case 'snake':
        return 'from-red-950/90 to-slate-950/90 border-red-800';
      case 'vine':
        return 'from-emerald-950/90 to-slate-950/90 border-emerald-800';
      case 'boon':
        return 'from-purple-950/90 to-slate-950/90 border-purple-800';
      case 'curse':
        return 'from-orange-950/90 to-slate-950/90 border-orange-800';
    }
  };

  const getEffectTitle = () => {
    switch (effect.type) {
      case 'snake':
        return 'SERPENT STRIKES!';
      case 'vine':
        return 'VINES ASCEND!';
      case 'boon':
        return 'BOON DISCOVERED!';
      case 'curse':
        return 'CURSE TRIGGERED!';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className={`
          bg-gradient-to-br ${getEffectColor()}
          border-2 rounded-2xl p-8 max-w-md mx-4
          shadow-2xl
        `}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-4"
        >
          {getEffectIcon()}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center text-slate-100 mb-4 tracking-widest"
        >
          {getEffectTitle()}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <p className="text-center text-slate-300 text-sm">
            {effect.description}
          </p>

          {effect.from !== effect.to && (
            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
              <span className="text-slate-500">Tile {effect.from}</span>
              <span>→</span>
              <span className="text-purple-400">Tile {effect.to}</span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
