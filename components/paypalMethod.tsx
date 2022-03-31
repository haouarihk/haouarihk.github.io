

import { PayPalScriptProvider } from "@paypal/react-paypal-js";


const CLIENT_ID = process.env.NEXT_PAYPAL_CLIENT_ID;
if (!CLIENT_ID) console.log("client_id was not provided in the env file")

function Btn({ value, onClick }: { value: string, onClick: (value: number) => void }) {
    return <button onClick={() => onClick(getNum(value))} className="p-6 bg-lime-500 rounded-xl hover:bg-lime-400 active:bg-lime-50">{value}</button>
}


function getNum(value: string | number) {
    return +(("" + value).match(/\d+/) || [])[0]
}

function pay(value: number) {

}


const pays = [
    "5$",
    "10$",
    "20$",
    "30$🤑"
]



export default function PayMethod() {



    return <PayPalScriptProvider options={{ "client-id": CLIENT_ID || "" }}>
        <div className="flex flex-col bg-gray-800 py-6 px-8 gap-10 rounded-3xl">

            <div className="flex overflow-hidden rounded-xl">
                <input type="number" defaultValue={5} className=" outline-none bg-slate-700 text-white text-5xl" />
            </div>

            <div className="flex justify-center items-center flex-wrap gap-4">
                {
                    pays.map((value) => <Btn value={value} key={value} onClick={pay} />)
                }
            </div>

        </div>
    </PayPalScriptProvider>

}