import { Problem } from "../model";

export const problem: Problem<number[], boolean> = {
    name: 'UTF-8 Validation',
    id: 5,
    url: 'https://leetcode.com/problems/utf-8-validation/',
    solution: validUtf8,
    tests: [
        {
            id: 1,
            argument:  [197,130,1],
            result: true
        },
        {
            id: 2,
            argument: [235,140,4],
            result: false
        }
    ]
}

function validUtf8(data: number[]): boolean {
    const bytes = data.map(byte => byte.toString(2).padStart(8, "0"));
    let index = 0;
    while (index < bytes.length) {
        const byte = bytes[index];
        if (byte[0] === "0") {
            index += 1;
            continue;
        }
        if (byte.startsWith("110")) {
            // 2 byte char
            if (!bytes[index+1]) {
                return false;
            }
            if (!bytes[index+1].startsWith("10")) {
                return false;
            }
            index += 2;
            continue;
        }
        if (byte.startsWith("1110")) {
            // 3 byte char
            if (!bytes[index+1]) {
                return false;
            }
            if (!bytes[index+1].startsWith("10")) {
                return false;
            }
            if (!bytes[index+2]) {
                return false;
            }
            if (!bytes[index+2].startsWith("10")) {
                return false;
            }
            index += 3;
            continue;
        }
        if (byte.startsWith("11110")) {
            // 4 byte char
            if (!bytes[index+1]) {
                return false;
            }
            if (!bytes[index+1].startsWith("10")) {
                return false;
            }
            if (!bytes[index+2]) {
                return false;
            }
            if (!bytes[index+2].startsWith("10")) {
                return false;
            }
            if (!bytes[index+3]) {
                return false;
            }
            if (!bytes[index+3].startsWith("10")) {
                return false;
            }
            index += 4;
            continue;
        }
        return false;
    }
    return true;
};
