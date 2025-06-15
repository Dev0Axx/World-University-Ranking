'use client'

/* eslint-disable react/no-unescaped-entities */
import { Box, Typography, Stack, Paper, Button } from '@mui/material'
import {
	School,
	LocationOn,
	Groups,
	TrendingUp,
	Compare,
	BarChart,
	Search,
	Straighten,
	Diversity3,
} from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { styled } from '@mui/material/styles'

const FeatureCard = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(4),
	borderRadius: '16px',
	flex: 1,
	minWidth: 250,
	transition: 'all 0.3s ease',
	'&:hover': {
		transform: 'translateY(-5px)',
		boxShadow: theme.shadows[6],
	},
}))

const StatItem = ({
	icon,
	value,
	label,
	description,
}: {
	icon: React.ReactNode
	value: string
	label: string
	description: string
}) => (
	<Paper
		sx={{
			p: 3,
			textAlign: 'center',
			flex: 1,
			minWidth: 200,
			position: 'relative',
			overflow: 'hidden',
			'&:after': {
				content: '""',
				position: 'absolute',
				bottom: 0,
				left: '50%',
				transform: 'translateX(-50%)',
				width: '60%',
				height: 4,
				background: 'linear-gradient(90deg, #3f51b5, #2196f3)',
			},
		}}
	>
		<Box sx={{ color: 'primary.main', fontSize: 40, mb: 2 }}>{icon}</Box>
		<Typography variant='h4' sx={{ fontWeight: 700, mb: 1 }}>
			{value}
		</Typography>
		<Typography variant='h6' sx={{ mb: 1 }}>
			{label}
		</Typography>
		<Typography variant='body2' color='text.secondary'>
			{description}
		</Typography>
	</Paper>
)

export default function HomePage() {
	const router = useRouter()

	return (
		<Box sx={{ py: 8, px: { xs: 2, sm: 4, md: 6 } }}>
			{/* Hero Section */}
			<Stack
				alignItems='center'
				spacing={3}
				sx={{ mb: 8, textAlign: 'center' }}
			>
				<Typography
					variant='h1'
					sx={{
						fontWeight: 800,
						fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
						lineHeight: 1.2,
					}}
				>
					Explore{' '}
					<Box component='span' color='primary.main'>
						2,500+
					</Box>{' '}
					Global Universities
				</Typography>

				<Typography variant='h5' color='text.secondary' sx={{ maxWidth: 700 }}>
					Comprehensive data, rankings and comparison tools for higher education
					institutions worldwide
				</Typography>

				<Stack
					direction={{ xs: 'column', sm: 'row' }}
					spacing={2}
					sx={{ mt: 3 }}
				>
					<Button
						variant='contained'
						size='large'
						onClick={() => router.push('/universities')}
						startIcon={<Search />}
						sx={{ px: 4, py: 1.5 }}
					>
						Browse Institutions
					</Button>
					<Button
						variant='outlined'
						size='large'
						onClick={() => router.push('/comparison')}
						startIcon={<Compare />}
						sx={{ px: 4, py: 1.5 }}
					>
						Compare Universities
					</Button>
				</Stack>
			</Stack>

			{/* Stats Section */}
			<Stack
				direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }}
				spacing={3}
				sx={{
					mb: 8,
					'& > *': { flex: 1 },
				}}
			>
				<StatItem
					icon={<School fontSize='large' />}
					value='2,500+'
					label='Universities'
					description='From Ivy League to local gems'
				/>
				<StatItem
					icon={<LocationOn fontSize='large' />}
					value='90+'
					label='Countries'
					description='Global coverage'
				/>
				<StatItem
					icon={<Groups fontSize='large' />}
					value='8M+'
					label='Students'
					description='In our database'
				/>
				<StatItem
					icon={<BarChart fontSize='large' />}
					value='50+'
					label='Metrics'
					description='For detailed analysis'
				/>
			</Stack>

			{/* Features Section */}
			<Box sx={{ mb: 8 }}>
				<Typography
					variant='h3'
					sx={{
						fontWeight: 700,
						mb: 6,
						textAlign: 'center',
					}}
				>
					Powerful University Analytics
				</Typography>

				<Stack
					direction={{ xs: 'column', md: 'row' }}
					spacing={3}
					sx={{ mb: 4 }}
				>
					<FeatureCard elevation={3}>
						<Box sx={{ color: 'primary.main', fontSize: 40, mb: 3 }}>
							<Straighten fontSize='inherit' />
						</Box>
						<Typography variant='h5' sx={{ fontWeight: 600, mb: 2 }}>
							Detailed Metrics
						</Typography>
						<Typography color='text.secondary'>
							Compare teaching quality, research output, citations,
							international outlook and more across all institutions.
						</Typography>
					</FeatureCard>

					<FeatureCard elevation={3}>
						<Box sx={{ color: 'primary.main', fontSize: 40, mb: 3 }}>
							<TrendingUp fontSize='inherit' />
						</Box>
						<Typography variant='h5' sx={{ fontWeight: 600, mb: 2 }}>
							Performance Trends
						</Typography>
						<Typography color='text.secondary'>
							Track university rankings over time and identify rising
							institutions in specific academic fields.
						</Typography>
					</FeatureCard>

					<FeatureCard elevation={3}>
						<Box sx={{ color: 'primary.main', fontSize: 40, mb: 3 }}>
							<Diversity3 fontSize='inherit' />
						</Box>
						<Typography variant='h5' sx={{ fontWeight: 600, mb: 2 }}>
							Student Diversity
						</Typography>
						<Typography color='text.secondary'>
							Analyze student-staff ratios, international student percentages,
							and gender balance metrics.
						</Typography>
					</FeatureCard>
				</Stack>
			</Box>

			{/* CTA Section */}
			<Paper
				elevation={5}
				sx={{
					p: 4,
					textAlign: 'center',
				}}
			>
				<Typography variant='h4' sx={{ fontWeight: 700, mb: 2 }}>
					Ready to Find Your Perfect University?
				</Typography>
				<Typography
					color='text.secondary'
					sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}
				>
					Start exploring now or compare up to 5 institutions side-by-side.
				</Typography>
				<Button
					variant='contained'
					size='large'
					onClick={() => router.push('/comparison')}
					startIcon={<Compare />}
					sx={{ px: 6, py: 1.5 }}
				>
					Start Comparing
				</Button>
			</Paper>
		</Box>
	)
}
