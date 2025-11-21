export interface DashboardStats {
  totalPokemon: number;
  totalTypes: number;
  pokemonByType: { [key: string]: number };
  pokemonByColor: { [key: string]: number };
  pokemonByShape: { [key: string]: number };
}
