import PFP from "./pfp"
import React from "react"
import config from "../config"


const Self = () => {
    return <div className="m-10 select-none flex self-center justify-center items-center flex-wrap h-full mt-32 z-0">
        {/* <img src={config.banner} alt="banner" className="absolute object-none  w-full h-96 z-0" /> */}

        <PFP src={config.pfp} className="rounded-full h-36 z-10" />

        <div className='decoration-0 text-2xl hover:text-3xl self-center m-6 z-10'>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            I'm <span className="text-cyan-400"> {config.name.split(' ').reverse().reduce((t, e,i) => (<span key={i}>{e} {t}</span>) as any, "")} </span>
        </div>


    </div>
}

export default Self