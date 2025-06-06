'use client'
import CssBaseline from '@mui/material/CssBaseline'
import { ReactQueryProvider } from '../react-query-provider'
import { CustomThemeProvider } from './ThemeContext'

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<CustomThemeProvider>
			<CssBaseline />
			<ReactQueryProvider>{children}</ReactQueryProvider>
		</CustomThemeProvider>
	)
}
