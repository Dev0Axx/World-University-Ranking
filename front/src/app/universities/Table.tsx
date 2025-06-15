/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useUniversitiesTable } from '@/app/lib/requests/getUniversitiesData'
import { Typography, Box, Tooltip } from '@mui/material'
import { MaterialReactTable } from 'material-react-table'
import { useMemo } from 'react'

export default function Table() {
	const { columns, data, isLoading, isError } = useUniversitiesTable()

	const modifiedColumns = useMemo(() => {
		return columns.map(column => {
			// Особый рендер для булевых полей
			if (
				column.accessorKey === 'closed' ||
				column.accessorKey === 'unaccredited'
			) {
				return {
					...column,
					Cell: ({ cell }: { cell: any }) => (
						<Box
							sx={{
								fontWeight: 'bold',
								color: cell.getValue() ? '#d32f2f' : '#2e7d32',
							}}
						>
							{cell.getValue() ? 'Yes' : 'No'}
						</Box>
					),
				}
			}

			// Стандартный рендер для остальных полей
			return {
				...column,
				Cell: ({ cell }: { cell: any }) => (
					<Tooltip title={cell.getValue()} placement='top' arrow>
						<Box
							sx={{
								display: '-webkit-box',
								WebkitLineClamp: 2,
								WebkitBoxOrient: 'vertical',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								maxHeight: '3em',
								lineHeight: '1.5em',
							}}
						>
							{cell.getValue()?.toString()}
						</Box>
					</Tooltip>
				),
			}
		})
	}, [columns])

	if (isError) {
		return <Typography>Произошла ошибка</Typography>
	}

	return (
		<Box display='grid' p='16px 24px'>
			<MaterialReactTable
				columns={modifiedColumns}
				data={data}
				state={{ isLoading: isLoading }}
				enableColumnActions={true} // Включает меню с действиями над колонками (сортировка, фильтрация и т.д.)
				enableColumnFilters={true} // Включает фильтрацию данных в колонках
				enablePagination={true} // Включает пагинацию (разбиение на страницы)
				enableSorting={true} // Включает сортировку по клику на заголовки колонок
				enableBottomToolbar={true} // Включает нижнюю панель с пагинацией и информацией о записях
				enableTopToolbar={true} // Включает верхнюю панель инструментов (экспорт, плотность и т.д.)
				enableColumnResizing={true} // Включает возможность изменения ширины колонок
				paginationDisplayMode='pages' // Режим отображения пагинации ('pages' - номера страниц, 'default' - кнопки вперед/назад)
				enableStickyHeader={true} // Фиксирует заголовок таблицы при прокрутке
				// enableColumnOrdering={true} // Возможность перетаскивать колонки
				muiTableBodyRowProps={{
					sx: {
						maxHeight: '60px',
					},
				}}
				muiTablePaperProps={{ elevation: 5 }}
			/>
		</Box>
	)
}
