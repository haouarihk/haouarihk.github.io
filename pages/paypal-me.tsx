import { NextPage } from "next";
import PayMethod from "../components/paypalMethod";

const PaypalMe: NextPage = () => (
  <main className="flex flex-col gap-6 justify-center items-center">
    <h1 className="text-4xl">Paypal Me</h1>
    <PayMethod />
  </main>
);

export default PaypalMe;
