export const getError = (id: string, errors: {[id: string] : string | null}) => {
  return !!Object.keys(errors).find(v => v === id) ? errors[id] : null;
}

export const anyErrors = (errors: {[id: string] : string | null}) => {
  for(const id in errors){
    if(!!errors[id]){
      return true;
    }
  }
  return false;
}
