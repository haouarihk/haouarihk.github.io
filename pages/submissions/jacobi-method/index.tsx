import { useRef, useState } from "react"
import { roundArray, roundMatrix, roundNum, Show1DMatrix, Show2DMatrix } from "../../../components/util"
import { jacobMethodIterations, jacobMethodPrecision, verifySolvable } from "./script"


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
        <div className="p-3 bg-gray-800 rounded-lg">
            <h1 className="px-2 text-2xl md:m-5">Jacob Method</h1>
            the Jacobi method is an iterative algorithm for determining the solutions of a strictly diagonally dominant system of linear equations. Each diagonal element is solved for, and an approximate value is plugged in. The process is then iterated until it converges. This algorithm is a stripped-down version of the Jacobi transformation method of matrix diagonalization. The method is named after Carl Gustav Jacob Jacobi.
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

            {/* submit button */}
            <div className="p-5 px-3 w-full">

                <div className="p-5 w-full ">
                    <label className="px-2 m-5 text-xl">type</label>
                    {/* @ts-ignore */}
                    <div defaultValue={workType} className="p-5 " onChange={(e) => { setWorkType(e.target.value); setIterationsOrPrecision(e.target.value === "Iterations" ? 100 : 0.001) }}>
                        <input type="radio" value="Iterations" name="type" defaultChecked /> With Iterations <br />
                        <input type="radio" value="Precision" name="type" /> With precision
                    </div>
                </div>

                {
                    workType == "Iterations" ? <div className="p-5 w-full ">
                        <label className="px-2 m-5 text-xl">Iterations</label>
                        <input type="number" value={IterationsOrPrecision} onChange={(e) => setIterationsOrPrecision(parseInt(e.currentTarget.value))} className="p-2 bg-gray-800 rounded-lg" />
                    </div>
                        :
                        <div className="p-5 w-full ">
                            <label className="px-2 m-5 text-xl">Precision</label>
                            <input type="number" value={IterationsOrPrecision} onChange={(e) => setIterationsOrPrecision(parseFloat(e.currentTarget.value))} className="p-2 bg-gray-800 rounded-lg" />
                        </div>
                }

                <button onClick={solve} className="py-2 px-4 font-bold text-white bg-blue-500 hover:bg-blue-700 rounded focus:outline-2 focus:outline-none">
                    Solve
                </button>
                {errG && <h4 className="my-2 text-white bg-red-600 rounded-lg">{errG}</h4>}
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

        {
            oldResults && <div className="flex flex-col justify-center items-center">

                {/* old results */}
                < div className="p-2">
                    <h1 className="mb-3 border-b-2">Previews results:</h1>
                    <div className="flex flex-wrap justify-center ">
                        {
                            oldResults.map((e, i) =>
                                <Show1DMatrix key={i} label={"X_" + i + "="} matrix={e} className="p-3" />
                            )
                        }
                    </div>
                </div >
            </div >
        }
    </div >
}


export default Jacob;