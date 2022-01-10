/**
 * Generate a unique random id, given a series of existing ids.
 * @constructor
 */
export function generateId(existingIds: string[] | undefined) : string{
  const maxAttempts = 10;

  let id = generateIdCore();
  let currentAttempts = 1;
  let idExists = () => existingIds?.find(existingId => existingId === id) !== undefined;
  while(idExists()){
    id = generateIdCore();
    if(currentAttempts > maxAttempts){
      throw new Error("ID conflict. Looks like the ID randomisation algorithm isn't good enough.")
    }
    currentAttempts++;
  }
  return id;
}

function generateIdCore() : string {
  const size = 4;
  const stringArr = [];
  for(let i = 0; i < size; i++){
    // tslint:disable-next-line:no-bitwise
    const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    stringArr.push(S4);
  }
  return stringArr.join();
}