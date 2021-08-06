import {CSSProperties} from "react";

export type CharacterDenseType = {
  name: string;
  level: number;
  exp: number;
  lastExpRequirement: number;
  nextExpRequirement: number;
  classImage: string[];
  alive: boolean;
  id: number;
};

export type CharacterInfoBasicProp = {
  chctr: CharacterDenseType;
  style?: CSSProperties;
};