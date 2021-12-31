import { useState } from "react";



const Bio = ({ content, className }: { content: string, className: string }) => {
    const [viewMore, setViewMore] = useState(false)
    return <div className={(!viewMore ? "cursor-pointer" : "") + " " + className} onClick={() => setViewMore(true)} >
        {viewMore ? content : <><a className="text-slate-400">{content.slice(0, 32)}</a> {viewMore ? " read less" : "...read more"}</>}
    </div >
}

export default Bio;