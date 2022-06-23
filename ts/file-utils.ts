import { readFileSync } from "fs"

export const readTestCase = <T>(problem: number, index: number, processor: (input:string) => T) => {
    const contents = readFileSync(`./data/${problem}/${index}.in`, "utf8");
    return processor(contents);
}