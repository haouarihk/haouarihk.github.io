import { Project } from "../config"
import Image from "next/image"

import router from "next/router"
import Link from "next/link"
const List = ({ projects }: { projects: Project[] }) => {

    const moveTo = (href: string) => {
        router.push(href)
    }

    return <div className="flex flex-row flex-wrap justify-center p-5 md:m-2 ">
        {
            projects.map((project, i) =>
                <div key={i} className="flex overflow-hidden flex-col pb-5 my-5 w-full max-w-sm bg-gray-800 rounded-2xl hover:shadow-2xl shadow-black  md:mx-5">

                    {/* banner */}
                    {
                        project.banner && <Image width={1024} height={512} className="object-none w-full h-20" src={project.banner} alt="banner" />
                    }

                    <div className="flex flex-col justify-between h-full">
                        <div className="p-5">

                            {/* title */}
                            <div className="mb-5 text-4xl"> {project.name}</div>

                            {/* details */}
                            <div> {project.description}</div>

                        </div>

                        <div className="flex flex-row justify-between px-4 ">
                            {/* button to redirect */}
                            <div className="flex flex-wrap flex-1 p-3 mt-5">
                                {
                                    project?.links?.map((link, i) => <Link passHref key={i} href={link.link}><Image className="cursor-pointer" width={32} height={32} key={i} src={link.icon} alt={link.name} /></Link>)
                                }
                            </div>

                            {/* try it  */}
                            <div className="flex p-3 mt-5">
                                {
                                    project.tryItLink && <a href={project.tryItLink} target="_blank" className="text-slate-400" rel="noreferrer">Try it</a>
                                }
                            </div>

                        </div>
                    </div>


                </div>
            )
        }
    </div>
}

export default List