'use client'
import { Stack, Typography, Skeleton, Box } from '@mui/material'
import { useWorldData } from '@/app/lib/hooks/useCovidData'

export default function WorldStats() {
	const { data, isLoading, error } = useWorldData()

	if (error) return <Typography color='error'>Ошибка загрузки</Typography>

	const stats = [
		{ label: 'Всего случаев', value: data?.cases },
		{ label: 'Смертей', value: data?.deaths },
		{ label: 'Выздоровело', value: data?.recovered },
	]

	return (
		<Stack direction='column' alignItems='center' my={4}>
			<Typography variant='h4' gutterBottom>
				Мировая статистика
			</Typography>
			<Stack direction='row'>
				{stats.map(stat => (
					<Stack
						key={stat.label}
						direction='row'
						alignItems='center'
						textAlign='center'
					>
						<Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
							{isLoading ? (
								<Skeleton variant='text' width='60%' height={40} />
							) : (
								<>
									<Typography variant='h6'>{stat.label}</Typography>
									<Typography variant='h4' color='primary'>
										{stat.value?.toLocaleString()}
									</Typography>
								</>
							)}
						</Box>
					</Stack>
				))}
			</Stack>
		</Stack>
	)
}
