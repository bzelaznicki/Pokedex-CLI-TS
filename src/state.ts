import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapb } from "./command_map.js";
import { PokeAPI } from "./pokeapi.js";
import { commandExplore } from "./command_explore.js";
export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
  };

  export type State = {
    interface: Interface,
    commands: Record<string, CLICommand>,
    pokeapi: PokeAPI,
    previousLocationURL: string | null,
    nextLocationURL: string | null,
    visitedFirstPage: boolean,
  }

  export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    const cmds: Record<string, CLICommand> = {
        exit: {
          name: "exit",
          description: "Exits the pokedex",
          callback: commandExit,
        },
        help: {
          name: "help",
          description: "Displays a help message",
          callback: commandHelp,
          
        },
        map: {
            name: "map",
            description: "Displays next 20 location areas",
            callback: commandMap,
          },
        mapb: {
            name: "mapb",
            description: "Displays previous 20 location areas",
            callback: commandMapb,
          },
        explore: {
            name: "explore <location>",
            description: "Explores a location, listing the available Pokémon. Usage: explore <location>.",
            callback: commandExplore,
        }
    };
    const pokeapi: PokeAPI = new PokeAPI();
    return { interface: rl, commands: cmds, pokeapi: pokeapi, previousLocationURL: null, nextLocationURL: null, visitedFirstPage: false };
  }