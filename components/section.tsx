import { motion } from "framer-motion";



const Section = ({ title, children, className, delay }: { title?: string, children: any, delay?: number, className?: string }) => {
    return <motion.div initial="hidden" animate="visible" variants={{
        hidden: {
            scale: .8,
            opacity: 0
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                delay: delay || 0.1
            }
        },
    }} className={className + " p-3 pt-0"} >
        {title ? <h1 className="self-center m-4 ml-4 text-4xl decoration-0">{title}</h1> : <></>}
        {children}


    </motion.div>
}


export default Section;