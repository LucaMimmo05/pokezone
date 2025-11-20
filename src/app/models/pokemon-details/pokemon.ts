import { AbilityEntry } from "./ability-entry";
import { HeldItem } from "./held-item";
import { NamedAPIResource } from "./named-api-resource";
import { PastType } from "./past-type";
import { GameIndex } from "./game-index";
import { HeldItem } from "./held-item";
import { MoveEntry } from "./move-entry";
import { NamedAPIResource } from "./named-api-resource";
import { PastType } from "./past-type";
import { SpriteSet } from "./sprite-set";
import { StatEntry } from "./stat-entry";
import { TypeEntry } from "./type-entry";

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  order: number;
  is_default: boolean;

  abilities: AbilityEntry[];
  
  forms: NamedAPIResource[];
  
  species: NamedAPIResource; 
  
  sprites: SpriteSet;

  cries: {
    latest: string;
    legacy: string;
  };

  forms: NamedAPIResource[];

  types: TypeEntry[];

  held_items: HeldItem[];

  location_area_encounters: string;

  species: NamedAPIResource;
  
  past_types: PastType[];
  game_indices: GameIndex[];
  
  held_items: HeldItem[];
  
  location_area_encounters: string;
  
  moves: MoveEntry[];
  
  past_types: PastType[];
  
  stats: StatEntry[];

  types: TypeEntry[];
}
