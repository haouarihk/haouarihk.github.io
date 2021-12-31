// import PFP from "./pfp";

import Link from "next/link"
import { useRouter } from "next/router";
import { useState } from "react";
import config from "../config"
// import Image from "next/image"

const NavBar = () => {
    const router = useRouter()
    const [opened, setOpened] = useState(false)

    const toggleOpened = () => setOpened(!opened)
    const selected = "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
    const notSelected = "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"



    const btns = <>
        <div className={router.pathname == "/" ? selected : notSelected} aria-current="page"><Link href="/"> Profile</Link></div>
        <div className={router.pathname == "/projects" ? selected : notSelected}><Link href="/projects">Projects</Link></div>
        <div className={router.pathname == "/submissions" ? selected : notSelected}><Link href="/submissions">Submissions</Link></div>
        <div className={router.pathname == "/contact-me" ? selected : notSelected}><Link href="/contact-me">Contact Me</Link></div>
        <div className={router.pathname == "/paypal-me" ? selected : notSelected}><Link href="/paypal-me">Paypal Me</Link></div>

    </>


    return <nav className="bg-gray-800 z-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* <!-- Mobile menu button--> */}
                    <button onClick={toggleOpened} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>

                        <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        {/* <!--
                        Icon when menu is open.

                        Heroicon name: outline/x

                        Menu open: "block", Menu closed: "hidden"
            --> */}
                        <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex-shrink-0 flex items-center">
                        {/* logo if you want */}
                    </div>

                    <div className="hidden sm:block sm:ml-6">
                        <div className="flex space-x-4">
                            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                            {btns}
                        </div>
                    </div>

                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                    <div className="ml-3 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="h-8 w-8 rounded-full" src={config.pfp} alt="" />

                    </div>
                </div>
            </div>

            {
                opened && <div className="sm:block md:hidden sm:ml-6">
                    <div className="flex flex-col space-x-4">
                        {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                        {btns}
                    </div>
                </div>
            }


        </div>
    </nav>
}


export default NavBar;