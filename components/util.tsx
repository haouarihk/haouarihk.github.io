export function roundNum(num: number, pow = 1e-2) {
    return Math.round(num / pow) * pow
}

export function roundArray(arr: number[], pow = 1e-2) {
    return arr.map(num => roundNum(num, pow))
}

export function roundMatrix(matrix: number[][], pow = 1e-2) {
    return matrix.map(row => roundArray(row, pow))
}

export function Show2DMatrix({ label, matrix, className }: { label: string, matrix: any[][], className?: string }) {
    return <div className={"flex justify-center items-center " + className}>
        {
            label && <h1 className="text-2xl px-2">{label}</h1>
        }

        <div className="flex justify-center rounded-lg border-x-2">
            <table>
                <tbody>
                    {matrix.map((row, index) => {
                        return (
                            <tr key={index}>
                                {row.map((col, index) =>
                                    <td key={index} className="p-4">{col}</td>
                                )
                                }
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
}


export function Show1DMatrix({ label, matrix, className }: { label: string, matrix: any[], className?: string }) {
    return <div className={"flex justify-center items-center " + className}>
        {
            label && <h1 className="text-2xl px-2">{label}</h1>
        }
        <div className="flex justify-center rounded-lg border-x-2">
            <table>
                <tbody>
                    {matrix.map((row, index) => {
                        return (
                            <tr key={index}>
                                <td className="p-4">{row}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
}
