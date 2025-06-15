'use client'
import Cards from './Cards'
import Table from './Table'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

export default function Universities() {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
	return <>{isMobile ? <Cards /> : <Table />}</>
}
