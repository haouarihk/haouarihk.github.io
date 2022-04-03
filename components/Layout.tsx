import Head from "next/head"

import config from "../config"
import Footer from "./Footer"
import NavBar from "./navbar"

const Layout = ({ children }: { children: any }) => {
    return <div className="h-100">
        <Head>
            <title>{config.name}</title>
            <meta name="description" content="PortFollio" />
            <link rel="icon" href={config.icon} />
        </Head>


        <NavBar />

        <main className="flex flex-col justify-center items-center py-5 h-full min-h-screen md:px-5" style={{ background: "rgb(67, 81, 101)" }}>
            {children}
        </main>

        <Footer />
    </div>
}

export default Layout