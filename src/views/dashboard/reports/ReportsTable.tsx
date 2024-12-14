'use client'

// React Imports
import { useState, useMemo } from 'react'

import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import TablePagination from '@mui/material/TablePagination'

// Third-party Imports
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel
} from '@tanstack/react-table'
import type { ColumnDef ,
  FilterFn
} from '@tanstack/react-table'

// Component Imports
import ReportFilterDrawer from './ReportsFilterDrawer'
import TablePaginationComponent from '@components/TablePaginationComponent'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Report Data Type
export type ReportType = {
  id: number
  reportName: string
  reportType: string
  city: string
  project: string
  creator: string
  creationDate: string
}

// Sample Data
const reportData: ReportType[] = [
  {
    id: 1,
    reportName: 'Jordan Stevenson',
    reportType: 'Haftalık',
    city: 'Hatay',
    project: 'Etap 1',
    creator: 'Richard Payne',
    creationDate: '12.12.2024'
  },
  {
    id: 2,
    reportName: 'Jordan Stevenson',
    reportType: 'Aylık',
    city: 'İstanbul',
    project: 'Etap 2',
    creator: 'Richard Payne',
    creationDate: '12.12.2024'
  },
  {
    id: 3,
    reportName: 'Jordan Stevenson',
    reportType: 'Haftalık',
    city: 'Hatay',
    project: 'Etap 3',
    creator: 'Richard Payne',
    creationDate: '12.12.2024'
  }
]

// Column Definitions
const columnHelper = createColumnHelper<ReportType>()

// Custom Filter Functions
const fuzzyFilter: FilterFn<any> = (row, columnId, filterValue) => {
  const cellValue = row.getValue(columnId) as string

  return cellValue.toLowerCase().includes(filterValue.toLowerCase())
}

const ReportTable = () => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(reportData)
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({ city: '', reportType: '' })

  // Filter Application
  const applyFilters = (filters: Partial<ReportType>) => {
    setData(
      reportData.filter(item =>
        Object.entries(filters).every(([key, value]) =>
          value ? item[key as keyof ReportType]?.toString().toLowerCase().includes(value.toString().toLowerCase()) : true
        )
      )
    )
  }

  const handleFilterChange = (key: keyof ReportType, value: string) => {
    const updatedFilters = { ...filters, [key]: value }

    setFilters(updatedFilters)
    applyFilters(updatedFilters)
  }

  // Table Columns
  const columns = useMemo<ColumnDef<ReportType, any>[]>(
    () => [
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
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('reportName', {
        header: 'RAPOR ADI',
        cell: ({ row }) => <Typography>{row.original.reportName}</Typography>
      }),
      columnHelper.accessor('reportType', {
        header: 'RAPOR TÜRÜ',
        cell: ({ row }) => <Typography>{row.original.reportType}</Typography>,
        filterFn: fuzzyFilter
      }),
      columnHelper.accessor('city', {
        header: 'İL',
        cell: ({ row }) => <Typography>{row.original.city}</Typography>,
        filterFn: fuzzyFilter
      }),
      columnHelper.accessor('project', {
        header: 'PROJE',
        cell: ({ row }) => <Typography>{row.original.project}</Typography>
      }),
      columnHelper.accessor('creator', {
        header: 'OLUŞTURAN',
        cell: ({ row }) => <Typography>{row.original.creator}</Typography>
      }),
      columnHelper.accessor('creationDate', {
        header: 'OLUŞTURMA TARİHİ',
        cell: ({ row }) => <Typography>{row.original.creationDate}</Typography>
      }),
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex items-center">
            <IconButton onClick={() => console.log(row.original.id)}>
              <i className="tabler-trash text-textSecondary" />
            </IconButton>
          </div>
        )
      }
    ],
    []
  )

  // Table Instance
  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    filterFns: { fuzzy: fuzzyFilter }
  })

  return (
    <Card>
      <div className="flex justify-between p-6">
        <Typography variant="h6">Raporlar</Typography>
        <div>
          <Button variant="outlined" onClick={() => setFilterOpen(true)} style={{ marginRight: 10 }}>
            Filtreler
          </Button>
          <Link href="/tr/reports/add">
            <Button variant="contained" className="max-sm:is-full" startIcon={<i className="tabler-plus" />}>
              Yeni Rapor Oluştur
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex space-x-4 p-4">
        <input
          type="text"
          placeholder="İl Filtresi"
          value={filters.city}
          onChange={e => handleFilterChange('city', e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Rapor Türü Filtresi"
          value={filters.reportType}
          onChange={e => handleFilterChange('reportType', e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        component={() => <TablePaginationComponent table={table as any} />}
        count={data.length}
        rowsPerPage={10}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => table.setPageIndex(page)}
      />
      <ReportFilterDrawer
        open={filterOpen}
        handleClose={() => setFilterOpen(false)}
        applyFilters={applyFilters}
      />
    </Card>
  )
}

export default ReportTable
