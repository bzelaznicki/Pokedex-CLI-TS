import * as readline from 'node:readline';
import * as cliCommands from "./cli_commands.js";
export function cleanInput(input: string): string[] {
    const result = input.trim().toLowerCase().split(/\s+/).filter(word => word !== '');
    return result;
  }

export function startREPL() {

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
});
    rl.prompt();
    rl.on('line', (line: string) => {
        const cleanedInput = cleanInput(line);

        if (cleanedInput.length === 0){
            rl.prompt();
            return;
        }

        const registry = cliCommands.getCommands();
        const command = cleanedInput[0];
        if (!registry[command]) {
            console.log("Unknown command");
            rl.prompt();
            return;
        }

        registry[command].callback(registry);
        if (command !== "exit"){
            rl.prompt();
        }
    })

}