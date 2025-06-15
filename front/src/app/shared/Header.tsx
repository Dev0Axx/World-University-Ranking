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
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Divider,
} from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { useThemeContext } from '../providers/ThemeContext'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'
import { motion } from 'framer-motion'

export default function AppHeader() {
	const { toggleTheme } = useThemeContext()
	const router = useRouter()
	const theme = useTheme()
	const isDark = theme.palette.mode === 'dark'

	const [mobileOpen, setMobileOpen] = useState(false)

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}

	// Navigation items
	const navItems = [
		{ label: 'Home', path: '/' },
		{ label: 'Universities', path: '/universities' },
		{ label: 'Analytics', path: '/analytics' },
		{ label: 'Rating', path: '/rating' },
		{ label: 'Comparison', path: '/comparison' },
	]

	return (
		<>
			<AppBar
				position='static'
				elevation={0}
				sx={{
					background: 'transparent',
					backdropFilter: 'blur(10px)',
					backgroundColor:
						theme.palette.mode === 'dark'
							? 'rgba(18, 18, 18, 0.8)'
							: 'rgba(255, 255, 255, 0.8)',
					borderBottom: `1px solid ${
						theme.palette.mode === 'dark'
							? 'rgba(255, 255, 255, 0.12)'
							: 'rgba(0, 0, 0, 0.12)'
					}`,
				}}
			>
				<Toolbar sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
					{/* Mobile menu button */}
					<IconButton
						edge='start'
						onClick={handleDrawerToggle}
						sx={{
							mr: 2,
							display: { xl: 'none' },
						}}
					>
						<MenuIcon />
					</IconButton>

					<Typography
						variant='h6'
						component={motion.div}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						sx={{
							flexGrow: 1,
							fontWeight: 700,
							fontFamily: '"Helvetica Neue", Arial, sans-serif',
							background:
								theme.palette.mode === 'dark'
									? 'linear-gradient(90deg, #64b5f6, #bbdefb)'
									: 'linear-gradient(90deg, #1976d2, #2196f3)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
						}}
					>
						University Analytics
					</Typography>

					{/* Desktop navigation */}
					<Box sx={{ display: { xs: 'none', xl: 'flex' }, gap: 1 }}>
						{navItems.map((item, index) => (
							<motion.div
								key={item.path}
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
							>
								<Button
									color='primary'
									onClick={() => router.push(item.path)}
									sx={{
										mx: 0.5,
										px: 2,
										borderRadius: 2,
										textTransform: 'none',
										fontSize: '0.9rem',
										fontWeight: 500,
										'&:hover': {
											backgroundColor:
												theme.palette.mode === 'dark'
													? 'rgba(144, 202, 249, 0.1)'
													: 'rgba(25, 118, 210, 0.1)',
										},
									}}
								>
									{item.label}
								</Button>
							</motion.div>
						))}
					</Box>

					{/* Theme toggle button */}
					<IconButton
						onClick={toggleTheme}
						sx={{
							ml: 2,
							'&:hover': {
								transform: 'rotate(15deg)',
								transition: 'transform 0.3s ease',
							},
						}}
					>
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
					'& .MuiDrawer-paper': {
						width: 280,
						boxSizing: 'border-box',
						background: theme.palette.background.default,
					},
				}}
			>
				<Box
					sx={{
						p: 2,
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Typography
						variant='h6'
						sx={{
							px: 2,
							py: 1,
							mb: 1,
							fontWeight: 700,
							background:
								theme.palette.mode === 'dark'
									? 'linear-gradient(90deg, #64b5f6, #bbdefb)'
									: 'linear-gradient(90deg, #1976d2, #2196f3)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
						}}
					>
						Menu
					</Typography>
					<Divider />
					<List>
						{navItems.map(item => (
							<ListItem
								key={item.path}
								disablePadding
								sx={{
									my: 0.5,
								}}
							>
								<ListItemButton
									onClick={() => {
										router.push(item.path)
										handleDrawerToggle()
									}}
									sx={{
										borderRadius: 1,
										px: 3,
										'&:hover': {
											backgroundColor:
												theme.palette.mode === 'dark'
													? 'rgba(144, 202, 249, 0.1)'
													: 'rgba(25, 118, 210, 0.1)',
										},
									}}
								>
									<ListItemText
										primary={item.label}
										primaryTypographyProps={{
											fontWeight: 500,
										}}
									/>
								</ListItemButton>
							</ListItem>
						))}
					</List>
					<Box sx={{ mt: 'auto', p: 2 }}>
						<Divider sx={{ mb: 2 }} />
						<Typography variant='body2' color='text.secondary'>
							University Analytics Dashboard
						</Typography>
					</Box>
				</Box>
			</Drawer>
		</>
	)
}
