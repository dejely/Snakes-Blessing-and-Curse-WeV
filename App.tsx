import { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { DiceRoller } from './components/DiceRoller';
import { GameInfo } from './components/GameInfo';
import { TileEffect } from './components/TileEffect';

export interface Player {
  id: number;
  name: string;
  position: number;
  color: string;
}

export interface SpecialTile {
  from: number;
  to: number;
  type: 'snake' | 'vine' | 'curse' | 'boon';
  description: string;
  revealed: boolean;
}

export default function App() {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'Explorer 1', position: 0, color: '#8b5cf6' },
    { id: 2, name: 'Explorer 2', position: 0, color: '#ef4444' },
  ]);
  
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);
  const [lastEffect, setLastEffect] = useState<SpecialTile | null>(null);
  const [showEffect, setShowEffect] = useState(false);

  // Special tiles with ambiguous appearances and effects
  const [specialTiles] = useState<SpecialTile[]>([
    { from: 4, to: 14, type: 'vine', description: 'Ancient vines lift you upward!', revealed: false },
    { from: 9, to: 31, type: 'vine', description: 'Mysterious tendrils carry you forth!', revealed: false },
    { from: 20, to: 42, type: 'vine', description: 'A boon disguised as peril!', revealed: false },
    { from: 28, to: 84, type: 'vine', description: 'The shadows guide you higher!', revealed: false },
    { from: 40, to: 59, type: 'vine', description: 'Twisted roots propel you forward!', revealed: false },
    { from: 51, to: 67, type: 'vine', description: 'Ethereal vines ascend!', revealed: false },
    { from: 63, to: 81, type: 'vine', description: 'Limbo\'s grace aids your journey!', revealed: false },
    { from: 71, to: 91, type: 'vine', description: 'Final ascension through the mist!', revealed: false },
    
    { from: 17, to: 7, type: 'snake', description: 'Serpent\'s bite drags you down!', revealed: false },
    { from: 54, to: 34, type: 'snake', description: 'The abyss pulls you back!', revealed: false },
    { from: 62, to: 19, type: 'snake', description: 'Cursed serpent strikes!', revealed: false },
    { from: 64, to: 60, type: 'snake', description: 'A cruel twist of fate!', revealed: false },
    { from: 87, to: 36, type: 'snake', description: 'Doom lurks near the end!', revealed: false },
    { from: 93, to: 73, type: 'snake', description: 'So close, yet so far!', revealed: false },
    { from: 95, to: 75, type: 'snake', description: 'Victory snatched away!', revealed: false },
    { from: 98, to: 78, type: 'snake', description: 'The final test of will!', revealed: false },

    { from: 13, to: 13, type: 'boon', description: 'Roll again! The spirits favor you!', revealed: false },
    { from: 26, to: 26, type: 'boon', description: 'Immunity granted for one turn!', revealed: false },
    { from: 45, to: 45, type: 'boon', description: 'Skip ahead 3 spaces!', revealed: false },
    
    { from: 32, to: 32, type: 'curse', description: 'Frozen in time! Skip next turn!', revealed: false },
    { from: 48, to: 48, type: 'curse', description: 'The void whispers... go back 5 spaces!', revealed: false },
    { from: 76, to: 76, type: 'curse', description: 'Limbo\'s grip tightens! Lose a turn!', revealed: false },
  ]);

  const handleRollDice = () => {
    if (isRolling || winner) return;
    
    if (!gameStarted) setGameStarted(true);
    
    setIsRolling(true);
    setDiceValue(null);
    
    // Animate dice rolling
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
    }, 100);
    
    setTimeout(() => {
      clearInterval(rollInterval);
      const finalValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(finalValue);
      setIsRolling(false);
      movePlayer(finalValue);
    }, 1000);
  };

  const movePlayer = (steps: number) => {
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers];
      const currentPlayer = newPlayers[currentPlayerIndex];
      let newPosition = currentPlayer.position + steps;
      
      // Check if player reaches or exceeds 100
      if (newPosition >= 100) {
        newPosition = 100;
        currentPlayer.position = newPosition;
        setWinner(currentPlayer);
        return newPlayers;
      }
      
      currentPlayer.position = newPosition;
      
      // Check for special tiles
      setTimeout(() => {
        const specialTile = specialTiles.find(tile => tile.from === newPosition);
        if (specialTile) {
          specialTile.revealed = true;
          setLastEffect(specialTile);
          setShowEffect(true);
          
          setTimeout(() => {
            setPlayers(p => {
              const updated = [...p];
              updated[currentPlayerIndex].position = specialTile.to;
              
              // Check if reached 100 after special tile
              if (specialTile.to >= 100) {
                updated[currentPlayerIndex].position = 100;
                setWinner(updated[currentPlayerIndex]);
              }
              
              return updated;
            });
            
            setTimeout(() => {
              setShowEffect(false);
              nextTurn();
            }, 2000);
          }, 1500);
        } else {
          setTimeout(() => nextTurn(), 1000);
        }
      }, 500);
      
      return newPlayers;
    });
  };

  const nextTurn = () => {
    if (winner) return;
    setCurrentPlayerIndex(prev => (prev + 1) % players.length);
    setDiceValue(null);
  };

  const resetGame = () => {
    setPlayers(prev => prev.map(p => ({ ...p, position: 0 })));
    setCurrentPlayerIndex(0);
    setDiceValue(null);
    setGameStarted(false);
    setWinner(null);
    setLastEffect(null);
    setShowEffect(false);
    specialTiles.forEach(tile => tile.revealed = false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-purple-400 mb-2 tracking-wider">LIMBO'S CHALLENGE</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Traverse the wretched underworld where vines and serpents blur, 
            and mysterious forces shape your fate with every roll...
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          <div className="space-y-6">
            <GameBoard 
              players={players} 
              specialTiles={specialTiles}
              currentPlayerIndex={currentPlayerIndex}
            />
          </div>

          <div className="space-y-6">
            <GameInfo 
              players={players}
              currentPlayerIndex={currentPlayerIndex}
              winner={winner}
              gameStarted={gameStarted}
            />
            
            <DiceRoller
              diceValue={diceValue}
              isRolling={isRolling}
              onRoll={handleRollDice}
              disabled={isRolling || !!winner}
              currentPlayer={players[currentPlayerIndex]}
            />

            {winner && (
              <button
                onClick={resetGame}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                Play Again
              </button>
            )}
          </div>
        </div>
      </div>

      {showEffect && lastEffect && (
        <TileEffect effect={lastEffect} />
      )}
    </div>
  );
}
