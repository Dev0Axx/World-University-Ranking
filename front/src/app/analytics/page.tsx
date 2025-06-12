'use client'

import React from 'react'
import {
	Stack,
	Box,
	Typography,
	useTheme,
	useMediaQuery,
	Paper,
} from '@mui/material'
import RadarAnalytics from './Radar'
import { useUniversitiesData } from '../lib/requests/getUniversitiesData'
import UniversityComparison from './UniversityComparison'
import CircularProgress from '@mui/material/CircularProgress'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

export default function AnalyticsPage() {
	const { data, isLoading, isError } = useUniversitiesData()
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))

	if (isLoading) {
		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='60vh'
			>
				<CircularProgress />
			</Box>
		)
	}

	if (isError) {
		return (
			<Box
				display='flex'
				flexDirection='column'
				justifyContent='center'
				alignItems='center'
				minHeight='60vh'
				color='error.main'
			>
				<ErrorOutlineIcon fontSize='large' />
				<Typography variant='h6' mt={2}>
					Произошла ошибка при загрузке данных
				</Typography>
			</Box>
		)
	}

	if (data) {
		return (
			<Box p='16px 24px'>
				<Typography
					variant='h4'
					component='h1'
					gutterBottom
					textAlign='center'
					fontWeight='medium'
					sx={{
						mb: 2,
					}}
				>
					Comparison of universities
				</Typography>

				<Stack direction={isMobile ? 'column' : 'row'} spacing={4}>
					<Paper
						elevation={5}
						sx={{
							flex: 1,
							p: 3,
							borderRadius: 2,
						}}
					>
						<Typography variant='h5' textAlign='center'>
							Radar chart
						</Typography>

						<RadarAnalytics data={data} />
					</Paper>

					<Paper
						elevation={5}
						sx={{
							flex: 1,
							p: 3,
							borderRadius: 2,
						}}
					>
						<Typography variant='h5' textAlign='center'>
							Comparison of indicators
						</Typography>
						<UniversityComparison data={data} />
					</Paper>
				</Stack>
			</Box>
		)
	}

	return null
}
