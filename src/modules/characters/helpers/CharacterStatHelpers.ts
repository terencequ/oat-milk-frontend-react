import {
    CharacterAttributeRequest,
    CharacterAttributeResponse,
    CharacterLevelResponse
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {parseInt} from "lodash";
import {isWhitespaceOnly} from "./TextHelpers";

const MinLevel = 1;
const MaxLevel = 20;

interface LevelDefinition {
    level: number;
    experienceRequirement: number;
}

export const levels: LevelDefinition[] = [
    {level: 1, experienceRequirement: 0},
    {level: 2, experienceRequirement: 300},
    {level: 3, experienceRequirement: 900},
    {level: 4, experienceRequirement: 2700},
    {level: 5, experienceRequirement: 6500},
    {level: 6, experienceRequirement: 14000},
    {level: 7, experienceRequirement: 23000},
    {level: 8, experienceRequirement: 34000},
    {level: 9, experienceRequirement: 48000},
    {level: 10, experienceRequirement: 64000},
    {level: 11, experienceRequirement: 85000},
    {level: 12, experienceRequirement: 100000},
    {level: 13, experienceRequirement: 120000},
    {level: 14, experienceRequirement: 140000},
    {level: 15, experienceRequirement: 165000},
    {level: 16, experienceRequirement: 195000},
    {level: 17, experienceRequirement: 225000},
    {level: 18, experienceRequirement: 265000},
    {level: 19, experienceRequirement: 305000},
    {level: 20, experienceRequirement: 355000}
]

/**
 * Get the level based on experience.
 */
export function getLevel(experience: number) {
    for (let level = MaxLevel; level >= MinLevel; level--)
    {
        const experienceRequirement = levels.find(l => l.level === level)?.experienceRequirement ?? -1;
        if (experienceRequirement <= experience)
        {
            return level;
        }
    }
    return -1; // Special number which symbolises that no valid level was found.
}

/**
 * Get next level's experience requirement. Returns -1 if max level.
 */
export function getNextLevelExperienceRequirement(experience: number) {
    return levels.find(l => l.experienceRequirement > experience)?.experienceRequirement ?? -1;
}

/**
 * Get the proficiency bonus based on level.
 * @param level
 */
export function getProficiencyBonus(level: number) {
    return Math.ceil(1 + (level / 4));
}

/**
 * Get a level's progress percentage to the next level, i.e. 10 for 10%, 25 for 25%.
 * @param level Level response
 */
export function getProgressPercentage(level: CharacterLevelResponse) {
    const nextLevelExp = level.nextLevelExperienceRequirement;
    const currentExp = level.experience;
    const currentLevelExp = level.currentLevelExperienceRequirement;

    let characterPercentage = (currentExp - currentLevelExp) / (nextLevelExp - currentLevelExp);
    return characterPercentage * 100;
}

/**
 * Gets a modifier from a given stat along with the correct math symbol, i.e. +4, -2
 * @param modifier
 */
export function getModifierAsString(modifier: number) {
    if(modifier >= 0){
        return `+${modifier}`;
    } else {
        return `${modifier}`;
    }
}

/**
 * Gets a modifier from a given stat. i.e. 10 strength has a modifier of 0.
 * @param stat Stat, i.e. strength, charisma
 */
export function getModifier(stat: number) {
    return Math.floor((stat - 10) / 2);
}

/**
 * Get hit dice in string format.
 * @param attributes Character attribute list
 * @param useDefaultValues If true, get dice default values. Otherwise get current values.
 */
export function getHitDiceAsString(attributes: CharacterAttributeRequest[] | null | undefined, useDefaultValues: boolean){
    if(!attributes){
        return "N/A";
    }

    const idStart = "hitDice";

    // Store dictionary of all hit dice and their values
    const dice: {[id: string] : number} = {};
    let hitDiceAttributes = attributes.filter(a => a.id.startsWith(idStart));
    for(let hitDiceAttribute of hitDiceAttributes){
        const diceType = hitDiceAttribute.id.substring(idStart.length);

        const diceDefaultValue = hitDiceAttribute.defaultValue;
        const diceCurrentValue = hitDiceAttribute.currentValue;

        if(useDefaultValues){
            dice[diceType] = diceDefaultValue ?? 0;
        } else {
            dice[diceType] = diceCurrentValue ?? 0;
        }
    }

    // Sort dice dictionary
    const sortableArray = Object.entries(dice);
    const sortedArray = sortableArray.sort(([aKey, ], [bKey, ]) => parseInt(aKey) - parseInt(bKey));
    const sortedDice = Object.fromEntries(sortedArray);

    // Construct string
    const result = Object.keys(sortedDice).map(key => sortedDice[key] + key).join(",");
    return isWhitespaceOnly(result) ? "No dice" : result;
}