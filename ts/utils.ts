import { Hash } from "./model";

export const toValuesArray = <T>(hash: Hash<T>):T[] => Object.keys(hash).map(key => hash[key]);
export const toKeysArray = <T>(hash: Hash<T>):string[] => Object.keys(hash);
