import { commandExit } from './commandExit.js'
import { commandHelp } from './commandHelp.js';
import { CLICommand } from './state.js';




export function getCommands(): Record<string, CLICommand> {
    return {
        exit:{
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit
        },

        help:{
            name:"help",
            description:"DIsplays a help message",
            callback: commandHelp
        }

    }
    
}