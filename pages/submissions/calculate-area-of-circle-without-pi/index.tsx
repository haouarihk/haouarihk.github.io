import { useRef, useState } from "react"
import { roundArray, roundMatrix, roundNum, Show1DMatrix, Show2DMatrix } from "../../../components/util"
import jacobMethodIterations, { jacobMethodPrecision, verifySolvable } from "./script"


function Jacob() {
    const [runTime, setRunTime] = useState(0)
    const [IterationsOrPrecision, setIterationsOrPrecision] = useState(100)
    const [oldResults, setoldResults] = useState<number[][] | null>([])
    const [result, setResult] = useState<number[] | null>(null)

    const [workType, setWorkType] = useState("Iterations")

    const resultRef = useRef(null)

    const defaultA = [
        [10, -1, 2, 0],
        [-1, 11, -1, 3],
        [2, -1, 10, -1],
        [0, 3, -1, 8]
    ]

    const defaultB = [6, 25, -11, 15];

    const [A, setA] = useState<number[][]>(defaultA);
    const [B, setB] = useState<number[]>(defaultB);

    const [errA, setErrA] = useState(null);
    const [errB, setErrB] = useState(null);
    const [errG, setErrorG] = useState(null);

    const solve = (e: any) => {
        e.preventDefault()
        const TimeA = performance.now()


        setoldResults(null)

        setResult(null)

        setErrorG(null)


        verifySolvable(A).then(async () => {
            (workType == "Iterations" ?
                jacobMethodIterations(A, B, IterationsOrPrecision) :
                jacobMethodPrecision(A, B, IterationsOrPrecision)
            ).then(({ x, allResults }) => {
                setRunTime(performance.now() - TimeA)
                setResult(roundArray(x, workType == "Iterations" ? 1e-2 : +IterationsOrPrecision));
                setoldResults(roundMatrix(allResults, 1e-4))
                // @ts-ignore
                resultRef.current.scrollIntoView({ behavior: "smooth" })
            })
        }).catch((e: any) => {
            setErrorG(e)
        })
    }




    const test = (func: Function, errFun: Function) => (e: any) => {
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
        <div className="p-3 rounded-lg bg-gray-800">
            <h1 className="text-2xl px-2 md:m-5">Jacob Method</h1>
            the Jacobi method is an iterative algorithm for determining the solutions of a strictly diagonally dominant system of linear equations. Each diagonal element is solved for, and an approximate value is plugged in. The process is then iterated until it converges. This algorithm is a stripped-down version of the Jacobi transformation method of matrix diagonalization. The method is named after Carl Gustav Jacob Jacobi.
            <h1 className="text-2xl px-2 m-5">A*X=B</h1>
        </div>

        <form className="flex flex-col justify-center items-center">
            <div className="w-full p-5 border-b-2 ">

                {errA && <h4 className="text-white bg-red-600 rounded-lg">{errA}</h4>}
            </div>
            <div className="w-full p-5">

                {errB && <h4 className="text-white bg-red-600 rounded-lg">{errB}</h4>}
            </div>

            {/* submit button */}
            <div className="w-full p-5 px-3">
                <button onClick={solve} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Solve
                </button>
                {errG && <h4 className="text-white bg-red-600 rounded-lg my-2">{errG}</h4>}
            </div>
        </form>



        {
            result && <div className="flex flex-col justify-center items-center">

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


export default Jacob;