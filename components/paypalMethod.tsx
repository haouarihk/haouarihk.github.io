

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from "react";
import config from "../config";
import copyToClipBoard from "./util";

// creates a paypal order
const createOrder = (amount: number) => (data: any, actions: any) => {
    return actions.order
        .create({
            purchase_units: [
                {
                    amount: {
                        value: amount,
                    },
                },
            ],
            // remove the applicaiton_context object if you need your users to add a shipping address
            application_context: {
                shipping_preference: "NO_SHIPPING",
            },
        })
};


// handles when a payment is confirmed for paypal
const onApprove = (data: any, actions: any) => {
    return actions.order.capture()
};





const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
if (!CLIENT_ID) console.log("client_id was not provided in the env file")

function Btn({ value, onClick }: { value: string, onClick: (value: number) => void }) {
    return <button onClick={() => onClick(getNum(value))} className="p-6 bg-lime-500 hover:bg-lime-400 active:bg-lime-50 rounded-xl">{value}</button>
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

    const [amount, setAmount] = useState(5);

    if (!CLIENT_ID)
        return <div>
            paypal me At: <a className="text-2xl active:font-bold cursor-pointer select-all " onClick={copyToClipBoard}>{config.paypalMe}</a>
        </div>



    return <PayPalScriptProvider options={{ "client-id": CLIENT_ID || "" }}>
        <div className="flex flex-col gap-10 py-6 px-8 bg-gray-800 rounded-3xl">

            <div className="flex overflow-hidden gap-2 items-center text-5xl rounded-xl">
                <input type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} className="w-full text-white bg-slate-700 outline-none md:p-3 " />
                <div>${
                    amount > 30 && "🤑"

                }</div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center items-center">
                {
                    pays.map((value) => <Btn value={value} key={value} onClick={setAmount} />)
                }
            </div>


            <PayPalButtons
                style={{
                    color: "blue",
                    shape: "pill",
                    label: "pay",
                    tagline: false,
                    layout: "horizontal",
                }}
                createOrder={createOrder(amount)}
                onApprove={onApprove} />
        </div>
    </PayPalScriptProvider>

}