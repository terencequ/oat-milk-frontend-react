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