export type CharacterDenseType = {
  name: string;
  level: number;
  exp: number;
  levelUpExpRequirement: number;
  classImage: string[];
  alive: boolean;
  id: number;
};

export type CharacterInfoBasicProp = {
  character: CharacterDenseType;
};