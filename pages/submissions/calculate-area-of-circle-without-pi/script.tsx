// [  [1,1,1],  [0,2,5], [2,5,-1]]
// [ 6,-4,27]

export async function CalculateAreaOfCircle(S: number, N: number) {
    let s = S, n = N;

    const allResults: number[] = [];
    let result = 0;

    while (s > 1e-10) {
        s = Math.sqrt(1 - Math.sqrt(1 - (s * s))) / 2;
        n *= 2;
        const A = (n / 2) * s;
        allResults.push(A);
        result = A;
    }

    return { result, allResults }
}





export default function viewer() {
    return <div>
        {`
function CalculateAreaOfCircle(S: number, N: number) {
    let s = S, n = N;

    const allResults: number[] = [];
    let result = 0;

    while (s > 1e-10) {
        s = Math.sqrt(1 - Math.sqrt(1 - (s * s))) / 2;
        n *= 2;
        const A = (n / 2) * s;
        allResults.push(A);
        result = A;
    }

    return { result, allResults }
}`}
    </div>
}