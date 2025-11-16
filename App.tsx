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
            name: String,
            position: 0,
            color: '#8b5cf6'
        },
        {id: 2,
            name: String,
            position: 0,
            color: '#ef4444'
        },
    ]);
}

const [currentPlayerINdex, setCurrentPlayerIndex] = useState(0);
const [diceValue, setDiceValue] = useState<number | null>(null);
const [isRolling, setisRolling] = useState(false);
const [gameStarted, setGameStarted] = useState(false);
const [winner, setWinner] = useState<Player |null>(null);
