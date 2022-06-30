import { readTestCase } from "../file-utils";
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
        },
        {
            id: 4,
            argument: [[914,9927],[333,712],[163,5455],[835,5040],[905,8433],[417,8249],[921,9553],[913,7394],[303,7525],[582,8658],[86,957],[40,9152],[600,6941],[466,5775],[718,8485],[34,3903],[380,9996],[316,7755]],
            result: 18
        },
        {
            id: 5,
            argument: [[671,4420],[481,6286],[248,1026],[590,4427],[480,843],[208,5326],[1000,9443],[87,7434],[683,7547],[435,8617],[376,9563],[900,5643],[798,8797],[750,8705],[393,7240],[849,8602],[743,7803],[721,7094],[556,2574]],
            result: 17
        },
        {
            id: 6,
            argument: readTestCase(630, 6, testCaseProcessor),
            result: 72329,
        }

    ]
}

function testCaseProcessor(input: string):number[][] {
    const pairs = input.slice(2).split("],[").map(p => p.split(",").map(n => parseInt(n, 10)));
    return pairs;
}

interface Course {
    id: number;
    length: number;
    lastDay: number;
}


// let memos: {[key: string]: number};
// function scheduleCourse(courses: number[][]): number {
//     memos = {};
//     courses.sort((a,b) => a[1]-b[1]);
//     const result = scheduleCourseImpl(courses.map((c, id) => ({
//         id,
//         length: c[0],
//         lastDay: c[1]
//     })), 0, 0);
//     return result;
// };

// let calls = 0;

// function scheduleCourseImpl(courses: Course[], currentDate: number, taken: number): number {

//     calls += 1;
//     if (calls % 1234567 === 0) {
//         console.log(calls);
//     }

//     const key = `${courses.map(c => c.id).join("-")}:${currentDate}:${taken}`;
//     if (memos[key]) {
//         return memos[key];
//     }

//     const availables = courses.filter(c => c.length+currentDate <= c.lastDay);
//     if (availables.length === 0) {
//         return taken;
//     }
//     let max = 0;
//     for (let index = 0; index < availables.length; index++) {
//         const course = availables[index];
//         const rest = [...courses.slice(0, index), ...courses.slice(index+1)];
//         const value = scheduleCourseImpl(rest, currentDate+course.length, taken+1);
//         if (value > max) {
//             max = value;
//         }
//     }
//     memos[key] = max;
//     return max;
// }

function scheduleCourse(courses: number[][]): number {
    courses.sort((a, b) => a[1] - b[1]);
    const memos = courses.map(c => Array(c[1]+1).fill(0));

    return schedule(courses.map((c, id) => ({
                id,
                length: c[0],
                lastDay: c[1]
    })), 0, 0, memos);
}

function schedule(courses: Course[], index: number, time: number, memos: number[][]) {
//    console.log(index);
    if (index >= courses.length) {
        return 0;
    }

    if (memos[index][time] !== 0) {
        return memos[index][time];
    }

    const course = courses[index];

    // we either take or not take the course at this point in time
    const taken = (time + course.length <= course.lastDay)
        ?  1 + schedule(courses, index + 1, time + course.length, memos)
        : 0;
    const untaken = schedule(courses, index + 1, time, memos);
    const result = Math.max(taken, untaken)
    memos[index][time] = result;
    return result;
}