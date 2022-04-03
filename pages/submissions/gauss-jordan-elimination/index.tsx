import { useRef, useState } from "react"
import { roundArray, roundMatrix, roundNum, Show1DMatrix, Show2DMatrix } from "../../../components/util"
import { gaussianJordanElimination } from "./script"

async function solveForXs(A: number[][], B: number[]) {
    const Xs: number[] = []
    for (let i = A.length - 1; i >= 0; i--) {
        const per = B[i] - A[i].slice(i + 1).reduce((tot, n, j) => tot + (n * Xs[j]), 0)
        Xs.unshift(roundNum(per / A[i][i], 1e-2))
    }
    return Xs
}


function GaussJordan() {
    const [runTime, setRunTime] = useState(0)
    const [resultOfGaussEliminationA, setResultOfGaussEliminationA] = useState<number[][]>([])
    const [resultOfGaussEliminationB, setResultOfGaussEliminationB] = useState<number[]>([])
    const [result, setResult] = useState<number[] | null>(null)

    const resultRef = useRef(null)

    let defaultA = [[1, 1, 1], [0, 2, 5], [2, 5, -1]]
    let defaultB = [6, -4, 27];

    const [A, setA] = useState<number[][]>(defaultA);
    const [B, setB] = useState<number[]>(defaultB);

    const [errA, setErrA] = useState(null);
    const [errB, setErrB] = useState(null);
    const [errG, setErrorG] = useState(null);

    const solve = (e: any) => {
        e.preventDefault()

        setErrorG(null)

        const TimeA = performance.now()
        gaussianJordanElimination(A, B).then(({ A: _A, B: _B }) => {
            setRunTime(performance.now() - TimeA)
            setResultOfGaussEliminationA(roundMatrix(_A))
            setResultOfGaussEliminationB(roundArray(_B))
            return solveForXs(_A, _B)
        }).then((e) => {
            setResult(e);
            // @ts-ignore
            resultRef.current.scrollIntoView({ behavior: "smooth" })
        })
    }

    const test = (func: Function, errFun: Function) => (e: any) => {
        setResult(null)
        try {
            const _a = JSON.parse(e.currentTarget.value)
            func(_a)
            errFun(null)
        }
        catch (er) {
            errFun("Invalid Matrix")
        }
    }



    return <div className="md:p-20 lg:p-52">
        <div className="p-3 bg-gray-800 rounded-lg">
            <h1 className="px-2 text-2xl md:m-5">Gauss-Jordan Elimination</h1>
            Gauss-Jordan Elimination is an algorithm that can be used to solve systems of linear equations and to find the inverse of any invertible matrix. It relies upon three elementary row operations one can use on a matrix: Swap the positions of two of the rows. Multiply one of the rows by a nonzero scalar.
            <h1 className="px-2 m-5 text-2xl">A*X=B</h1>
        </div>

        <form className="flex flex-col justify-center items-center">

            <div className="p-5 w-full border-b-2 ">
                <Show2DMatrix label="A=" matrix={A} className="p-3" />
                <textarea onChange={test(setA, setErrA)} className="block py-3 px-4 mb-3 w-full h-96 leading-tight text-gray-300 bg-gray-600 focus:bg-gray-700 rounded border border-gray-600 focus:border-gray-500 focus:outline-none appearance-none" id="grid-first-name" rows={3} defaultValue={JSON.stringify(A, null, 4)} />
                {errA && <h4 className="text-white bg-red-600 rounded-lg">{errA}</h4>}
            </div>
            <div className="p-5 w-full">
                <Show1DMatrix label="B=" matrix={B} className="p-3" />
                <textarea onChange={test(setB, setErrB)} className="block py-3 px-4 mb-3 w-full h-40 leading-tight text-gray-300 bg-gray-600 focus:bg-gray-700 rounded border border-gray-600 focus:border-gray-500 focus:outline-none appearance-none" id="grid-first-name" rows={3} defaultValue={JSON.stringify(B, null, 4)} />
                {errB && <h4 className="text-white bg-red-600 rounded-lg">{errB}</h4>}
            </div>


            <div className="p-2">
                <div className="flex justify-center ">


                </div>
            </div>

            {/* submit button */}
            <div className="p-5 px-3 w-full">
                <button onClick={solve} className="py-2 px-4 font-bold text-white bg-blue-500 hover:bg-blue-700 rounded focus:outline-2 focus:outline-none">
                    Solve
                </button>
                {errG && <h4 className="text-white bg-red-600 rounded-lg">{errG}</h4>}
            </div>
        </form>



        {
            result && <div className="flex flex-col justify-center items-center">

                {/* gauss elimination */}
                <div className="p-2">
                    <h1 className="mb-3 border-b-2">Gauss Elimination result:</h1>
                    <div className="flex justify-center ">
                        <Show2DMatrix label="" matrix={resultOfGaussEliminationA} className="p-3 border-r-0" />
                        <Show1DMatrix label="" matrix={resultOfGaussEliminationB} className="p-3" />
                    </div>
                </div>
                run time: {roundNum(runTime)}ms
                {/* result */}

                <div ref={resultRef} className="p-2">
                    <h1 className="mb-3 border-b-2">End result:</h1>
                    <div className="flex justify-center ">
                        <Show1DMatrix label="" matrix={result} />
                    </div>
                </div>

            </div >
        }
    </div >

}




export default GaussJordan