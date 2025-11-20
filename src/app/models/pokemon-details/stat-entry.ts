import { NamedAPIResource } from "./named-api-resource";

export interface StatEntry {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}