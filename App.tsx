import { useState } from 'react'; //useState for tuple assignment like {Dice, setDice}

// TODO: Table UI and use-mobile UI

export interface Player{

    //OOP  -> equivalent to this.*variable_name* in java


    id: number;
    name: string;
    position: number;
    color: string;
}

export interface SpecialTile{
    from: number;
    to: number;
    type: 'snake' | 'vine' | 'curse' | 'boon';
    description: string;
    revealed: boolean;
}

export default function App(){
    const [players, setPlayers] = useState<Player[]>([
        {id : 1,
            name: "",
            position: 0,
            color: '#8b5cf6'
        },
        {id: 2,
            name: "",
            position: 0,
            color: '#ef4444'
        },
    ]);
}

//Set consts 
const [currentPlayerINdex, setCurrentPlayerIndex] = useState(0);
const [diceValue, setDiceValue] = useState<number | null>(null);
const [isRolling, setIsRolling] = useState(false);
const [gameStarted, setGameStarted] = useState(false);
const [winner, setWinner] = useState<Player |null>(null);
const [lastEffect, setLastEffect] = useState<SpecialTile  | null>(null);
const [showEffect, setShowEffect] = useState(false);

const [SpecialTiles] = useState<SpecialTile[]>([
    //Manually add tiles(vine,snake,boon,curse)?
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

const handleRollDice = () => { //Map func to algo
    if (isRolling || winner) return;

    if (!gameStarted) setGameStarted(true);
    setIsRolling(true);
    setDiceValue(null);

    //Animation for dice rolling
    const rollInterval = setInterval(() =>{
    setDiceValue(Math.floor(Math.random() * 6) + 1);
    }, 100);

    setTimeout(() => {
        clearInterval(rollInterval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalValue);
        setIsRolling(false);
        movePlayer(finalValue);
    });

    const movePlayer = (steps: number) => {
        setPlayers(prevPlayers => {
            const newPlayers = [...prevPlayers];
            const currentPlayer = newPlayers[currentPlayerINdex];
            let newPosition = currentPlayer.position + steps;

            //check if player reaches or exceed 100
            if (newPosition >= 100){
                newPosition = 100;
                currentPlayer.position = newPosition;
                setWinner(currentPlayer);
                return newPlayers;
            }

            currentPlayer.position = newPosition;

            //Check for special tiles

            
        })
    }

    

}