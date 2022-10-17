import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<[number[], number], number> = {
    name: 'Minimum Difficulty of a Job Schedule',
    id: 1335,
    url: 'https://leetcode.com/problems/minimum-difficulty-of-a-job-schedule/',
    solution: paramWrapper(minDifficulty),
    tests: [
        {
            id: 1,
            argument: [[6,5,4,3,2,1], 2],
            result: 7
        },
        {
            id: 2,
            argument: [[9,9,9], 4],
            result: -1
        },
        {
            id: 3,
            argument: [[1,1,1], 3],
            result: 3
        },
        {
            id: 4,
            argument: [[7,1,7,1,7,1], 3],
            result: 15
        },
        {
            id: 5,
            argument: [[11,111,22,222,33,333,44,444], 6],
            result: 843
        },
        {
            id: 6,
            argument: [[6,5,4,3,2,1], 1],
            result: 6
        },
        {
            id: 7,
            argument: [[6,5,4,3,2,1], 6],
            result: 21
        },
        {
            id: 8,
            argument: [[380,302,102,681,863,676,243,671,651,612,162,561,394,856,601,30,6,257,921,405,716,126,158,476,889,699,668,930,139,164,641,801,480,756,797,915,275,709,161,358,461,938,914,557,121,964,315], 10],
            result: 3807
        },
        {
            id: 9,
            argument: [[641,915,240,922,191,820,413,871,515,360,78,547,790,335,846,132,344,62,582,159,662,14,614,364,802,981,679,956,831,142,707,391,81,842,365,743,825,849,767,798,841,194,287,720,948,706,559,688,41,63,624,854,788,180,171,316,302,595,684,984,666,914,0,611,451,648,966,100,135,787,942,773,273,426,187,65,161,163,324,207,911,58,334,849,727,380,354,574,223,653,602,879,183,273,904,669,214,434,220,112,176,196,471,736,377,946,279,308,590,646,977,548,995,119,440,365,893,522,604,79,399,484,240,165,64,505,446,257,17,148,825,239,45,491,801,378,513,311,616,263,511,787,944,395,453,949,327,521,701,529,535,988,525,872,299,594,881,258,304,410,162,70,770,630,573,248,226,101,333,814,540,135,609,754,177,656,262,981,80,941,266,742,818,167,764,191,662,179,321,942,389,173,801,637,463,483,984,335,283,400,498,526,59,32,945,914,924,34,637,225,866,61,499,777,110,425,8,777,189,446,505,993,657,992,216,496,522,816,524,587,97,210,807,55,286,556,812,79,161,618,616,990,400,605,91,146,520,59,724,311,935,134,606,737,40,944,101,893,50,438,635,774,360,748,745,571,7,200,288,642,698,411,977,261,839,228,472,938,483,699,682,931,480,710,618,158,775,801,434,816,599,893,314,190,104,720,416,196,515,864], 4],
            result: 2079
        }
    ]
}

let cache: Record<string, number> = {};

function minDifficulty(jobDifficulty: number[], d: number): number {
    cache = {};
    return minDifficultyImpl(jobDifficulty, d);
}


function minDifficultyImpl(jobDifficulty: number[], d: number): number {
    const key = `${jobDifficulty.length}:${d}`;
    if (cache[key] !== undefined) {
        return cache[key];
    }
    // no cache whatsoever
    if (d > jobDifficulty.length) {
        cache[key] = -1;
        return -1;
    }
    if (d === 0) {
        if (jobDifficulty.length === 0) {
            cache[key] = 0;
            return 0;
        }
        cache[key] = -1;
        return -1;
    }
    let min = Number.POSITIVE_INFINITY;
    for (let index = 1; index <= jobDifficulty.length-d+1; index++) {
        const diff = Math.max(...jobDifficulty.slice(0, index));
        const rest = minDifficultyImpl(jobDifficulty.slice(index), d-1);
        if (rest === -1) {
            continue;
        }
        if (diff + rest < min) {
            min = diff + rest;
        }
    }
    if (min === Number.POSITIVE_INFINITY) {
        cache[key] = -1;
        return -1;
    }
    cache[key] = min;
    return min;
};