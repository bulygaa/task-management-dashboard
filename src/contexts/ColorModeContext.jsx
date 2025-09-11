import React, { createContext, useContext, useState, useEffect } from 'react'

const ColorModeContext = createContext()

export function ColorModeProvider({ children }) {
    const [colorMode, setColorMode] = useState(() => {
        const saved = localStorage.getItem('chakra-ui-color-mode')
        if (saved) return saved

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    })

    useEffect(() => {
        localStorage.setItem('chakra-ui-color-mode', colorMode)
        document.documentElement.setAttribute('data-theme', colorMode)
    }, [colorMode])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e) => {
            if (!localStorage.getItem('chakra-ui-color-mode')) {
                setColorMode(e.matches ? 'dark' : 'light')
            }
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const toggleColorMode = () => {
        setColorMode(prev => prev === 'light' ? 'dark' : 'light')
    }

    const value = {
        colorMode,
        setColorMode,
        toggleColorMode,
    }

    return (
        <ColorModeContext.Provider value={value}>
            {children}
        </ColorModeContext.Provider>
    )
}

export function useColorMode() {
    const context = useContext(ColorModeContext)
    if (!context) {
        throw new Error('useColorMode must be used within a ColorModeProvider')
    }
    return context
}

export function useColorModeValue(light, dark) {
    const { colorMode } = useColorMode()
    return colorMode === 'dark' ? dark : light
}
