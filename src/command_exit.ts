export async function commandExit(): Promise<void>{
    console.log("Closing the Pokedex... Goodbye!");
    process.exit(0);
};