import WorldStats from './mainPageComponents/WorldStats'
import HistoryChart from '@/app/mainPageComponents/HistoryChart'
import TopCountries from './mainPageComponents/TopCountries'

export default function HomePage() {
	return (
		<>
			<WorldStats />
			<HistoryChart />
			<TopCountries limit={5} />
		</>
	)
}
