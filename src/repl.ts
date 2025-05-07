import * as state from "./state.js"
export function cleanInput(input: string): string[] {
    const result = input.trim().toLowerCase().split(/\s+/).filter(word => word !== '');
    return result;
  }

export function startREPL() {

    const st = state.initState()
    st.interface.prompt();
    st.interface.on('line', async (line: string) => {
        const cleanedInput = cleanInput(line);

        if (cleanedInput.length === 0){
            st.interface.prompt();
            return;
        }

        const registry = st.commands;
        const command = cleanedInput[0];
        if (!registry[command]) {
            console.log("Unknown command");
            st.interface.prompt();
            return;
        }

        await registry[command].callback(st);
        if (command !== "exit"){
            st.interface.prompt();
        }
    })

}