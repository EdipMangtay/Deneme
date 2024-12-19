'use client'

// React Imports
import React, { useState, useMemo, useCallback } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TablePagination from '@mui/material/TablePagination'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'

// Component Imports
import classNames from 'classnames'

import DebouncedInput from '../../components/DebouncedInput'
import TablePaginationComponent from '@components/TablePaginationComponent'
import OptionMenu from '@core/components/option-menu' // Ensure this component is correctly imported

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Dummy Data
import type { ProjectData } from './dummyData'
import { dummyData } from './dummyData'

// Fuzzy Filter
const fuzzyFilter: FilterFn<any> = (row, columnId, value) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  return itemRank.passed
}

const columnHelper = createColumnHelper<ProjectData>()

const ProjectListTable = () => {
  const [data, setData] = useState<ProjectData[]>(dummyData)
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})

  // Handle Edit
  const handleEdit = useCallback((id: number) => {
    console.log(`Proje düzenlenecek: ${id}`)
  }, [])

  // Handle Delete
  const handleDelete = useCallback((id: number) => {
    setData(prevData => prevData.filter(project => project.id !== id))
  }, [])

  // Handle Bulk Delete
  const handleBulkDelete = useCallback(() => {
    const selectedIds = Object.keys(rowSelection)
      .filter(id => rowSelection[id])
      .map(id => Number(id))

    console.log('Selected IDs for bulk delete:', selectedIds) // For debugging

    setData(prevData => prevData.filter(project => !selectedIds.includes(project.id)))
    setRowSelection({})
  }, [rowSelection])

  // Columns Definition
  const columns = useMemo<ColumnDef<ProjectData, any>[]>(
    () => [
      // Select Checkbox Column
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('country', {
        header: 'Ülke',
        cell: ({ row }) => <Typography>{row.original.country}</Typography>
      }),
      columnHelper.accessor('city', {
        header: 'İl',
        cell: ({ row }) => <Typography>{row.original.city}</Typography>
      }),
      columnHelper.accessor('district', {
        header: 'İlçe',
        cell: ({ row }) => <Typography>{row.original.district}</Typography>
      }),
      columnHelper.accessor('projectName', {
        header: 'Proje Adı',
        cell: ({ row }) => (
          <Typography className='font-medium' color='text.primary'>
            {row.original.projectName}
          </Typography>
        )
      }),
      columnHelper.accessor('abbreviation', {
        header: 'Kısaltma',
        cell: ({ row }) => <Typography>{row.original.abbreviation}</Typography>
      }),
      columnHelper.accessor('manager', {
        header: 'Proje Sorumlusu',
        cell: ({ row }) => <Typography>{row.original.manager}</Typography>
      }),
      columnHelper.accessor('partCount', {
        header: 'Kısım Adedi',
        cell: ({ row }) => <Typography>{row.original.partCount}</Typography>
      }),
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            {/* Silme Butonu */}
            <IconButton onClick={() => handleDelete(row.original.id)} title='Sil'>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>

            {/* OptionMenu Bileşeni */}
            <div>
              <OptionMenu
                iconButtonProps={{ size: 'medium' }}
                iconClassName='text-textSecondary'
                options={[
                  { text: 'Proje Düzenle', icon: 'tabler-edit', menuItemProps: { onClick: () => handleEdit(row.original.id) } },
                  {
                    text: 'Yetkiler',
                    icon: 'tabler-settings',
                    menuItemProps: {
                      onClick: () => handleEdit(row.original.id) // Or another appropriate function
                    }
                  }
                ]}
              />
            </div>
          </div>
        ),
        enableSorting: false
      }
    ],
    [handleEdit, handleDelete]
  )

  // React Table Setup
  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id.toString(), // Ensure row.id matches the project's id
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection, globalFilter },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
  })

  return (
    <Card>
      <CardContent className='flex justify-between flex-wrap gap-4 p-6'>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          placeholder='Ara'
          debounce={500}
          className='max-sm:w-full'
        />
        <div className='flex items-center gap-2'>
          <Button variant='contained' startIcon={<i className='tabler-plus' />}>
            Yeni Proje Ekle
          </Button>
          {/* Global Toplu Silme İkonu */}
          <IconButton
            onClick={handleBulkDelete}
            disabled={Object.keys(rowSelection).length === 0}
            title="Seçilenleri Sil"
            color="error"
            aria-label="Seçilenleri Sil"
          >
            <i className='tabler-trash' />
          </IconButton>
        </div>
      </CardContent>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className='px-4 py-2 border-b'>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          className={classNames({
                            'flex items-center': header.column.getIsSorted(),
                            'cursor-pointer select-none': header.column.getCanSort()
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <i className='tabler-chevron-up text-xl' />,
                            desc: <i className='tabler-chevron-down text-xl' />
                          }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                        </div>
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className={classNames({ 'bg-gray-100': row.getIsSelected() })}
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className='px-4 py-2 border-b'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <TablePagination
        component={() => <TablePaginationComponent table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => table.setPageIndex(page)}
        onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
        rowsPerPageOptions={[10, 25, 50]}
        labelRowsPerPage="Satır Sayısı"
      />
    </Card>
  )
}

export default ProjectListTable
