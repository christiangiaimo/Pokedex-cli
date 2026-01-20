import { State } from "./state";

export async function commandExplore(
  state: State,
  location: string,
): Promise<void> {
  const locations = await state.pokeAPI.fetchLocation(location);
  const PokemonList = locations.pokemon_encounters;
  console.log(`Exploring ${location}...`);
  console.log("Found Pokemons:");
  for (const pokemon of PokemonList) {
    const pokemonName: string = pokemon.pokemon.name;
    console.log(pokemonName);
  }
}
