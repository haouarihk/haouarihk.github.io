import Image from "next/image";


const PFP = ({ src, className, size }: { src: string, className?: string, size?: number }) => {
    return <Image width={size || 32} height={size || 32} src={src} alt="pfp" className={className} />
};

export default PFP;