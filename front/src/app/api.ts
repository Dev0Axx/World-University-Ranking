import axios from 'axios'

export const covidApi = axios.create({
	baseURL: 'https://disease.sh/v3/covid-19',
})
