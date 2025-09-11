import React, { createContext, useContext, useState, useEffect } from 'react'
import {colorMode as colorModeEnum} from "../enums/colorMode.js";

const ColorModeContext = createContext()

export function ColorModeProvider({ children }) {
    const [colorMode, setColorMode] = useState(() => {
        const saved = localStorage.getItem('chakra-ui-color-mode')
        if (saved) return saved

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? colorModeEnum.DARK : colorModeEnum.LIGHT
    })

    useEffect(() => {
        localStorage.setItem('chakra-ui-color-mode', colorMode)
        document.documentElement.setAttribute('data-theme', colorMode)
    }, [colorMode])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e) => {
            if (!localStorage.getItem('chakra-ui-color-mode')) {
                setColorMode(e.matches ? colorModeEnum.DARK : colorModeEnum.LIGHT)
            }
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const toggleColorMode = () => {
        setColorMode(prev => prev === colorModeEnum.LIGHT ? colorModeEnum.DARK : colorModeEnum.LIGHT)
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
    return colorMode === colorModeEnum.DARK ? dark : light
}
