import { motion } from 'framer-motion'
import { usePreferences } from '../../context/preferences'

export default function DarkThemeButton() {
  const { darkMode, setDarkMode } = usePreferences()
  return (
    <div onClick={() => setDarkMode()}>
      <button className="p-3 mr-6 rounded-full border-black cursor-pointer">
        {/* <SunIcon className="hidden h-5 w-5 text-white dark:block" />
            <MoonIcon className="h-5 w-5 text-black dark:hidden" /> */}

        <svg
          className="w-8 h-8 fill-black dark:fill-white"
          width="472.39"
          height="472.39"
          viewBox="0 0 472.39 472.39"
          aria-hidden="true"
          data-testid="Brightness4Icon"
        >
          <motion.g
            animate={darkMode ? 'righti' : 'lefti'}
            variants={{
              lefti: {
                rotate: 360
              },
              righti: {
                rotate: 0
              }
            }}
          >
            <path d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z" />
          </motion.g>

          <motion.g
            animate={darkMode ? 'righti' : 'lefti'}
            variants={{
              lefti: {
                translateX: -40
              },
              righti: {
                translateX: 0
              }
            }}
          >
            <circle
              className="w-6 h-6"
              cx="236.2"
              cy="236.2"
              r="103.78"
            />
          </motion.g>
        </svg>
      </button>
    </div>
  )
}
