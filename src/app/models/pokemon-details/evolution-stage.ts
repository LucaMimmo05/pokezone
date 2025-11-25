import { EvolutionSpecies } from "./evolution-species";

export interface EvolutionStage {
    species: EvolutionSpecies;
    evolves_to: EvolutionStage[];
}
