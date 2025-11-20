import { NamedAPIResource } from "./named-api-resource";

export interface HeldItem {
  item: NamedAPIResource;
  version_details: {
    rarity: number;
    version: NamedAPIResource;
  }[];
}