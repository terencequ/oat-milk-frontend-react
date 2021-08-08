import {NameId} from "../../characters/models/CharacterType";



export interface ModifierType extends NameId {
  type: "additive" | "multiplicative"
}

export interface EffectModifier extends NameId {
  value: number;
  type: ModifierType;
}

export interface SpecificEffectModifier extends EffectModifier {
  slot: number;
}


export interface Effect extends NameId {
  description: string;
  numberOfTargets: number;
  slots: number;
  modifiers: SpecificEffectModifier[];
  onHit: Effect[];
  onMiss: Effect[];
}

export interface Attack extends Effect {}

