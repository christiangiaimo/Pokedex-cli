import { commandExit } from './commandExit.js'
import { commandHelp } from './commandHelp.js';
import { type State, CLICommand } from './state.js';
import { PokeAPI } from './pokeapi.js';
import { commandMap } from './commandMap.js';
import { commandMapB } from './commandMapB.js';





export function getCommands(): Record<string, CLICommand> {
    return {
        exit:{
            name: "exit",
            description: "Exits the pokedex",
            callback: async (state:State) => {
                commandExit(state);
                }
        },

        help:{
            name:"help",
            description:"DIsplays a help message",
            callback: async (state:State) => {
                commandHelp(state)
        }
    },
        map:{
            name:"map",
            description:"Displays 20 locations of the area, if you hit map again it will display the next 20 locations and so on.",
            callback: commandMap

    },
        mapb:{
            name:"mapb",
            description:"Displays 20 previus locations of the area, if you hit map again it will display the next 20 locations and so on.",
            callback: commandMapB
    }
    }
}