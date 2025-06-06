import { useQuery } from '@tanstack/react-query'
import { covidApi } from '@/app/api'

export const useWorldData = () => {
	return useQuery({
		queryKey: ['world-data'],
		queryFn: () => covidApi.get('/all').then(res => res.data),
	})
}

export const useHistoricalData = (days: number = 30) => {
	return useQuery({
		queryKey: ['historical-data', days],
		queryFn: () =>
			covidApi.get(`/historical/all?lastdays=30`).then(res => res.data),
	})
}

export const useTopCountries = (limit: number = 5) => {
	return useQuery({
		queryKey: ['top-countries', limit],
		queryFn: () =>
			covidApi
				.get('/countries?sort=cases')
				.then(res => res.data.slice(0, limit)),
	})
}
