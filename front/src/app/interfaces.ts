/* eslint-disable @typescript-eslint/no-explicit-any */
export interface University {
	name: string
	scores_teaching: number
	scores_research: number
	scores_citations: number
	scores_industry_income: number
	scores_international_outlook: number
	record_type: string
	member_level: number
	location: string
	stats_number_students: string
	stats_student_staff_ratio: string
	stats_pc_intl_students: string
	stats_female_male_ratio: string
	subjects_offered: string
	closed: boolean
	unaccredited: boolean
	overall_score: number
}

export interface Column {
	accessorKey: string
	header: string
	size?: number
	grow?: boolean
	Cell?: (params: { cell: { getValue: () => any } }) => React.ReactNode
}
