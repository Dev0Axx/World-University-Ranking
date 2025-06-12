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

	// Navigation items in English
	const navItems = [
		{ label: 'Home', path: '/' },
		{ label: 'Universities', path: '/universities' },
		{ label: 'Analytics', path: '/analytics' },
		{ label: 'Rating', path: '/rating' },
		{ label: 'Rankings', path: '/rankings' },
	]

	return (
		<>
			<AppBar position='static' elevation={1}>
				<Toolbar>
					{/* Mobile menu button */}
					<IconButton
						color='inherit'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>

					<Typography
						variant='h6'
						component='div'
						sx={{
							flexGrow: 1,
							fontWeight: 700,
							fontFamily: '"Helvetica Neue", Arial, sans-serif',
						}}
					>
						University Analytics Dashboard
					</Typography>

					{/* Desktop navigation */}
					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						{navItems.map(item => (
							<Button
								key={item.path}
								color='inherit'
								onClick={() => router.push(item.path)}
								sx={{
									mx: 1,
									'&:hover': {
										backgroundColor: 'rgba(255, 255, 255, 0.1)',
									},
								}}
							>
								{item.label}
							</Button>
						))}
					</Box>

					{/* Theme toggle button */}
					<IconButton color='inherit' onClick={toggleTheme} sx={{ ml: 2 }}>
						{isDark ? <Brightness7 /> : <Brightness4 />}
					</IconButton>
				</Toolbar>
			</AppBar>

			{/* Mobile menu */}
			<Drawer
				variant='temporary'
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{ keepMounted: true }}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': {
						width: 240,
					},
				}}
			>
				<Box
					onClick={handleDrawerToggle}
					sx={{
						p: 2,
						display: 'flex',
						flexDirection: 'column',
						height: '100%',
						backgroundColor: theme.palette.background.paper,
					}}
				>
					{navItems.map(item => (
						<Button
							key={item.path}
							fullWidth
							onClick={() => router.push(item.path)}
							sx={{
								my: 1,
								color: theme.palette.text.primary,
								justifyContent: 'flex-start',
							}}
						>
							{item.label}
						</Button>
					))}
				</Box>
			</Drawer>
		</>
	)
}
