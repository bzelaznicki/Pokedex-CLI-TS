export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
  
    constructor() {}
  
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
      const response = await fetch(`${pageURL ? pageURL : PokeAPI.baseURL + "/location-area?limit=20"}`);
      if (!response.ok) {
        throw new Error(`Error fetching locations: ${response.statusText}`);
      }
      const data: ShallowLocations = await response.json();
      return data;
    }
  
    async fetchLocation(locationName: string): Promise<Location> {
    const response = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`);
    if (!response.ok) {
      throw new Error(`Error fetching location: ${response.statusText}`);
    }
    const data: Location = await response.json();
    return data;     
  }
}
  
  export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{
      name: string;
      url: string;
    }>;
  };
  
  export type Location = {
    id: number;
    name: string;
    region: {
      name: string;
      url: string;
    };
    areas: Array<{
      name: string;
      url: string;
    }>;
  };