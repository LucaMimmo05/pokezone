import { AbilityEntry } from "./ability-entry";
import { HeldItem } from "./held-item";
import { NamedAPIResource } from "./named-api-resource";
import { PastType } from "./past-type";
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
}
