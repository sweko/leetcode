import { readFileSync } from "fs"

export const readTestCase = <T>(problem: number, index: number, processor: (input:string) => T) => {
    const contents = readFileSync(`./data/${problem}/${index}.in`, "utf8");
    return processor(contents);
}

export const readOutputJson = <T>(problem: number, index: number) => {
    const contents = readFileSync(`./data/${problem}/${index}.out`, "utf8");
    return JSON.parse(contents) as T;
}