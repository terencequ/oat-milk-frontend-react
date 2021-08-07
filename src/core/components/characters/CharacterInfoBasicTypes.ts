import {CSSProperties} from "react";
import {CharacterSummaryResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk/dist/api";

export type CharacterDenseType = {
  name: string;
  level: number;
  exp: number;
  lastExpRequirement: number;
  nextExpRequirement: number;
  classImage: string[];
  alive: boolean;
  id: string;
};

export type CharacterInfoBasicProp = {
  denseCharacter: CharacterSummaryResponse;
  style?: CSSProperties;
};