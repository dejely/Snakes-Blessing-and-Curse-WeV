import { Player, SpecialTile } from '../App';
import { Skull, Zap, Sparkles, AlertTriangle } from 'lucide-react';

interface GameBoardProps {
  players: Player[];
  specialTiles: SpecialTile[];
  currentPlayerIndex: number;
}

export function GameBoard({ players, specialTiles, currentPlayerIndex }: GameBoardProps) {
  const renderTile = (tileNumber: number) => {
    const playersOnTile = players.filter(p => p.position === tileNumber);
    const specialTile = specialTiles.find(t => t.from === tileNumber);
    
    // Calculate row from bottom (0-9)
    const row = Math.floor((tileNumber - 1) / 10);
    // Alternate direction for snake pattern
    const isEvenRow = row % 2 === 0;
    const col = isEvenRow ? (tileNumber - 1) % 10 : 9 - ((tileNumber - 1) % 10);
    
    const isSpecial = !!specialTile;
    const isRevealed = specialTile?.revealed;
    
    let bgColor = 'bg-slate-800/50';
    let borderColor = 'border-slate-700';
    
    if (isSpecial && isRevealed) {
      if (specialTile.type === 'snake') {
        bgColor = 'bg-red-950/40';
        borderColor = 'border-red-900/50';
      } else if (specialTile.type === 'vine') {
        bgColor = 'bg-emerald-950/40';
        borderColor = 'border-emerald-900/50';
      } else if (specialTile.type === 'boon') {
        bgColor = 'bg-purple-950/40';
        borderColor = 'border-purple-900/50';
      } else if (specialTile.type === 'curse') {
        bgColor = 'bg-orange-950/40';
        borderColor = 'border-orange-900/50';
      }
    } else if (isSpecial) {
      bgColor = 'bg-slate-800/80';
      borderColor = 'border-slate-600';
    }
    
    if (tileNumber === 100) {
      bgColor = 'bg-gradient-to-br from-purple-900/50 to-pink-900/50';
      borderColor = 'border-purple-500';
    }
    
    return (
      <div
        key={tileNumber}
        className={`
          relative aspect-square border ${borderColor} ${bgColor}
          flex flex-col items-center justify-center
          transition-all duration-300
          ${isSpecial && !isRevealed ? 'shadow-[0_0_10px_rgba(139,92,246,0.3)]' : ''}
        `}
      >
        {/* Tile number */}
        <span className="text-xs text-slate-500 absolute top-1 left-1">
          {tileNumber}
        </span>
        
        {/* Special tile indicator (unrevealed) */}
        {isSpecial && !isRevealed && (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <AlertTriangle size={16} className="text-purple-400" />
          </div>
        )}
        
        {/* Special tile indicator (revealed) */}
        {isSpecial && isRevealed && (
          <div className="absolute top-1 right-1">
            {specialTile.type === 'snake' && <Skull size={12} className="text-red-400" />}
            {specialTile.type === 'vine' && <Sparkles size={12} className="text-emerald-400" />}
            {specialTile.type === 'boon' && <Zap size={12} className="text-purple-400" />}
            {specialTile.type === 'curse' && <AlertTriangle size={12} className="text-orange-400" />}
          </div>
        )}
        
        {/* Victory marker */}
        {tileNumber === 100 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles size={20} className="text-purple-400 opacity-50" />
          </div>
        )}
        
        {/* Players on this tile */}
        {playersOnTile.length > 0 && (
          <div className="flex gap-0.5 flex-wrap justify-center z-10">
            {playersOnTile.map(player => (
              <div
                key={player.id}
                className={`
                  w-4 h-4 rounded-full border-2 border-white
                  shadow-lg transition-transform
                  ${player.id - 1 === currentPlayerIndex ? 'scale-110 animate-pulse' : ''}
                `}
                style={{ backgroundColor: player.color }}
              />
            ))}
          </div>
        )}
        
        {/* Connection lines (drawn after revealing) */}
        {isSpecial && isRevealed && specialTile.from !== specialTile.to && (
          <svg className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 1 }}>
            <defs>
              <marker
                id={`arrow-${tileNumber}`}
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path
                  d="M0,0 L0,6 L9,3 z"
                  fill={specialTile.type === 'snake' ? '#ef4444' : '#10b981'}
                />
              </marker>
            </defs>
          </svg>
        )}
      </div>
    );
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
      <div className="grid grid-cols-10 gap-1">
        {/* Render tiles from 100 to 1 (top to bottom) */}
        {Array.from({ length: 10 }, (_, rowIndex) => {
          const row = 9 - rowIndex; // Start from row 9 (top)
          const isEvenRow = row % 2 === 0;
          
          return Array.from({ length: 10 }, (_, colIndex) => {
            const col = isEvenRow ? colIndex : 9 - colIndex;
            const tileNumber = row * 10 + col + 1;
            return renderTile(tileNumber);
          });
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <AlertTriangle size={14} className="text-purple-400" />
          <span>Mystery Tile</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-emerald-400" />
          <span>Vine</span>
        </div>
        <div className="flex items-center gap-2">
          <Skull size={14} className="text-red-400" />
          <span>Snake</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-purple-400" />
          <span>Boon</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle size={14} className="text-orange-400" />
          <span>Curse</span>
        </div>
      </div>
    </div>
  );
}
