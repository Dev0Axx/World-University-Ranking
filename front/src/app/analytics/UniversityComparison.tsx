'use client'

import React, { useState } from 'react'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
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
	},
	{
		param: 'scores_citations',
		name: 'Citations volume',
	},
	{
		param: 'scores_industry_income',
		name: 'Industry income',
	},
	{
		param: 'scores_international_outlook',
		name: 'International outlook',
	},
	{
		param: 'scores_research',
		name: 'Research quality',
	},
	{
		param: 'scores_teaching',
		name: 'Teaching quality',
	},
	{
		param: 'stats_student_staff_ratio',
		name: 'Student-staff ratio',
	},
]

interface Props {
	data: University[]
}

export default function UniversityComparison({ data }: Props) {
	const [selectedUniversities, setSelectedUniversities] = useState<
		University[]
	>([data[0], data[10], data[20]])
	const [selectedParam, setSelectedParam] = useState(params[0])
	// const [showChart, setShowChart] = useState(true)

	const prepareChartData = () => {
		return selectedUniversities.map(university => ({
			name: university.name,
			value: university[selectedParam.param as keyof University] || 0,
		}))
	}

	const clearData = () => {
		setSelectedUniversities([])
		// setShowChart(false)
		setSelectedParam(params[0])
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
					Select Parameter
				</Typography>
				<Autocomplete
					options={params}
					getOptionLabel={option => option.name}
					value={selectedParam}
					onChange={(_, newValue) => newValue && setSelectedParam(newValue)}
					renderInput={params => <TextField {...params} label='Parameter' />}
					sx={{ mb: 2 }}
				/>

				{/* <Button
					variant='contained'
					onClick={() => setShowChart(true)}
					disabled={selectedUniversities.length === 0}
				>
					apply
				</Button> */}
			</Box>

			{selectedUniversities.length > 0 && (
				<Box sx={{ height: 400 }}>
					<Typography variant='h6' gutterBottom align='center'>
						{selectedParam.name} Comparison
					</Typography>
					<ResponsiveContainer width='100%' height='100%'>
						<BarChart
							data={chartData}
							layout='vertical'
							margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis type='number' />
							<YAxis dataKey='name' type='category' width={150} />
							<Tooltip />
							<Legend />
							<Bar dataKey='value' fill='#8884d8' name={selectedParam.name} />
						</BarChart>
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
