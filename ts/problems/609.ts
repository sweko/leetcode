import { Problem } from "../model";
import { arrayIgnoreOrderCompare } from "../utils";

export const problem: Problem<string[], string[][]> = {
    name: 'Find Duplicate File in System',
    id: 609,
    url: 'https://leetcode.com/problems/find-duplicate-file-in-system/',
    solution: findDuplicate,
    tests: [
        {
            id: 1,
            argument: ["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)","root 4.txt(efgh)"],
            result: [["root/a/2.txt","root/c/d/4.txt","root/4.txt"],["root/a/1.txt","root/c/3.txt"]]
        },
        {
            id: 2,
            argument: ["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)"],
            result: [["root/a/2.txt","root/c/d/4.txt"],["root/a/1.txt","root/c/3.txt"]]
        }
    ],
    customCompare: arrayIgnoreOrderCompare
}

interface FileData {
    folder: string;
    filename: string;
    content: string;
}

function getFullPath(file: FileData) {
    return `${file.folder}/${file.filename}`;
}

function findDuplicate(paths: string[]): string[][] {
    const fileRegex = /^(.*)\((.*)\)$/;
    const xfiles: FileData[] = [];
    for (const path of paths) {
        const [folder, ...files] = path.split(" ");
        for (const file of files) {
            const match = file.match(fileRegex);
            if (!match) {
                throw new Error(file);
            }
            const fileData = {
                folder,
                filename: match[1],
                content: match[2],
            }
            xfiles.push(fileData);
        }
    }
    const contentGroups: Record<string, FileData[]> = {}
    for (const file of xfiles) {
        if (contentGroups[file.content]) {
            contentGroups[file.content].push(file);
        } else {
            contentGroups[file.content] = [file];
        }
    }
    const result = Object.keys(contentGroups)
        .filter(key => contentGroups[key].length > 1)
        .map(key => contentGroups[key].map(fd => getFullPath(fd)));
    return result;
};