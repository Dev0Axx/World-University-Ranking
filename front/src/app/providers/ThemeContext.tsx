'use client'
import { createContext, useContext, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material'

type ThemeMode = 'light' | 'dark'

const ThemeContext = createContext({
	toggleTheme: () => {},
	mode: 'light' as ThemeMode,
})

export function useThemeContext() {
	return useContext(ThemeContext)
}

export function CustomThemeProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [mode, setMode] = useState<ThemeMode>('light')

	const theme = createTheme({
		palette: {
			mode,
			primary: {
				main: '#3f51b5',
			},
		},
	})

	const toggleTheme = () => {
		setMode(prev => (prev === 'light' ? 'dark' : 'light'))
	}

	return (
		<ThemeContext.Provider value={{ toggleTheme, mode }}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ThemeContext.Provider>
	)
}
