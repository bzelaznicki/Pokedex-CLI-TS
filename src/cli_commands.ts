import { commandExit } from "./command_exit.js"; 

export type CLICommand = {
    name: string;
    description: string;
    callback: (commands: Record<string, CLICommand>) => void;
  };

  export function getCommands(): Record<string, CLICommand> {
    return {
      exit: {
        name: "exit",
        description: "Exits the pokedex",
        callback: commandExit,
      },
      help: {
        name: "help",
        description: "Displays a help message",
        callback: commandHelp,
      }
    };
  }

  export function commandHelp(commands: Record<string,CLICommand>) {
    console.log();
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    console.log();
    for (const command of Object.values(commands)){
    console.log(`${command.name}: ${command.description}`);
    }
  }