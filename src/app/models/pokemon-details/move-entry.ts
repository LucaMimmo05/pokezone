import { NamedAPIResource } from "./named-api-resource";
import { VersionGroupDetail } from "./version-group-detail";

export interface MoveEntry {
  move: NamedAPIResource;
  version_group_details: VersionGroupDetail[];
}