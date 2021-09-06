import {CharacterLevelResponse, CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";

/**
 * Get a level's progress percentage to the next level, i.e. 10 for 10%, 25 for 25%.
 * @param level Level response
 */
export function getProgressPercentage(level: CharacterLevelResponse) {
    const nextLevelExp = level.nextLevelExperienceRequirement;
    const currentExp = level.experience;
    const previousLevelExp = level.previousLevelExperienceRequirement;

    let characterPercentage = (currentExp - previousLevelExp) / (nextLevelExp - previousLevelExp);
    return characterPercentage * 100;
}

/**
 * Gets a modifier from a given stat along with the correct math symbol, i.e. +4, -2
 * @param stat Stat, i.e. strength, charisma
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

export function getProficiencyBonus(level: number) {
    return Math.ceil(1 + (level / 4));
}