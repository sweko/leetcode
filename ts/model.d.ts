//export type URL<S extends string> = S extends `${infer Protocol}` ? S : never;
export type URL<T> = string;

export interface Problem<TInput = any, TResult = any> {
    name: string;
    id: number;
    url: URL<string>;
    tests: Test<TInput, TResult>[];
    solution: (argument: TInput) => TResult;
}

export interface Test<TInput, TResult> {
    id: number;
    result: TResult;
    argument: TInput;
}

export interface ClassArgument<TInit, TCall> {
    initialization: TInit,
    calls: TCall[]
}

export type NumHash<T> = { [key: number]: T };
export type Hash<T> = { [key: string]: T };
