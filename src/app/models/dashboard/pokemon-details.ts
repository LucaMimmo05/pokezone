export interface PokemonDetails {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  species: { url: string };
}
