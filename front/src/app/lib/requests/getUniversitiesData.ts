'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/app/api'
import { University, Column } from '@/app/interfaces'

export const useUniversitiesData = () => {
	return useQuery<University[]>({
		queryKey: ['universities'],
		queryFn: async () => {
			const response = await api.get('/universities')
			return response.data
		},
		staleTime: 5 * 60 * 1000,
	})
}

export const useUniversitiesTable = () => {
	const { data: universities, ...queryInfo } = useQuery<University[]>({
		queryKey: ['universities'],
		queryFn: async () => {
			const response = await api.get('/universities')
			return response.data
		},
		staleTime: 5 * 60 * 1000,
	})

	const columns: Column[] = [
		{ accessorKey: 'name', header: 'University Name', size: 190, grow: true },
		{ accessorKey: 'location', header: 'Country', size: 150 },
		{
			accessorKey: 'overall_score',
			header: 'Overall Score',
			size: 120,
		},
		{ accessorKey: 'record_type', header: 'Record Type', size: 130 },
		{ accessorKey: 'member_level', header: 'Member Level', size: 130 },
		{
			accessorKey: 'scores_teaching',
			header: 'Teaching Score',
			size: 130,
		},
		{
			accessorKey: 'scores_research',
			header: 'Research Score',
			size: 130,
		},
		{
			accessorKey: 'scores_citations',
			header: 'Citations Score',
			size: 130,
		},
		{
			accessorKey: 'scores_industry_income',
			header: 'Industry Income',
			size: 140,
		},
		{
			accessorKey: 'scores_international_outlook',
			header: 'International Outlook',
			size: 140,
		},
		{
			accessorKey: 'stats_number_students',
			header: 'Students Count',
			size: 140,
		},
		{
			accessorKey: 'stats_student_staff_ratio',
			header: 'Student-Staff Ratio',
			size: 160,
		},
		{
			accessorKey: 'stats_pc_intl_students',
			header: 'International Students',
			size: 160,
		},
		{
			accessorKey: 'stats_female_male_ratio',
			header: 'Gender Ratio',
			size: 130,
		},
		{
			accessorKey: 'subjects_offered',
			header: 'Subjects Offered',
			size: 300,
		},
		{
			accessorKey: 'closed',
			header: 'Closed',
			size: 100,
		},
		{
			accessorKey: 'unaccredited',
			header: 'Unaccredited',
			size: 120,
		},
	]

	return {
		columns,
		data: universities || [],
		...queryInfo,
	}
}

export const useTopUniversities = (limit: number = 10) => {
	return useQuery<University[]>({
		queryKey: ['top-universities', limit],
		queryFn: async () => {
			const response = await api.get(`/universities/top?limit=${limit}`)
			return response.data
		},
		staleTime: 5 * 60 * 1000,
	})
}
