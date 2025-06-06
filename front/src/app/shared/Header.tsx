// components/AppHeader.tsx
'use client'
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
	useTheme,
	Box,
} from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
// import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useThemeContext } from '../providers/ThemeContext'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'

export default function AppHeader() {
	const { toggleTheme } = useThemeContext()
	const router = useRouter()
	const theme = useTheme()
	const isDark = theme.palette.mode === 'dark'

	const [mobileOpen, setMobileOpen] = useState(false)

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}

	// Список навигационных ссылок
	const navItems = [
		{ label: 'Главная', path: '/' },
		{ label: 'Страны', path: '/countries' },
		{ label: 'Карта', path: '/map' },
		{ label: 'История', path: '/history' },
	]

	return (
		<>
			<AppBar position='static'>
				<Toolbar>
					{/* Кнопка меню для мобильных */}
					<IconButton
						color='inherit'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>

					<Typography variant='h6' sx={{ flexGrow: 1 }}>
						COVID-19 Stats
					</Typography>

					{/* Навигация */}
					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						{navItems.map(item => (
							<Button
								key={item.path}
								color='inherit'
								onClick={() => router.push(item.path)}
							>
								{item.label}
							</Button>
						))}
					</Box>

					{/* Кнопка темы */}
					<IconButton color='inherit' onClick={toggleTheme}>
						{isDark ? <Brightness7 /> : <Brightness4 />}
					</IconButton>
				</Toolbar>
			</AppBar>
			{/* Мобильное меню */}
			<Drawer
				variant='temporary'
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{ keepMounted: true }}
				sx={{ display: { xs: 'block', sm: 'none' } }}
			>
				<Box onClick={handleDrawerToggle} sx={{ p: 2 }}>
					{navItems.map(item => (
						<Button
							key={item.path}
							fullWidth
							onClick={() => router.push(item.path)}
						>
							{item.label}
						</Button>
					))}
				</Box>
			</Drawer>
		</>
	)
}
