/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import {
	Box,
	Typography,
	Container,
	Autocomplete,
	TextField,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Chip,
} from '@mui/material'
import { useUniversitiesData } from '../lib/requests/getUniversitiesData'
import { University } from '../interfaces'

interface ComparisonRow {
	label: string
	key: keyof University
	format?: (value: any) => string
}

export default function Comparison() {
	const { data, isLoading, isError } = useUniversitiesData()
	const [selectedUniversities, setSelectedUniversities] = useState<
		University[]
	>([])

	const comparisonRows: ComparisonRow[] = [
		{
			label: 'Overall Score',
			key: 'overall_score',
			format: value => value?.toFixed(1) || 'N/A',
		},
		{
			label: 'Teaching Score',
			key: 'scores_teaching',
			format: value => value?.toFixed(1) || 'N/A',
		},
		{
			label: 'Research Score',
			key: 'scores_research',
			format: value => value?.toFixed(1) || 'N/A',
		},
		{
			label: 'Citations Score',
			key: 'scores_citations',
			format: value => value?.toFixed(1) || 'N/A',
		},
		{
			label: 'Industry Income Score',
			key: 'scores_industry_income',
			format: value => value?.toFixed(1) || 'N/A',
		},
		{
			label: 'International Outlook Score',
			key: 'scores_international_outlook',
			format: value => value?.toFixed(1) || 'N/A',
		},
		{ label: 'Location', key: 'location' },
		{ label: 'Number of Students', key: 'stats_number_students' },
		{ label: 'Student Staff Ratio', key: 'stats_student_staff_ratio' },
		{ label: 'International Students %', key: 'stats_pc_intl_students' },
		{ label: 'Gender Ratio', key: 'stats_female_male_ratio' },
		{ label: 'Member Level', key: 'member_level' },
		{ label: 'Subjects Offered', key: 'subjects_offered' },
	]

	const handleUniversitySelect = (event: any, newValue: University[]) => {
		if (newValue.length <= 5) {
			setSelectedUniversities(newValue)
		}
	}

	if (isLoading) return <Typography>Loading...</Typography>
	if (isError) return <Typography>Error loading data</Typography>

	return (
		<Container maxWidth='xl' sx={{ py: 4 }}>
			<Typography variant='h4' component='h1' gutterBottom>
				University Comparison Tool
			</Typography>
			<Typography variant='body1' paragraph>
				Select up to 5 universities to compare their key metrics and
				characteristics.
			</Typography>

			<Box sx={{ mb: 4 }}>
				<Autocomplete
					multiple
					options={data || []}
					getOptionLabel={option => option.name}
					value={selectedUniversities}
					onChange={handleUniversitySelect}
					filterSelectedOptions
					renderInput={params => (
						<TextField
							{...params}
							label='Search and select universities'
							placeholder='Type to search...'
						/>
					)}
					renderTags={(value, getTagProps) =>
						value.map((option, index) => (
							<Chip
								{...getTagProps({ index })}
								key={option.name}
								label={option.name}
								sx={{ mr: 1 }}
							/>
						))
					}
					sx={{ width: '100%' }}
				/>
			</Box>

			{selectedUniversities.length > 0 ? (
				<Paper elevation={3} sx={{ overflowX: 'auto' }}>
					<TableContainer>
						<Table sx={{ minWidth: 800 }}>
							<TableHead>
								<TableRow>
									<TableCell sx={{ minWidth: 200 }}>Metric</TableCell>
									{selectedUniversities.map(uni => (
										<TableCell
											key={uni.name}
											align='center'
											sx={{ minWidth: 200 }}
										>
											<Typography variant='subtitle1' fontWeight='bold'>
												{uni.name}
											</Typography>
											<Typography variant='caption' color='text.secondary'>
												{uni.location}
											</Typography>
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{comparisonRows.map(row => (
									<TableRow key={row.key}>
										<TableCell component='th' scope='row'>
											<Typography fontWeight='medium'>{row.label}</Typography>
										</TableCell>
										{selectedUniversities.map(uni => {
											const value = uni[row.key]
											const formattedValue = row.format
												? row.format(value)
												: value || 'N/A'
											return (
												<TableCell
													key={`${uni.name}-${row.key}`}
													align='center'
												>
													{formattedValue}
												</TableCell>
											)
										})}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			) : (
				<Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
					<Typography variant='h6' color='text.secondary'>
						Please select universities to compare (up to 5)
					</Typography>
				</Paper>
			)}
		</Container>
	)
}
