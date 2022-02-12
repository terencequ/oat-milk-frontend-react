import {
  SpellCastingTimeRequest,
  SpellCastingTimeType
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import _ from "lodash";

/**
 * Return string representation of casting time.
 * @param castingTime
 */
export function getCastingTimeAsString(castingTime: SpellCastingTimeRequest | undefined) : string {
  if(!castingTime){
    return "N/A";
  }

  const {value, type} = castingTime;
  switch (type) {
    case SpellCastingTimeType.Special:
      return type;
    case SpellCastingTimeType.Unspecified:
      return type;
    default:
      return (value ?? 0) + " " + _.startCase(type);
  }
}
