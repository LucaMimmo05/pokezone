import { NamedAPIResource } from "./named-api-resource";

export interface AbilityEntry {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}