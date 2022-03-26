import {
  SpellCastingTimeRequest,
  SpellCastingTimeType, SpellComponentsRequest, SpellDurationRequest, SpellDurationType, SpellRangeRequest
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

  const {value, type, isRitual} = castingTime;
  let string = "";
  switch (type) {
    case SpellCastingTimeType.Special:
    case SpellCastingTimeType.Unspecified:
      string = type;
      break;
    default:
      string = (value ?? 0) + " " + _.startCase(type);
      break;
  }
  if(isRitual){
    string += " (ritual)";
  }
  return string;
}

/**
 * Return string representation of range.
 * @param range
 */
export function getRangeAsString(range: SpellRangeRequest | undefined) : string {
  if(!range){
    return "N/A";
  }

  const {targetValue, targetType, effectValue, effectType} = range;
  return  `${_.startCase(targetType)} (${targetValue}ft), ${_.startCase(effectType)} (${effectValue}ft)`;
}

/**
 * Return string representation of duration.
 * @param duration
 */
export function getDurationAsString(duration: SpellDurationRequest | undefined) : string {
  if(!duration){
    return "N/A";
  }

  const {value, type} = duration;
  let string = "";
  switch (type) {
    case SpellDurationType.Special:
    case SpellDurationType.Unspecified:
    case SpellDurationType.Instantaneous:
    case SpellDurationType.UntilDispelled:
    case SpellDurationType.UntilDispelledOrTriggered:
      string = type;
      break;
    default:
      string = (value ?? 0) + " " + _.startCase(type);
      break;
  }
  return string;
}

/**
 * Return string representation of components.
 * @param components
 */
export function getComponentsAsString(components: SpellComponentsRequest | undefined) : string {
  if(!components){
    return "N/A";
  }

  const {verbal, somatic, material} = components;
  let string = `${verbal ? "V" : ""}${somatic ? "S" : ""}${material ? "M" : ""}`;
  return string.split('').join(' ') // Put spaces between each letter
}
