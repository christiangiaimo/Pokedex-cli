import {State} from "./state.js"


export async function commandMapB(state:State): Promise<void>{
    if (!state.prevLocationsURL) {
        console.log("you're on the first page");
        return
    }
    const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL || undefined);
    for (let i = 0; i < 20 && i < locations.results.length; i++) {
        console.log(locations.results[i].name)
    };
    state.nextLocationsURL = locations.next ?? "";
    state.prevLocationsURL = locations.previous ?? "";
    
}