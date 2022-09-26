import { ClassArgument, Hash } from "./model";

export const defaultCompare = <T>(actual: T, expected: T): boolean => {
    // array handling
    if (Array.isArray(actual)) {
        if (Array.isArray(expected)) {
            return actual.length === expected.length && actual.every((a, i) => defaultCompare(a, expected[i]));
        }
        return false;
    }

    // primitives and everything else
    return actual === expected;
}

export const arrayIgnoreOrderCompare = <T>(actual: T[], expected: T[]): boolean => {
    if (Array.isArray(actual)) {
        if (Array.isArray(expected)) {
            if (actual.length !== expected.length) {
                return false;
            }
            const actualValue = actual.slice().sort();
            const expectedValue = expected.slice().sort();
            return defaultCompare(actualValue, expectedValue);
        }
        return false;
    }
    return false;
}

export const toValuesArray = <T>(hash: Hash<T>): T[] => Object.keys(hash).map(key => hash[key]);
export const toKeysArray = <T>(hash: Hash<T>): string[] => Object.keys(hash);


export const classWrapperSingleMethod = <TClass, TInit, TCall extends any[], TResult>(func: new(_: TInit) => TClass, methodName: keyof TClass) => (input: ClassArgument<TInit, TCall>) => {
    const object = new func(input.initialization);
    const results: TResult[] = [];
    for (const call of input.calls) {
        const method = (object[methodName] as unknown as (...args: TCall) => TResult);
        const result = method.apply(object, call);
        results.push(result);
    }
    return results;
}

export const classWrapperMultiMethod = <TClass, TInit, TCall extends any[], TResult>(func: new(_: TInit) => TClass, methodName: keyof TClass) => (input: ClassArgument<TInit, TCall>) => {
    const object = new func(input.initialization);
    const results: TResult[] = [];
    for (const call of input.calls) {
        const method = (object[methodName] as unknown as (...args: TCall) => TResult);
        const result = method.apply(object, call);
        results.push(result);
    }
    return results;
}

export const paramWrapper = (func: (...args:any[]) => any) => (args: any[]) => func(...args);


export const voidWrapper = (func: (...args:any[]) => void, argIndex: number = 0) => (...args: any[]) => {
    func(...args);
    const result = args[argIndex];
    return result;
}