import { State } from "./state";

export async function commandCatch(
  state: State,
  pokemon: string,
): Promise<void> {
  const pokemonData = await state.pokeAPI.fetchPokemon(pokemon);
  const pokemonExperience = pokemonData.base_experience;
  const catchingProbability = 100 / pokemonExperience;
  const randomNumber: number = Math.random();
  console.log(`Throwing a Pokeball at ${pokemon}...`);

  if (randomNumber > catchingProbability) {
    console.log(`${pokemon} escaped!`);
    return;
  }
  if (randomNumber <= catchingProbability) {
    console.log(`${pokemon} was caught!`);
    state.pokedex[pokemon] = pokemonData;
    return;
  }
}
