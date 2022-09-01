export const expandMatrix = <T>(matrix: T[][], filler: T): T[][] => {
    if (matrix.length === 0) {
        return [];
    }
    const width = matrix[0].length;

    const result = [
        Array(width+2).fill(null).map(_ => filler),
        ...matrix.map(row => [filler, ...row, filler]),
        Array(width+2).fill(null).map(_ => filler)
    ]
    return result;
}
