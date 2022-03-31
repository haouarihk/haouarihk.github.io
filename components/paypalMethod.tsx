

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

    const [amount, setAmount] = useState(5);

    if (!CLIENT_ID)
        return <div>
            paypal me At: <a className="select-all text-2xl active:font-bold cursor-pointer " onClick={copyToClipBoard}>{config.paypalMe}</a>
        </div>



    return <PayPalScriptProvider options={{ "client-id": CLIENT_ID || "" }}>
        <div className="flex flex-col bg-gray-800 py-6 px-8 gap-10 rounded-3xl">

            <div className="flex overflow-hidden items-center gap-2 rounded-xl text-5xl">
                <input type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} className="outline-none w-full md:p-3 bg-slate-700 text-white " />
                <div>${
                    amount > 30 && "🤑"

                }</div>
            </div>

            <div className="flex justify-center items-center flex-wrap gap-4">
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