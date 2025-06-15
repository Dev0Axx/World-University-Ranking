'use client'
import {
	Card,
	Stack,
	Typography,
	Pagination,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	SelectChangeEvent,
	TextField,
	Chip,
	Grid,
	CircularProgress,
	IconButton,
	Collapse,
	Box,
} from '@mui/material'
import { useUniversitiesData } from '../lib/requests/getUniversitiesData'
import { useState, useMemo } from 'react'
import { University } from '@/app/interfaces'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import SearchIcon from '@mui/icons-material/Search'

export default function UniversityCards() {
	const { data, isLoading, isError } = useUniversitiesData()
	const [page, setPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(5)
	const [sortBy, setSortBy] = useState<keyof University>('overall_score')
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
	const [searchTerm, setSearchTerm] = useState('')
	const [locationFilter, setLocationFilter] = useState('all')
	const [showFilters, setShowFilters] = useState(false)

	const toggleFilters = () => setShowFilters(!showFilters)

	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value)
	}

	const handleItemsPerPageChange = (event: SelectChangeEvent) => {
		setItemsPerPage(Number(event.target.value))
		setPage(1)
	}

	const filteredAndSortedData = useMemo(() => {
		if (!data) return []

		let result = [...data]

		if (searchTerm) {
			result = result.filter(university =>
				university.name.toLowerCase().includes(searchTerm.toLowerCase())
			)
		}

		if (locationFilter !== 'all') {
			result = result.filter(
				university =>
					university.location.toLowerCase() === locationFilter.toLowerCase()
			)
		}

		result.sort((a, b) => {
			const aValue = a[sortBy]
			const bValue = b[sortBy]

			if (typeof aValue === 'number' && typeof bValue === 'number') {
				return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
			}

			if (typeof aValue === 'string' && typeof bValue === 'string') {
				return sortOrder === 'asc'
					? aValue.localeCompare(bValue)
					: bValue.localeCompare(aValue)
			}

			return 0
		})

		return result
	}, [data, searchTerm, locationFilter, sortBy, sortOrder])

	const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)
	const paginatedData = filteredAndSortedData.slice(
		(page - 1) * itemsPerPage,
		page * itemsPerPage
	)

	const locations = useMemo(() => {
		if (!data) return []
		const uniqueLocations = new Set(data.map(u => u.location))
		return Array.from(uniqueLocations).sort()
	}, [data])

	if (isLoading) return <LoadingState />
	if (isError) return <ErrorState />
	if (!data || data.length === 0) return <EmptyState />

	return (
		<Stack spacing={2} p={1}>
			{/* Компактная панель управления */}
			<Card sx={{ p: 1 }}>
				<Stack direction='row' spacing={1} alignItems='center'>
					<TextField
						size='small'
						fullWidth
						placeholder='Поиск...'
						InputProps={{ startAdornment: <SearchIcon fontSize='small' /> }}
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>

					<IconButton
						onClick={toggleFilters}
						color={showFilters ? 'primary' : 'default'}
					>
						<FilterAltIcon />
					</IconButton>
				</Stack>

				<Collapse in={showFilters}>
					<Box sx={{ pt: 1 }}>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<FormControl fullWidth size='small'>
									<InputLabel>Sorting</InputLabel>
									<Select
										value={sortBy}
										onChange={e =>
											setSortBy(e.target.value as keyof University)
										}
										label='Sorting'
									>
										<MenuItem value='name'>name</MenuItem>
										<MenuItem value='overall_score'>Total score</MenuItem>
										<MenuItem value='location'>Location</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={6}>
								<FormControl fullWidth size='small'>
									<InputLabel>Order</InputLabel>
									<Select
										value={sortOrder}
										onChange={e =>
											setSortOrder(e.target.value as 'asc' | 'desc')
										}
										label='Order'
									>
										<MenuItem value='asc'>Ascending order</MenuItem>
										<MenuItem value='desc'>Descending order</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<FormControl fullWidth size='small'>
									<InputLabel>Location</InputLabel>
									<Select
										value={locationFilter}
										onChange={e => setLocationFilter(e.target.value)}
										label='Location'
									>
										<MenuItem value='all'>All</MenuItem>
										{locations.map(location => (
											<MenuItem key={location} value={location}>
												{location}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
						</Grid>
					</Box>
				</Collapse>
			</Card>

			<Typography variant='body2' color='text.secondary' px={1}>
				Found: {filteredAndSortedData.length}
			</Typography>

			{/* Карточки */}
			<Stack spacing={1}>
				{paginatedData.map(university => (
					<CompactUniversityCard key={university.name} data={university} />
				))}
			</Stack>

			{/* Компактная пагинация */}
			<Card sx={{ p: 1 }}>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
				>
					<FormControl size='small' sx={{ minWidth: 80 }}>
						<Select
							value={itemsPerPage.toString()}
							onChange={handleItemsPerPageChange}
							variant='outlined'
						>
							<MenuItem value={5}>5</MenuItem>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={20}>20</MenuItem>
						</Select>
					</FormControl>

					<Pagination
						count={totalPages}
						page={page}
						onChange={handleChangePage}
						size='small'
						siblingCount={0}
						boundaryCount={1}
					/>
				</Stack>
			</Card>
		</Stack>
	)
}

function CompactUniversityCard({ data }: { data: University }) {
	const [expanded, setExpanded] = useState(false)

	return (
		<Card
			onClick={() => setExpanded(!expanded)}
			sx={{ p: 1, cursor: 'pointer' }}
		>
			<Stack spacing={0.5}>
				<Typography variant='subtitle1' fontWeight='bold'>
					{data.name}
				</Typography>

				<Stack direction='row' spacing={0.5} flexWrap='wrap' useFlexGap>
					<Chip
						label={data.location}
						size='small'
						color='info'
						variant='outlined'
					/>
					<Chip
						label={`★ ${data.overall_score.toFixed(1)}`}
						size='small'
						color='primary'
					/>
					{data.closed && <Chip label='Закрыт' size='small' color='error' />}
				</Stack>

				<Collapse in={expanded}>
					<Box sx={{ pt: 1 }}>
						<Grid container spacing={0.5}>
							<Grid item xs={6}>
								<Typography variant='body2'>
									<strong>Students:</strong> {data.stats_number_students}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='body2'>
									<strong>Ratio:</strong> {data.stats_female_male_ratio}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='body2'>
									<strong>Teaching:</strong> {data.scores_teaching.toFixed(1)}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='body2'>
									<strong>Researches:</strong> {data.scores_research.toFixed(1)}
								</Typography>
							</Grid>
						</Grid>
					</Box>
				</Collapse>
			</Stack>
		</Card>
	)
}

function LoadingState() {
	return (
		<Stack alignItems='center' justifyContent='center' height='200px'>
			<CircularProgress size={24} />
			<Typography mt={2} variant='body2'>
				Uploading data...
			</Typography>
		</Stack>
	)
}

function ErrorState() {
	return (
		<Typography color='error' textAlign='center' p={2} variant='body2'>
			Data upload error
		</Typography>
	)
}

function EmptyState() {
	return (
		<Typography textAlign='center' p={2} variant='body2'>
			There is no data about universities
		</Typography>
	)
}
