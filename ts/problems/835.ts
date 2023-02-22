import { Problem } from "../model";
import { paramWrapper } from "../utils";

export const problem: Problem<[Image, Image], number> = {
    name: 'Image Overlap',
    id: 835,
    url: 'https://leetcode.com/problems/image-overlap/',
    solution: paramWrapper(largestOverlap),
    tests: [
        {
            id: 1,
            argument: [[[1]], [[1]]],
            result: 1
        },
        {
            id: 2,
            argument: [[[1,1,0],[0,1,0],[0,1,0]], [[0,0,0],[0,1,1],[0,0,1]]],
            result: 3
        },
        {
            id: 3,
            argument: [[[0]], [[1]]],
            result: 0
        },
        {
            id: 4,
            argument: [[[0,0,0,0,1],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], 
                [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,0,0,0,0]]],
            result: 1
        }
    ]
}

type Image = (1|0)[][];

const translateImage = (image: Image, x: number, y: number) => {
    const translatedImage: Image = [];
    const height = image.length;
    const width = image[0].length;

    for (let index = 0; index < x; index++) {
        translatedImage[index] = Array(width).fill(0);
    }
    for (let rindex = x; rindex < height; rindex++) {
        translatedImage[rindex] = Array(width).fill(0);
        for (let cindex = 0; cindex < y; cindex++) {
            translatedImage[rindex][cindex] = 0;
        }
        for (let cindex = y; cindex < width; cindex++) {
            translatedImage[rindex][cindex] = image[rindex - x][cindex - y];
        }
    }
    return translatedImage;
}

const otherTranslateImage = (image: Image, x: number, y: number) => {
    const translatedImage: Image = [];
    const height = image.length;
    const width = image[0].length;

    for (let rindex = 0; rindex < x; rindex++) {
        translatedImage[rindex] = Array(width).fill(0);
        for (let cindex = 0; cindex < y; cindex++) {
            translatedImage[rindex][cindex] = image[rindex + x][cindex + y];
        }
        for (let cindex = y; cindex < width; cindex++) {
            translatedImage[rindex][cindex] = 0;
        }
    }
    for (let rindex = x; rindex < height; rindex++) {
        translatedImage[rindex] = Array(width).fill(0);
    }
    return translatedImage;
}

function largestOverlap(img1: Image, img2: Image): number {
    const height = img1.length;
    const width = img1[0].length;
    let maxOverlap = 0;

    for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
            const translatedImage = translateImage(img2, x, y);
            let overlap = 0;
            for (let rindex = 0; rindex < height; rindex++) {
                for (let cindex = 0; cindex < width; cindex++) {
                    if (img1[rindex][cindex] === 1 && translatedImage[rindex][cindex] === 1) {
                        overlap++;
                    }
                }
            }
            if (overlap > maxOverlap) {
                maxOverlap = overlap;
            }

            const otherTranslatedImage = otherTranslateImage(img2, x, y);
            overlap = 0;
            for (let rindex = 0; rindex < height; rindex++) {
                for (let cindex = 0; cindex < width; cindex++) {
                    if (img1[rindex][cindex] === 1 && otherTranslatedImage[rindex][cindex] === 1) {
                        overlap++;
                    }
                }
            }
            if (overlap > maxOverlap) {
                maxOverlap = overlap;
            }
        }
    }

    for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
            const translatedImage = translateImage(img1, x, y);
            let overlap = 0;
            for (let rindex = 0; rindex < height; rindex++) {
                for (let cindex = 0; cindex < width; cindex++) {
                    if (img2[rindex][cindex] === 1 && translatedImage[rindex][cindex] === 1) {
                        overlap++;
                    }
                }
            }
            if (overlap > maxOverlap) {
                maxOverlap = overlap;
            }

            const otherTranslatedImage = otherTranslateImage(img1, x, y);
            overlap = 0;
            for (let rindex = 0; rindex < height; rindex++) {
                for (let cindex = 0; cindex < width; cindex++) {
                    if (img2[rindex][cindex] === 1 && otherTranslatedImage[rindex][cindex] === 1) {
                        overlap++;
                    }
                }
            }
            if (overlap > maxOverlap) {
                maxOverlap = overlap;
            }

        }
    }
    return maxOverlap;
};