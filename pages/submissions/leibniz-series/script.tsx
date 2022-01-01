// [  [1,1,1],  [0,2,5], [2,5,-1]]
// [ 6,-4,27]

export async function CalculatingPi(n: number) {
    const allResults: number[] = [];
    let result = 0;

    let s = 0;
    for (let i = 0; i < n; i++) {
        let den = (i * 2 + 1);

        s += (1 / den) * (i % 2 === 0 ? 1 : -1);

        allResults.push(s * 4);
    }
    result = s * 4;

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