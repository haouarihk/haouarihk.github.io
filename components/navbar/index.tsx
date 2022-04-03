// import PFP from "./pfp";
import { useState } from "react";
import config from "../../config";
import DarkThemeButton from "./darkThemeButton";
import { motion, AnimatePresence, Variants } from "framer-motion"
import NavItem from "./item";
// import Image from "next/image"

const links = [
  { name: "Profile", to: '/' },
  { name: "Projects", to: "/projects" },
  { name: "Submissions", to: "/submissions" },
  { name: "Contact Me", to: "/contact-me" },
  { name: "Paypal Me", to: "/paypal-me" },
];

const selected =
  "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium";
const notSelected =
  "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium";

const OpenedVariants: Variants = {
  closed: {
    maxHeight: "0px"
  },

  opened: {
    maxHeight: "300px"
  }
}


const NavBar = () => {
  const [opened, setOpened] = useState(false);

  const toggleOpened = () => setOpened(!opened);

  const linksx = links.map((link) => (
    <NavItem key={link.to} to={link.to}>
      {link.name}
    </NavItem>
  ))

  return (
    <AnimatePresence >
      <div className="z-20 bg-gray-800 select-none">
        <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex relative justify-between items-center h-16">
            <div className="flex absolute inset-y-0 left-0 items-center md:hidden">
              {/* <!-- Mobile menu button--> */}
              <button
                onClick={toggleOpened}
                type="button"
                className="inline-flex justify-center items-center p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* <!--
                        Icon when menu is open.

                        Heroicon name: outline/x

                        Menu open: "block", Menu closed: "hidden"
            --> */}
                <svg
                  className="hidden w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 justify-center items-center sm:justify-start sm:items-stretch">
              <div className="flex shrink-0 items-center">
                {/* logo if you want */}
              </div>

              <div className="hidden ml-6 md:block">
                <div className="flex space-x-4">
                  {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                  {linksx}
                </div>
              </div>
            </div>
            <div className="flex absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:pr-0 sm:ml-6">
              <DarkThemeButton />
              <div className="relative ml-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-8 h-8 rounded-full" src={config.pfp} alt="" />
              </div>
            </div>
          </div>


          <motion.div
            variants={OpenedVariants}
            animate={opened ? "opened" : "closed"}
            className="overflow-hidden sm:block sm:ml-6 md:hidden">
            <div className="flex flex-col space-x-4">
              {linksx}
            </div>
          </motion.div>

        </div>
      </div>
    </AnimatePresence>
  );
};

export default NavBar;
