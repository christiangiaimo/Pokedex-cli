import { commandExit } from "./commandExit.js";
import { commandHelp } from "./commandHelp.js";
import { type State, CLICommand } from "./state.js";
import { commandMap } from "./commandMap.js";
import { commandMapB } from "./commandMapB.js";
import { commandExplore } from "./commandExplore.js";
import { commandCatch } from "./commandCatch.js";
import { commandInspect } from "./commandInspect.js";
import { commandPokedex } from "./pokedex.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: async (state: State) => {
        commandExit(state);
      },
    },

    help: {
      name: "help",
      description: "DIsplays a help message",
      callback: async (state: State) => {
        commandHelp(state);
      },
    },
    map: {
      name: "map",
      description:
        "Displays 20 locations of the area, if you hit map again it will display the next 20 locations and so on.",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description:
        "Displays 20 previus locations of the area, if you hit map again it will display the next 20 locations and so on.",
      callback: commandMapB,
    },
    explore: {
      name: "explore",
      description: "Displays the Pokemon's in the area",
      callback: commandExplore,
    },

    catch: {
      name: "catch",
      description: "Catch a Pokemon and add it to the Pokedex",
      callback: commandCatch,
    },

    inspect: {
      name: "inspect",
      description: "prints decription of the Pokemon",
      callback: async (state: State, pokemon: string) => {
        commandInspect(state, pokemon);
      },
    },

    pokedex: {
      name: "pokedex",
      description: "Prints all the pokemon's name catched in your pokedex",
      callback: async (state: State) => {
        commandPokedex(state);
      },
    },
  };
}
