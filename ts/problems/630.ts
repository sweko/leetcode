import { Problem } from "../model";

export const problem: Problem<number[][], number> = {
    name: 'Course Schedule III',
    id: 630,
    url: 'https://leetcode.com/problems/course-schedule-iii/',
    solution: scheduleCourse,
    tests: [
        {
            id: 1,
            argument:  [[100,200],[200,1300],[1000,1250],[2000,3200]],
            result: 3
        },
        {
            id: 2,
            argument:  [[1,2]],
            result: 1
        },
        {
            id: 3,
            argument: [[3,2],[4,3]],
            result: 0
        }
    ]
}

function scheduleCourse(courses: number[][]): number {
    return -1;
};