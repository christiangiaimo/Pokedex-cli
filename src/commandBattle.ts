import { a } from "vitest/dist/chunks/suite.d.BJWk38HB";
import { State } from "./state";
import { get } from "node:http";

export async function commandBattle(
  state: State,
  pokemon1: string,
  pokemon2: string,
): Promise<void> {
  const pokemon1Data = await state.pokedex[pokemon1].stats;
  if (!pokemon1Data) {
    console.log("you have not caught that pokemon");
    return;
  }
  const pokemon2Data = await state.pokeAPI.fetchPokemon(pokemon2);
  let pokemon1Hp = getPokemonStatPokedex(state, pokemon1, "hp") ?? 50;
  let pokemon2Hp = (await getPokemonStatUrl(state, pokemon2, "hp")) ?? 50;
  const pokemon1Attack = getPokemonStatPokedex(state, pokemon1, "attack") ?? 30;
  const pokemon2Attack =
    (await getPokemonStatUrl(state, pokemon2, "attack")) ?? 30;
  const pokemon1Defense =
    getPokemonStatPokedex(state, pokemon1, "defense") ?? 10;
  const pokemon2Defense =
    (await getPokemonStatUrl(state, pokemon2, "defense")) ?? 10;

  console.log(`Initiating fight between ${pokemon1} and ${pokemon2}`);
  let turn = 0;
  let alive = true;
  while (pokemon1Hp && pokemon2Hp) {
    if (turn === 0) {
      console.log(`${pokemon1} attacking ${pokemon2}`);
      const dmg = Math.max(0, pokemon1Attack - pokemon2Defense);
      if (typeof dmg === "number") {
        console.log(`${pokemon2} took ${dmg} damage!`);
        pokemon2Hp -= dmg;
        if (pokemon2Hp <= 0) {
          console.log(`${pokemon2} fainted! ${pokemon1} wins!`);
          alive = false;
          break;
        } else {
          console.log(`${pokemon2} has ${pokemon2Hp} HP left.`);
        }
      }
      turn = 1;
    } else {
      console.log(`${pokemon2} attacking ${pokemon1}`);
      const dmg = Math.max(0, pokemon2Attack - pokemon1Defense);
      if (typeof dmg === "number") {
        console.log(`${pokemon1} took ${dmg} damage!`);
        pokemon1Hp -= dmg;
        if (pokemon1Hp <= 0) {
          console.log(`${pokemon1} fainted! ${pokemon2} wins!`);
          alive = false;
          break;
        } else {
          console.log(`${pokemon1} has ${pokemon1Hp} HP left.`);
        }
      }
      turn = 0;
      2;
    }
  }
}

async function getPokemonStatUrl(
  state: State,
  pokemon: string,
  stat: string,
): Promise<number | undefined> {
  const pokemonData = await state.pokeAPI.fetchPokemon(pokemon);
  for (const d of pokemonData.stats) {
    if (d.stat.name === stat) {
      return d.base_stat;
    }
  }
}

function getPokemonStatPokedex(
  state: State,
  pokemon: string,
  stat: string,
): number | undefined {
  const pokemonData = state.pokedex[pokemon].stats;
  for (const d of pokemonData) {
    if (d.stat.name === stat) {
      return d.base_stat;
    }
  }
}
