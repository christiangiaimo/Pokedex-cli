import {State} from "./state.js"


export async function commandMap(state:State): Promise<void>{
    const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL || undefined);
    for (let i = 0; i < 20 && i < locations.results.length; i++) {
        console.log(locations.results[i].name)
    };
    state.nextLocationsURL = locations.next ?? "";
    state.prevLocationsURL = locations.previous ?? ""
    
}