import { NextPage } from "next";
import PayMethod from "../components/paypalMethod";

const PaypalMe: NextPage = () => (
  <main className="flex flex-col justify-center items-center gap-6">
    <h1 className="text-4xl">Paypal Me</h1>
    <PayMethod />
  </main>
);

export default PaypalMe;
