import { Box, Typography, Stack, Paper, Button } from '@mui/material'
import { School, LocationOn, Star, Groups } from '@mui/icons-material'

export default function HomePage() {
	return (
		<Stack sx={{ py: 4 }} alignItems='center' direction='column'>
			{/* Заголовок */}
			<Box textAlign='center' mb={6}>
				<Typography
					variant='h3'
					component='h1'
					gutterBottom
					sx={{ fontWeight: 700 }}
				>
					University Analytics
				</Typography>
				<Typography variant='h6' color='text.secondary'>
					Analysis and comparison of the world's leading universities
				</Typography>
			</Box>

			{/* Ключевые преимущества */}
			<Stack direction='row' spacing={2} flexWrap='wrap'>
				<Paper
					sx={{ p: 3, textAlign: 'center', width: '230px', height: '210px' }}
					elevation={5}
				>
					<School color='primary' sx={{ fontSize: 50, mb: 2 }} />
					<Typography variant='h6' gutterBottom>
						2000+
					</Typography>
					<Typography>Universities in the database</Typography>
				</Paper>

				<Paper
					elevation={5}
					sx={{ p: 3, height: '210px', textAlign: 'center', width: '230px' }}
				>
					<LocationOn color='primary' sx={{ fontSize: 50, mb: 2 }} />
					<Typography variant='h6' gutterBottom>
						90+
					</Typography>
					<Typography>Countries of coverage</Typography>
				</Paper>

				<Paper
					elevation={5}
					sx={{ p: 3, height: '210px', textAlign: 'center', width: '230px' }}
				>
					<Star color='primary' sx={{ fontSize: 50, mb: 2 }} />
					<Typography variant='h6' gutterBottom>
						50+
					</Typography>
					<Typography>Evaluation criteria</Typography>
				</Paper>

				<Paper
					elevation={5}
					sx={{ p: 3, height: '210px', textAlign: 'center', width: '230px' }}
				>
					<Groups color='primary' sx={{ fontSize: 50, mb: 2 }} />
					<Typography variant='h6' gutterBottom>
						8M+
					</Typography>
					<Typography>Students</Typography>
				</Paper>
			</Stack>

			<Box textAlign='center' mt={4}>
				<Button
					variant='contained'
					size='large'
					href='/universities'
					sx={{ px: 4, py: 2 }}
				>
					View all universities
				</Button>
			</Box>
		</Stack>
	)
}
