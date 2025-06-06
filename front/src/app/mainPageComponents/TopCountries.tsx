/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Box,
	Typography,
} from '@mui/material'
import { useTopCountries } from '@/app/lib/hooks/useCovidData'

export default function TopCountries({ limit = 5 }: { limit?: number }) {
	const { data } = useTopCountries(limit)

	return (
		<Box>
			<Typography variant='h5' gutterBottom>
				Топ-{limit} стран по заболеваемости
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Страна</TableCell>
							<TableCell align='right'>Случаи</TableCell>
							<TableCell align='right'>Смерти</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.map((country: any) => (
							<TableRow key={country.country}>
								<TableCell>{country.country}</TableCell>
								<TableCell align='right'>
									{country.cases.toLocaleString()}
								</TableCell>
								<TableCell align='right'>
									{country.deaths.toLocaleString()}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}
