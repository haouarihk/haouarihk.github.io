// [  [1,1,1],  [0,2,5], [2,5,-1]]
// [ 6,-4,27]


export async function verifySolvable(A: number[][]) {
    const n = A.length;
    for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = 0; j < n; j++) {
            if (i != j) sum += Math.abs(A[i][j])
        }

        if (Math.abs(A[i][i]) <= sum) return Promise.reject("Not solvable")
    }
    return true;
}


export async function seidelMethodPrecision(_A: number[][], _B: number[], precision: number = 0.001) {
    const A = JSON.parse(JSON.stringify(_A));
    const B = JSON.parse(JSON.stringify(_B));
    let x: number[] = Array(A.length).fill(0);
    let allResults: number[][] = [];

    while (true) {
        for (let i = 0; i < A.length; i++) {

            let alpha = 0;

            // summing up the xs of the equation
            for (let j = 0; j < A.length; j++) {
                if (i != j) {
                    alpha += A[i][j] * x[j];
                }
            }

            // solving for the x
            x[i] = (B[i] - alpha) / A[i][i];
            // cb(x, _);
            allResults.push(x.slice());
        }

        // check the amount of difference between the current and previous x
        const diff = x.reduce((acc, curr, i) => {
            return acc + Math.abs(curr - allResults[allResults.length - 2][i]);
        }, 0) / x.length;

        if (diff < precision) {
            break;
        }

    }

    return { x, allResults };
}





export default async function seidelMethodIterations(_A: number[][], _B: number[], Iterations: number) {
    const A = JSON.parse(JSON.stringify(_A));
    const B = JSON.parse(JSON.stringify(_B));
    let x: number[] = Array(A.length).fill(0);
    let allResults: number[][] = [];
    for (let _ = 0; _ < Iterations; _++) {
        for (let i = 0; i < A.length; i++) {

            let alpha = 0;

            // summing up the xs of the equation
            for (let j = 0; j < A.length; j++) {
                if (i != j) {
                    alpha += A[i][j] * x[j];
                }
            }

            // solving for the x
            x[i] = (B[i] - alpha) / A[i][i];
            // cb(x, _);
            allResults.push(x.slice());
        }
    }

    return { x, allResults };
}

// console.log(jaconMethodItterations([
//     [1, 1, 1],
//     [0, 2, 5],
//     [2, 5, -1]
// ], [6, -4, 27], 100, (probs, i) => {
//     console.log(i, probs);
// }
// ));
