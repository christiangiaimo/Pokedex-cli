export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2/location-area";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    try {
        const url = pageURL || PokeAPI.baseURL
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error (`Response status: ${response.status}`)
        }
        const result = await response.json();
        return result

    } catch (error) {
        if (error instanceof Error) {        
        console.log(error.message);
        }
        throw error;
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    try{
    const url = `${PokeAPI.baseURL}/${locationName}`
    const response = await fetch(url);
    if(!response.ok) {
        throw new Error (`Response status: ${response.status}`)
    }
    const result = (await response.json()) as Location;
    return result
  } catch (error) {
        if (error instanceof Error) {        
        console.log(error.message);
        }
        throw error;
    }
    }
}

export type ShallowLocations = {
  count : number,
  next : string | null,
  previous: string | null,
  results: ShalloLocationsResult[]
};

export type ShalloLocationsResult = {
    name:string,
    url:string
}

export type NameUrl = {
    name: string,
    url: string
}

export type Location = {
  id: number,
  name: string,
  game_index: number,
  encounter_method_rates: {
    encounter_method:NameUrl,
    version_details:{
        rate:number,
        version:NameUrl
    }[]
  }[],
  location:NameUrl,
  names:{
    name:string,
    language:NameUrl
  }[],
  pokemon_encounters:{
    pokemon:NameUrl;
    version_details:{
        version:NameUrl;
        max_chance: number;
        encounter_details:{
            min_level:number,
            max_level: number,
            condition_values:NameUrl[],
            chance:number,
            method:NameUrl
        }[];
    }[];
 }[];
}