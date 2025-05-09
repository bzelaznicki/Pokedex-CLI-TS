import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    const pokemon = args[0];

    if (!pokemon) {
        console.log("You must provide the name of a Pokémon");
        return;
    }

    if (!state.pokedex[pokemon]){
        console.log(`You have not caught ${pokemon} yet. Try catching it first!`);
        return;
    }

    const pokemonInfo = state.pokedex[pokemon];

    console.log(`Name: ${pokemonInfo.name}`);
    console.log(`Height: ${pokemonInfo.height}`);
    console.log(`Weight: ${pokemonInfo.weight}`);
    console.log(`Stats:`);
    for (const stat of pokemonInfo.stats) {
        console.log(` -${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log(`Types:`);
    for (const type of pokemonInfo.types) {
        console.log(` - ${type.type.name}`);
    }

    console.log(`Moves:`);
    for (const move of pokemonInfo.moves) {
        console.log(` - ${move.move.name}`);
    }
}