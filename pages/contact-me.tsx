import { NextPage } from "next";
import copyToClipBoard from "../components/util";
import config, { Contact } from "../config";


function Contact({ value, url, name }: Contact & { name: string }) {
    console.log(url)
    return <div className="flex gap-4 justify-center ">
        <a className="select-none">{name}</a> <a href={url} className="select-all cursor-pointer" onClick={copyToClipBoard}>{value}</a>
    </div>
}



const ContactMe: NextPage = () => (
    <main className="flex flex-col gap-6">
        <h1 className="select-none">Contact Me</h1>
        <div className="text-4xl flex flex-col gap-4">
            {
                Object.keys(config.contacts).map(name => {
                    //@ts-ignore
                    const value = typeof config.contacts[name] === "string" ? config.contacts[name] : config.contacts[name].value
                    //@ts-ignore
                    const url = typeof config.contacts[name] !== "string" && config.contacts[name].url

                    return <Contact key={value} value={value} url={url} name={name} />
                })
            }
        </div>
    </main>

)

export default ContactMe;