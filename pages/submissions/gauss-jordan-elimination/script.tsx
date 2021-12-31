// [  [1,1,1],  [0,2,5], [2,5,-1]]
// [ 6,-4,27]



/**replaces colums without messing up the equation**/
function replaceCol(arr: number[][], x1: number, x2: number) {
    for (let k = 0; k < arr.length; k++) {
        const aux = arr[k][x1];
        arr[k][x1] = arr[k][x2];
        arr[k][x2] = aux;
    }
}


export async function gaussianJordanElimination(_A: number[][], _B: number[]) {
    const A = JSON.parse(JSON.stringify(_A));
    const B = JSON.parse(JSON.stringify(_B));
    const n = A.length;
    for (let i = 0; i < n; i++) {

        // if find one with 0
        if (A[i][i] == 0) {
            let j = i + 1;
            // find the last element that has 0
            while (j < A.length && A[i][j] == 0) j++;

            // make sure we are not over the board
            if (j < A.length)
                replaceCol(A, i, j)
        }

        if (A[i][i] != 0) {
            for (let j = 0; j < n; j++) {
                if (j != i) {
                    const mult = -A[j][i] / A[i][i];
                    A[j][i] = 0;
                    for (let k = i + 1; k < n; k++) {
                        A[j][k] += mult * A[i][k];
                    }
                    B[j] += mult * B[i];
                }
            }
        }
    }

    return { A, B }
}


export default function viewer() {
    return <div>
        {`function replaceCol(arr: number[][], x1: number, x2: number) {
    for (let k = 0; k < arr.length; k++) {
        const aux = arr[k][x1];
        arr[k][x1] = arr[k][x2];
        arr[k][x2] = aux;
    }
}


export async function gaussianJordanElimination(_A: number[][], _B: number[]) {
    const A = JSON.parse(JSON.stringify(_A));
    const B = JSON.parse(JSON.stringify(_B));
    const n = A.length;
    for (let i = 0; i < n; i++) {

        // if find one with 0
        if (A[i][i] == 0) {
            let j = i + 1;
            // find the last element that has 0
            while (j < A.length && A[i][j] == 0) j++;

            // make sure we are not over the board
            if (j < A.length)
                replaceCol(A, i, j)
        }

        if (A[i][i] != 0) {
            for (let j = 0; j < n; j++) {
                if (j != i) {
                    const mult = -A[j][i] / A[i][i];
                    A[j][i] = 0;
                    for (let k = i + 1; k < n; k++) {
                        A[j][k] += mult * A[i][k];
                    }
                    B[j] += mult * B[i];
                }
            }
        }
    }

    return { A, B }
}`}
    </div>
}