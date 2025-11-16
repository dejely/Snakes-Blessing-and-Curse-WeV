import { useState } from 'react';

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