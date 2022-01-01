import { useRef, useState } from "react"
import { roundArray, roundMatrix, roundNum, Show1DMatrix, Show2DMatrix } from "../../../components/util"
import { CalculateAreaOfCircle } from "./script"


function Jacob() {
    const [runTime, setRunTime] = useState(0)
    const [oldResults, setoldResults] = useState<number[] | null>([])
    const [result, setResult] = useState<number | null>(null)

    const resultRef = useRef(null)

    const defaultS = 1;
    const defaultN = 4;

    const [s, setS] = useState(defaultS)
    const [n, setN] = useState(defaultN)


    const [errA, setErrA] = useState(null);
    const [errB, setErrB] = useState(null);
    const [errG, setErrorG] = useState<any>(null);

    const solve = (e: any) => {
        e.preventDefault()
        const TimeA = performance.now()


        setoldResults(null)

        setResult(null)

        setErrorG(null)

        CalculateAreaOfCircle(s, n).then(({ result, allResults }) => {
            try {
                setRunTime(performance.now() - TimeA)
                setResult(result);
                setoldResults(allResults)
                // @ts-ignore
                resultRef.current.scrollIntoView({ behavior: "smooth" })
            } catch (e) {
                setErrorG(result + ": " + e)
            }
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
            <h1 className="text-2xl px-2 md:m-5">Calculate Area Of a circule</h1>
        </div>

        <form className="flex flex-col justify-center items-center">
            <div className="w-full p-5  ">
                S:<input type="number" value={s} onChange={(e) => setS(+e.target.value)} className="appearance-none  bg-gray-600 text-gray-300 border border-gray-600 rounded  mb-3 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500" />
                {errA && <h4 className="text-white bg-red-600 rounded-lg">{errA}</h4>}
            </div>
            <div className="w-full p-5">
                N:<input type="number" value={n} onChange={(e) => setN(+e.target.value)} className="appearance-none  bg-gray-600 text-gray-300 border border-gray-600 rounded  mb-3 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500" />
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
            (result !== undefined || result !== null) && <div className="flex flex-col justify-center items-center">

                run time: {roundNum(runTime)}ms
                {/* result */}

                <div ref={resultRef} className="p-2">
                    <h1 className="mb-3 border-b-2">End result:</h1>
                    <div className="flex justify-center ">
                        {result}
                    </div>
                </div>
            </div >
        }

        {
            oldResults && <div className="flex flex-col justify-center items-center">

                {/* old results */}
                < div className="p-2">
                    <h1 className="mb-3 border-b-2">Previews results:</h1>
                    <div className="flex flex-col justify-center flex-wrap ">
                        {
                            oldResults.map((e, i) =>
                                <div key={i}>{e}</div>
                            )
                        }
                    </div>
                </div>
            </div>
        }
    </div >
}


export default Jacob;