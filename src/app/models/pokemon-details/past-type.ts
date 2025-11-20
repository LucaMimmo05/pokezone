import { NamedAPIResource } from "./named-api-resource";
import { TypeEntry } from "./type-entry";

export interface PastType {
  generation: NamedAPIResource;
  types: TypeEntry[];
}