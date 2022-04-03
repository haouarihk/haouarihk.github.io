import config from "../config";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex justify-evenly p-5 w-full  h-full bg-gray-800 border-t-2 border-slate-500 select-none">
      {config.socialMedia.map((social, i) => (
        <a key={i} href={social.value} rel="noopener noreferrer">
          <Image src={social.icon} alt={social.name} width={32} height={32} />
        </a>
      ))}
    </footer>
  );
};

export default Footer;
