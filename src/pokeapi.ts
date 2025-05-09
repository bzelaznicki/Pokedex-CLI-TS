import { Cache, CacheEntry } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    private cache: Cache; 

    constructor() {
      this.cache = new Cache(60000);
    }
  
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
      const requestUrl = `${pageURL ? pageURL : PokeAPI.baseURL + "/location-area?limit=20"}`
      const cachedLocations = this.cache.get<ShallowLocations>(requestUrl)

      if (cachedLocations) {
        return cachedLocations;
      }
      const response = await fetch(requestUrl);
      if (!response.ok) {
        throw new Error(`Error fetching locations: ${response.statusText}`);
      }
      const data: ShallowLocations = await response.json();

      this.cache.add(requestUrl, data);
      return data;
    }
  
    async fetchLocation(locationName: string): Promise<Location> {
      const requestUrl = `${PokeAPI.baseURL}/location-area/${locationName}`
      const cachedLocation = this.cache.get<Location>(requestUrl)

      if (cachedLocation) {
        return cachedLocation;
      }
    const response = await fetch(requestUrl);
    if (!response.ok) {
      throw new Error(`Error fetching location: ${response.statusText}`);
    }
    const data: Location = await response.json();
    this.cache.add(requestUrl, data);
    return data;     
  }
}
  
  export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
      name: string;
      url: string;
    }[];
  };
  
  export type Location = {
    encounter_method_rates: {
      encounter_method: {
        name: string;
        url: string;
      };
      version_details: {
        rate: number;
        version: {
          name: string;
          url: string;
        };
      }[];
    }[];
    game_index: number;
    id: number;
    location: {
      name: string;
      url: string;
    };
    name: string;
    names: {
      language: {
        name: string;
        url: string;
      };
      name: string;
    }[];
    pokemon_encounters: {
      pokemon: {
        name: string;
        url: string;
      };
      version_details: {
        encounter_details: {
          chance: number;
          condition_values: any[];
          max_level: number;
          method: {
            name: string;
            url: string;
          };
          min_level: number;
        }[];
        max_chance: number;
        version: {
          name: string;
          url: string;
        };
      }[];
    }[];
  };