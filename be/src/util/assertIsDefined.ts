
// method to check if a value is defined or not and then throw an error if it is not defined
export const assertIsDefined: <T>(val: T) => asserts val is NonNullable<T> = (val) =>{
  if(!val){
    throw new Error(`Expected 'val' to be defined, but received ${val}`)
  }
}