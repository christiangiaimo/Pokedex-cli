import { State } from "./state";

export function commandPokedex(state: State) {
  console.log("Your Pokedex:");
  for (const pokemon of Object.keys(state.pokedex)) {
    console.log(`   -${pokemon}`);
  }
}
