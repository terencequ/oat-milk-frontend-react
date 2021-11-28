/**
 * Function to limit a string.
 * @param string Input string
 * @param maxLength Number of maximum characters.
 * @return newString New string which fits limits.
 */
export function limitString(string: string, maxLength: number) {
    let result = string;
    result = result.replace(/\r\n/g, "\n").replace(/\r/g, "").replace("\n", "");
    return result;
}

export function isWhitespaceOnly(string: string){
    return !string.replace(/\s/g, '').length;
}
