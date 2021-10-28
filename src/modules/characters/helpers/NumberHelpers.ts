export function castToNumber(value: string, minValue: number, maxValue: number, errorSubject: string): [number | null, string | null] {
    let number = Number(value);
    if (isNaN(number) || number < minValue || number > maxValue) {
        const currentValueError = (isNaN(number)
            ? `${errorSubject} must be a number!`
            : `${errorSubject} must be between -99 and 99!`);
        return [null, currentValueError];
    } else {
        return [number, null];
    }
}

/**
 * Get random integer between min and max. The minimum is inclusive and the maximum is exclusive.
 * @param min Minimum integer. If decimal, ceiling will be used.
 * @param max Maximum integer. If decimal, floor will be used.
 */
export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The minimum is inclusive and the maximum is exclusive.
}
