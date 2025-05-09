import { State } from "./state.js";

export async function commandPokedex(state: State) {
    if (Object.keys(state.pokedex).length === 0) {
        console.log("Your pokedex is empty! Try catching some pokemon first");
        return;
    }
    
    console.log(`Your Pokédex:`);

    for (const pokemon of Object.values(state.pokedex)){
        console.log(` - ${pokemon.name}`);
    }

}