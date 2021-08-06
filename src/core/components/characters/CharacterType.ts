

export interface Id {
  id: string;
}

export interface NameId extends Id {
  name: string;
}

export interface NameValueId extends NameId {
  value: number;
}


export interface CharacterLevel {
  level: number;
  exp: number;
  lastLevelRequirement: number;
  nextLevelRequirement: number;
}


export interface CharacterClass extends NameId {

}


export interface CharacterProficiency extends NameId {
  proficient: boolean;
  expertise: boolean;
}

export interface CharacterStats extends NameValueId {
  skills: CharacterProficiency[];
  savingProficient: boolean;
  savingExpertise: boolean;
}

export interface CharacterRace extends NameId {

}


export interface CharacterDescription extends Id {
  appearance: string;
  personality: string;
  ideals: string;
  bonds: string;
  flaws: string;
  backstory: string;
  alliesAndOrganisations: string;
}


export interface GeneralProficiency extends CharacterProficiency {
  group: Id;
}


export interface ItemGroups extends NameId {}


export interface Item extends NameValueId {
  description: string;
  weight: number;
  group: Id;
}

export interface ResourceItem extends Item {
  uses: number;
}


export interface CharacterCurrency extends NameId {
  copper: number;
  silver: number;
  electrum: number;
  gold: number;
  platinum: number;
}


export interface CharacterInventory extends NameId {
  wealth: CharacterCurrency;
  items: Item[];
}



export interface Character extends NameId {
  levelExpInfo: CharacterLevel;
  races: CharacterRace[];
  classes: CharacterClass[];
  stats: CharacterStats[];
  descriptions: CharacterDescription;
  otherProficiencies: GeneralProficiency[];
  inventory: CharacterInventory;
}