/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import {
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Radar,
	Legend,
	ResponsiveContainer,
} from 'recharts'
import {
	Stack,
	Autocomplete,
	TextField,
	Button,
	Box,
	Typography,
} from '@mui/material'
import { University } from '@/app/interfaces'

const params = [
	{
		param: 'overall_score',
		name: 'University quality',
		fullMark: 100,
	},
	{
		param: 'scores_citations',
		name: 'Citations volume',
		fullMark: 100,
	},
	{
		param: 'scores_industry_income',
		name: 'Industry income',
		fullMark: 100,
	},
	{
		param: 'scores_international_outlook',
		name: 'International outlook',
		fullMark: 100,
	},
	{
		param: 'scores_research',
		name: 'Research quality',
		fullMark: 100,
	},
	{
		param: 'scores_teaching',
		name: 'Teaching quality',
		fullMark: 100,
	},
	{
		param: 'stats_student_staff_ratio',
		name: 'Student-staff ratio',
		fullMark: 100,
	},
]

interface Props {
	data: University[]
}

export default function RadarAnalytics({ data }: Props) {
	const [selectedUniversities, setSelectedUniversities] = useState<
		University[]
	>([data[0], data[10], data[20]])
	const [selectedParams, setSelectedParams] = useState(params)
	// const [showChart, setShowChart] = useState(true)

	const prepareChartData = () => {
		return selectedParams.map(param => {
			const dataPoint: any = {
				subject: param.name,
				fullMark: param.fullMark,
			}

			selectedUniversities.forEach(university => {
				dataPoint[university.name] =
					university[param.param as keyof University] || 0
			})

			return dataPoint
		})
	}

	const clearData = () => {
		setSelectedUniversities([])
		setSelectedParams([])
	}

	const chartData = prepareChartData()

	return (
		<Stack spacing={3}>
			<Box>
				<Typography variant='h6' gutterBottom>
					Select Universities
				</Typography>
				<Autocomplete
					multiple
					options={data}
					getOptionLabel={option => option.name}
					value={selectedUniversities}
					onChange={(_, newValue) => setSelectedUniversities(newValue)}
					renderInput={params => (
						<TextField
							{...params}
							label='Universities'
							placeholder='Search...'
						/>
					)}
					sx={{ mb: 2 }}
				/>

				<Typography variant='h6' gutterBottom>
					Select Parameters
				</Typography>
				<Autocomplete
					multiple
					options={params}
					getOptionLabel={option => option.name}
					value={selectedParams}
					onChange={(_, newValue) => setSelectedParams(newValue)}
					renderInput={params => (
						<TextField {...params} label='Parameters' placeholder='Search...' />
					)}
					sx={{ mb: 2 }}
				/>

				{/* <Button
					variant='contained'
					onClick={() => setShowChart(true)}
					disabled={
						selectedUniversities.length === 0 || selectedParams.length === 0
					}
				>
					Apply
				</Button> */}
			</Box>

			{selectedUniversities.length > 0 && selectedParams.length > 0 && (
				<Box>
					<ResponsiveContainer width='100%' height={400}>
						<RadarChart outerRadius={90} data={chartData}>
							<PolarGrid />
							<PolarAngleAxis dataKey='subject' />
							<PolarRadiusAxis angle={30} domain={[0, 100]} />
							{selectedUniversities.map((university, index) => {
								const colors = [
									'#8884d8',
									'#82ca9d',
									'#ffc658',
									'#ff8042',
									'#00C49F',
								]
								return (
									<Radar
										key={university.name}
										name={university.name}
										dataKey={university.name}
										stroke={colors[index % colors.length]}
										fill={colors[index % colors.length]}
										fillOpacity={0.6}
									/>
								)
							})}
							<Legend />
						</RadarChart>
					</ResponsiveContainer>
					<Stack alignItems='end'>
						<Button variant='outlined' onClick={clearData}>
							clear
						</Button>
					</Stack>
				</Box>
			)}
		</Stack>
	)
}
