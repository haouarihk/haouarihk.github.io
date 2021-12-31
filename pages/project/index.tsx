import { AppProps } from "next/app";
import { useEffect } from "react";
import router from "next/router"

function Project(props:AppProps) {
    // redirect to /projects
    useEffect(() => {
        router.push('/projects');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return null
}


export default Project;