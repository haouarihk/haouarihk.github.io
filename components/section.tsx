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
        {title ? <h1 className="ml-4 decoration-0 text-4xl self-center m-4">{title}</h1> : <></>}
        {children}


    </motion.div>
}


export default Section;