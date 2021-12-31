import { Project } from "../config"
import Image from "next/image"

import router from "next/router"
import Link from "next/link"
const List = ({ projects }: { projects: Project[] }) => {

    const moveTo = (href: string) => {
        router.push(href)
    }

    return <div className="p-5 md:m-2 flex flex-wrap justify-center flex-row ">
        {
            projects.map((project, i) =>
                <div key={i} className="flex md:mx-5 my-5 pb-5 flex-col w-full max-w-sm rounded-2xl overflow-hidden hover:shadow-2xl shadow-black  bg-gray-800">

                    {/* banner */}
                    {
                        project.banner && <Image width={1024} height={512} className="w-full h-20 object-none" src={project.banner} alt="banner" />
                    }

                    <div className="h-full flex flex-col justify-between">
                        <div className="p-5">

                            {/* title */}
                            <div className="text-4xl mb-5"> {project.name}</div>

                            {/* details */}
                            <div> {project.description}</div>

                        </div>

                        <div className="flex flex-row justify-between px-4 ">
                            {/* button to redirect */}
                            <div className="flex flex-1 p-3 mt-5 flex-wrap">
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