import * as readline from 'node:readline';
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
        console.log(`Your command was: ${cleanedInput[0]}`);
        rl.prompt();
    })

}