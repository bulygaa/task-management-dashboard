import { createSystem, defaultConfig } from "@chakra-ui/react"

const config = {
    theme: {
        tokens: {
            colors: {
                brand: {
                    50: { value: "#e3f2f9" },
                    100: { value: "#c5e4f3" },
                    200: { value: "#a2d4ec" },
                    300: { value: "#7ac1e4" },
                    400: { value: "#47a9da" },
                    500: { value: "#0088cc" },
                    600: { value: "#007ab8" },
                    700: { value: "#006ba1" },
                    800: { value: "#005885" },
                    900: { value: "#003f5e" },
                },
            },
        },
        semanticTokens: {
            colors: {
                'bg.canvas': {
                    value: { base: '{colors.white}', _dark: '{colors.gray.900}' }
                },
                'bg.surface': {
                    value: { base: '{colors.white}', _dark: '{colors.gray.800}' }
                },
                'bg.muted': {
                    value: { base: '{colors.gray.50}', _dark: '{colors.gray.900}' }
                },
                'border.emphasized': {
                    value: { base: '{colors.gray.200}', _dark: '{colors.gray.600}' }
                },
                'text.default': {
                    value: { base: '{colors.gray.900}', _dark: '{colors.white}' }
                },
                'text.muted': {
                    value: { base: '{colors.gray.600}', _dark: '{colors.gray.400}' }
                },
            },
        },
        globalCss: {
            html: {
                colorScheme: { base: 'light', _dark: 'dark' },
            },
            body: {
                bg: { base: '{colors.white}', _dark: '{colors.gray.900}' },
                color: { base: '{colors.gray.900}', _dark: '{colors.white}' },
                transition: 'background-color 0.2s, color 0.2s',
            },
        },
    },
}

export const system = createSystem(defaultConfig, config)
