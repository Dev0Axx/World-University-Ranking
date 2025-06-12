'use client'
import { useState } from 'react'
import {
	Box,
	Typography,
	Slider,
	Stack,
	Card,
	CardContent,
	Chip,
	Divider,
	Button,
	Skeleton,
	Paper,
} from '@mui/material'
import { useTopUniversities } from '@/app/lib/requests/getUniversitiesData'

const ScoreBar = ({ value, color }: { value: number; color: string }) => (
	<Box
		sx={{
			width: '100%',
			height: 8,
			bgcolor: '#e0e0e0',
			borderRadius: 4,
			overflow: 'hidden',
			mt: 1,
		}}
	>
		<Box
			sx={{
				width: `${value}%`,
				height: '100%',
				bgcolor: color,
				transition: 'width 0.3s ease',
			}}
		/>
	</Box>
)

export default function TopUniversitiesPage() {
	const [tempLimit, setTempLimit] = useState(10)
	const [limit, setLimit] = useState(10)
	const { data: universities, isLoading } = useTopUniversities(limit)

	const handleSliderChange = (event: Event, newValue: number | number[]) => {
		setTempLimit(newValue as number)
	}

	const handleApplyClick = () => {
		setLimit(tempLimit)
	}

	return (
		<Box sx={{ p: 4, maxWidth: 1400, margin: '0 auto' }}>
			<Typography variant='h4' gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
				🏆 Top universities by overall rating
			</Typography>

			<Paper
				elevation={5}
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 3,
					mb: 4,
					p: 3,
					borderRadius: 2,
				}}
			>
				<Box sx={{ flexGrow: 1 }}>
					<Typography gutterBottom sx={{ mb: 2 }}>
						Number of universities: <strong>{tempLimit}</strong>
					</Typography>
					<Slider
						value={tempLimit}
						onChange={handleSliderChange}
						min={1}
						max={50}
						step={1}
						sx={{ maxWidth: 400 }}
					/>
				</Box>
				<Button
					variant='contained'
					onClick={handleApplyClick}
					sx={{ height: 40 }}
				>
					apply
				</Button>
			</Paper>

			{isLoading ? (
				<Stack spacing={3}>
					{[...Array(10)].map((_, index) => (
						<Skeleton
							key={index}
							variant='rectangular'
							height={180}
							sx={{ borderRadius: 2 }}
						/>
					))}
				</Stack>
			) : (
				<Stack spacing={3}>
					{universities?.map((uni, index) => (
						<Card
							key={uni.name}
							sx={{
								boxShadow: 3,
								borderLeft: `4px solid ${
									index < 3
										? ['#FFD700', '#C0C0C0', '#CD7F32'][index]
										: '#1976d2'
								}`,
								transition: 'transform 0.2s',
								'&:hover': {
									transform: 'translateY(-2px)',
									boxShadow: 8,
								},
							}}
						>
							<CardContent>
								<Stack
									direction='row'
									alignItems='center'
									spacing={2}
									sx={{ mb: 2 }}
								>
									<Chip
										label={`${index + 1}`}
										color={index < 3 ? 'primary' : 'default'}
										sx={{
											width: 40,
											height: 40,
											fontSize: '1.2rem',
											fontWeight: 'bold',
										}}
									/>
									<Box>
										<Typography variant='h6' sx={{ fontWeight: 600 }}>
											{uni.name}
										</Typography>
										<Typography variant='body2' color='text.secondary'>
											{uni.location} • Overall rating:{' '}
											{uni.overall_score.toFixed(1)}
										</Typography>
									</Box>
								</Stack>

								<Divider sx={{ my: 2 }} />

								<Box
									sx={{
										display: 'grid',
										gridTemplateColumns: {
											xs: '1fr',
											sm: '1fr 1fr',
											md: 'repeat(3, 1fr)',
										},
										gap: 3,
									}}
								>
									<Box>
										<Typography variant='body2' color='text.secondary'>
											Teaching quality
										</Typography>
										<Typography sx={{ fontWeight: 500 }}>
											{uni.scores_teaching.toFixed(1)}
										</Typography>
										<ScoreBar value={uni.scores_teaching} color='#4CAF50' />
									</Box>
									<Box>
										<Typography variant='body2' color='text.secondary'>
											Scientific research
										</Typography>
										<Typography sx={{ fontWeight: 500 }}>
											{uni.scores_research.toFixed(1)}
										</Typography>
										<ScoreBar value={uni.scores_research} color='#2196F3' />
									</Box>
									<Box>
										<Typography variant='body2' color='text.secondary'>
											Citations
										</Typography>
										<Typography sx={{ fontWeight: 500 }}>
											{uni.scores_citations.toFixed(1)}
										</Typography>
										<ScoreBar value={uni.scores_citations} color='#9C27B0' />
									</Box>
									<Box>
										<Typography variant='body2' color='text.secondary'>
											Income from the industry
										</Typography>
										<Typography sx={{ fontWeight: 500 }}>
											{uni.scores_industry_income.toFixed(1)}
										</Typography>
										<ScoreBar
											value={uni.scores_industry_income}
											color='#FF9800'
										/>
									</Box>
									<Box>
										<Typography variant='body2' color='text.secondary'>
											International cooperation
										</Typography>
										<Typography sx={{ fontWeight: 500 }}>
											{uni.scores_international_outlook.toFixed(1)}
										</Typography>
										<ScoreBar
											value={uni.scores_international_outlook}
											color='#E91E63'
										/>
									</Box>
									<Box>
										<Typography variant='body2' color='text.secondary'>
											Number of students
										</Typography>
										<Typography sx={{ fontWeight: 500 }}>
											{uni.stats_number_students}
										</Typography>
										<Typography
											variant='body2'
											color='text.secondary'
											sx={{ mt: 1 }}
										>
											Student/faculty ratio: {uni.stats_student_staff_ratio}
										</Typography>
									</Box>
								</Box>
							</CardContent>
						</Card>
					))}
				</Stack>
			)}
		</Box>
	)
}
