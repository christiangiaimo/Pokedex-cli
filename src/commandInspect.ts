import { State } from "./state";

export function commandInspect(state: State, pokemon: string) {
  if (!state.pokedex[pokemon]) {
    console.log("you have not caught that pokemon");
    return;
  }
  const pokemonData = state.pokedex[pokemon];
  console.log(`name: ${pokemonData.name}`);
  console.log(`height: ${pokemonData.height}`);
  console.log(`weight: ${pokemonData.weight}`);
  console.log("Stats:");
  const stats = pokemonData.stats;
  for (const i of stats) {
    const statName: String = i.stat.name;
    const stat: Number = i.base_stat;
    console.log(`   -${statName}: ${stat}`);
  }
  console.log("Types:");
  const types = pokemonData.types;
  for (const t of types) {
    console.log(`   -${t.type.name}`);
  }
}
