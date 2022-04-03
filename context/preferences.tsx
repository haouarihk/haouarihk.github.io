import { createContext, useContext, useEffect, useState } from 'react'
import useFirstRender from '../components/utils/useFirstRender'

export type Preferences = {
  darkMode: boolean
  language: string
  setDarkMode: (darkMode?: boolean) => void
}

const defaultPreferences: Preferences = {
  darkMode: false,
  language: 'en',
  setDarkMode: () => {
    console.trace('something is wrong')
  }
}

export const PreferencesContext = createContext<Preferences>(defaultPreferences)

export function usePreferences() {
  return useContext(PreferencesContext)
}

export function PreferencesProvider({ children }: any) {
  const [darkMode, setDarkMode] = useState<boolean | undefined>(
    defaultPreferences.darkMode
  )

  const firstRender = useFirstRender()

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (!firstRender) return

    const localStorageDarkMode = localStorage.getItem('darkMode')

    // Set default value in the localstorage, if it wasn't there
    if (localStorageDarkMode === null) {
      localStorage.setItem('darkMode', '' + defaultPreferences.darkMode)
      return
    }

    setDarkMode(localStorageDarkMode === 'true')
  }, [firstRender])

  useEffect(() => {
    if (typeof window === 'undefined') return

    // if the user wants to toggle.
    if (darkMode === undefined) {
      localStorage.setItem(
        'darkMode',
        // get the opposite
        '' + (localStorage.getItem('darkMode') !== 'true')
      )

      setDarkMode(document.body.classList.toggle('dark'))
      return
    }

    document.body.classList.toggle('dark', darkMode)
    // if the user wants to set the dark mode
    localStorage.setItem('darkMode', '' + darkMode)
  }, [darkMode])

  const value: Preferences = {
    ...defaultPreferences,
    darkMode: darkMode || defaultPreferences.darkMode,
    setDarkMode
  }
  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  )
}
