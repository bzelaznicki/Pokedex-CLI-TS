import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    const pokemon = args[0];

    if (!pokemon) {
        console.log("You must provide the name of a Pokémon");
        return
    }

    if (state.pokedex[pokemon]){
        console.log(`You've already caught ${pokemon}!`);
        return;
    }

    const targetPokemon = await state.pokeapi.fetchPokemon(pokemon);

    if (!targetPokemon) {
        console.error(`Pokemon not found: ${pokemon}`);
        return;
    }

    console.log(`Throwing a Pokeball at ${pokemon}...`);

    let chance = 100 - targetPokemon.base_experience / 10;

    if (chance < 10) {
        chance = 10;
    } else if (chance > 90) {
        chance = 90;
    }

    const r = getRandomInt(0, 100);

    if (r < chance) {
        console.log(`${targetPokemon.name} was caught!`);
        state.pokedex[pokemon] = targetPokemon;
    } else {
        console.log(`${targetPokemon.name} escaped!`);
    }

}

function getRandomInt(min: number, max: number): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);    
}