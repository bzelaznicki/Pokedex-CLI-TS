import { State } from "./state.js";



export async function commandMap(state: State): Promise<void>{

    try {
        const locations = await state.pokeapi.fetchLocations(state.nextLocationURL? state.nextLocationURL : undefined);

        state.nextLocationURL = locations.next;
        state.previousLocationURL = locations.previous;

        console.log("20 locations:");

        locations.results.forEach(location => {
            console.log(`${location.name}`)
        })
    if (locations.next === null) {
        console.log("You're on the last page.");

    }
    
    } catch {
        console.error("Error fetching locations");
    }
}

export async function commandMapb(state: State): Promise<void>{

    try {
    const locations = await state.pokeapi.fetchLocations(state.previousLocationURL? state.previousLocationURL : undefined)

    state.nextLocationURL = locations.next;
    state.previousLocationURL = locations.previous;

    
    console.log("20 locations:");

    locations.results.forEach(location => {
        console.log(`${location.name}`)
    }) 
    if (locations.previous == null){
        console.log("You're on the first page.");
    }  
} catch {
    console.error("Error fetching locations"); 
}
}