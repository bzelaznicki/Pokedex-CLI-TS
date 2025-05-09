import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void>{
    const locationName = args[0];
    if (!locationName) {
        console.log(`You must provide a location.`);
        return;
    }
    try {
        const location = await state.pokeapi.fetchLocation(locationName);

        console.log(`Exploring ${location.name}...`);
        console.log(`Found Pokemon:`);

        for (const pokemon of location.pokemon_encounters){
            console.log(`- ${pokemon.pokemon.name}`);
        }

    } catch (error) {
        console.error(`Location not found: ${locationName}`);
        console.error(`Error message: ${error}`)
    }
}