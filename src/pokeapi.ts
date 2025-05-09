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

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const requestUrl = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    const cachedPokemon = this.cache.get<Pokemon>(requestUrl);

    if (cachedPokemon){
      return cachedPokemon;
    }
    const response = await fetch(requestUrl);
    if (!response.ok) {
      throw new Error(`Error fetching pokemon: ${response.statusText}`);
    }
    const data: Pokemon = await response.json();
    this.cache.add(requestUrl, data);
    return data;
  }
}

export type Pokemon = {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      order?: number;
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
  name: string;
  order: number;
  past_abilities: {
    abilities: {
      ability: any;
      is_hidden: boolean;
      slot: number;
    }[];
    generation: {
      name: string;
      url: string;
    };
  }[];
  past_types: any[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: any;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
    other: {
      dream_world: {
        front_default: string;
        front_female: any;
      };
      home: {
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_female: any;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
      showdown: {
        back_default: string;
        back_female: any;
        back_shiny: string;
        back_shiny_female: any;
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_female: any;
      };
    };
    versions: {
      "generation-i": {
        "red-blue": {
          back_default: string;
          back_gray: string;
          back_transparent: string;
          front_default: string;
          front_gray: string;
          front_transparent: string;
        };
        yellow: {
          back_default: string;
          back_gray: string;
          back_transparent: string;
          front_default: string;
          front_gray: string;
          front_transparent: string;
        };
      };
      "generation-ii": {
        crystal: {
          back_default: string;
          back_shiny: string;
          back_shiny_transparent: string;
          back_transparent: string;
          front_default: string;
          front_shiny: string;
          front_shiny_transparent: string;
          front_transparent: string;
        };
        gold: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
          front_transparent: string;
        };
        silver: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
          front_transparent: string;
        };
      };
      "generation-iii": {
        emerald: {
          front_default: string;
          front_shiny: string;
        };
        "firered-leafgreen": {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
        "ruby-sapphire": {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
      };
      "generation-iv": {
        "diamond-pearl": {
          back_default: string;
          back_female: any;
          back_shiny: string;
          back_shiny_female: any;
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
        "heartgold-soulsilver": {
          back_default: string;
          back_female: any;
          back_shiny: string;
          back_shiny_female: any;
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
        platinum: {
          back_default: string;
          back_female: any;
          back_shiny: string;
          back_shiny_female: any;
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
      };
      "generation-v": {
        "black-white": {
          animated: {
            back_default: string;
            back_female: any;
            back_shiny: string;
            back_shiny_female: any;
            front_default: string;
            front_female: any;
            front_shiny: string;
            front_shiny_female: any;
          };
          back_default: string;
          back_female: any;
          back_shiny: string;
          back_shiny_female: any;
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
      };
      "generation-vi": {
        "omegaruby-alphasapphire": {
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
        "x-y": {
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
      };
      "generation-vii": {
        icons: {
          front_default: string;
          front_female: any;
        };
        "ultra-sun-ultra-moon": {
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
      };
      "generation-viii": {
        icons: {
          front_default: string;
          front_female: any;
        };
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
};
  
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