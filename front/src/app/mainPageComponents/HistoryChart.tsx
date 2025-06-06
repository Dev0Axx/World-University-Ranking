'use client'
import { Line } from 'react-chartjs-2'
import {
	Chart,
	registerables,
	type ChartOptions,
	type ChartData,
} from 'chart.js'
import { useHistoricalData } from '@/app/lib/hooks/useCovidData'
import { Box, Typography, Skeleton } from '@mui/material'

Chart.register(...registerables)

export default function HistoryChart() {
	const { data, isLoading, error } = useHistoricalData(365 * 10)

	if (error)
		return <Typography color='error'>Ошибка загрузки данных</Typography>
	if (isLoading) return <Skeleton variant='rectangular' height={400} />

	// Форматируем данные для графика
	const prepareChartData = (): ChartData<'line'> => {
		if (!data?.cases) return { labels: [], datasets: [] }

		const labels = Object.keys(data.cases)
		const casesData = Object.values(data.cases)
		const deathsData = Object.values(data.deaths)

		// Сглаживаем данные для лучшей визуализации (7-дневное скользящее среднее)
		const smoothData = (values: number[]) => {
			return values.map((val, idx, arr) => {
				const start = Math.max(0, idx - 3)
				const end = Math.min(arr.length - 1, idx + 3)
				const subset = arr.slice(start, end + 1)
				return Math.round(subset.reduce((a, b) => a + b, 0) / subset.length)
			})
		}

		return {
			labels,
			datasets: [
				{
					label: 'Случаи (7-дневное среднее)',
					data: smoothData(casesData),
					borderColor: '#3f51b5',
					backgroundColor: 'rgba(63, 81, 181, 0.1)',
					borderWidth: 2,
					tension: 0.1,
					pointRadius: 0,
					fill: true,
				},
				{
					label: 'Смерти (7-дневное среднее)',
					data: smoothData(deathsData),
					borderColor: '#f44336',
					backgroundColor: 'rgba(244, 67, 54, 0.1)',
					borderWidth: 2,
					tension: 0.1,
					pointRadius: 0,
				},
			],
		}
	}

	const chartOptions: ChartOptions<'line'> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			tooltip: {
				mode: 'index',
				intersect: false,
				callbacks: {
					label: context => {
						let label = context.dataset.label || ''
						if (label) label += ': '
						if (context.parsed.y !== null) {
							label += new Intl.NumberFormat('ru-RU').format(context.parsed.y)
						}
						return label
					},
				},
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
				ticks: {
					maxRotation: 45,
					minRotation: 45,
				},
			},
			y: {
				beginAtZero: true,
				ticks: {
					callback: value =>
						new Intl.NumberFormat('ru-RU').format(Number(value)),
				},
			},
		},
		interaction: {
			mode: 'nearest',
			axis: 'x',
			intersect: false,
		},
	}

	return (
		<Box sx={{ mb: 4, height: '500px', position: 'relative' }}>
			<Typography variant='h5' gutterBottom>
				Динамика пандемии за весь период
			</Typography>
			<Box sx={{ height: 'calc(100% - 40px)' }}>
				<Line data={prepareChartData()} options={chartOptions} />
			</Box>
		</Box>
	)
}
