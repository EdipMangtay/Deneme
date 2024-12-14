'use client'

// React Imports
import { useState, useMemo } from 'react'
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'

// Third-party Imports (TanStack React Table)
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'

// Component Imports
import CompaniesFilterDrawer from './CompaniesFilterDrawer'
import TablePaginationComponent from '@components/TablePaginationComponent'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Şirket tipi
type Company = {
  id: number
  name: string
  manager: string
  phone: string
  email: string
}

// Fuzzy Filter fonksiyonu
const fuzzyFilter: FilterFn<Company> = (row, columnId, filterValue) => {
  const cellValue = row.getValue(columnId) as string
  return cellValue?.toLowerCase().includes(filterValue.toLowerCase())
}

// Şirket verisi
const companyData: Company[] = [
  { id: 1, name: 'Arı İnşaat', manager: 'Osman Özen', phone: '5316258798', email: 'osman@ariinsaat.com' },
  { id: 2, name: 'Yeni İnşaat', manager: 'Fatih Konuk', phone: '5316258798', email: 'fatih@yeninsaat.com' },
  { id: 3, name: 'Kalem İnşaat', manager: 'Erbil Vurgun', phone: '5316258798', email: 'erbil@kaleminsaat.com' },
  { id: 4, name: 'Emre İnşaat', manager: 'Emre Önder', phone: '5316258798', email: 'emre@emreinsaat.com' }
]

const columnHelper = createColumnHelper<Company>()

const CompaniesTable = () => {
  const [companyFilterOpen, setCompanyFilterOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [data, setData] = useState(companyData)
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<Company, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        )
      },
      columnHelper.accessor('name', {
        header: 'FİRMA ADI',
        cell: ({ row }) => (
          <Typography className='font-medium' color='text.primary'>
            {row.original.name}
          </Typography>
        )
      }),
      columnHelper.accessor('manager', {
        header: 'FİRMA SORUMLUSU',
        cell: ({ row }) => <Typography>{row.original.manager}</Typography>
      }),
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <IconButton
              onClick={() => {
                setSelectedCompany(row.original)
                setCompanyFilterOpen(true)
              }}
            >
              <i className='tabler-eye text-textSecondary' title='Şirket Detayları' />
            </IconButton>
            <IconButton
              onClick={() => {
                window.location.href = `/tr/persons?companyId=${row.original.id}`
              }}
            >
              <i className='tabler-users text-textSecondary' title='Personeller' />
            </IconButton>
            <IconButton
              onClick={() => {
                window.location.href = `/tr/departments?companyId=${row.original.id}`
              }}
            >
              <i className='tabler-building text-textSecondary' title='Departmanlar' />
            </IconButton>
            <IconButton>
              <i className='tabler-trash text-textSecondary' title='Sil' />
            </IconButton>
          </div>
        )
      }
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
      <Card>
        <div className='flex justify-between p-6 items-center'>
          <Typography variant='h6'>Şirketler</Typography>
          <Link href="/tr/companies/add">
            <Button variant='contained' startIcon={<i className='tabler-plus' />}>
              Yeni Firma Ekle
            </Button>
          </Link>
        </div>

        <div className='overflow-x-auto'>
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
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={data.length}
          rowsPerPage={10}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => table.setPageIndex(page)}
        />
      </Card>

      {companyFilterOpen && selectedCompany && (
        <CompaniesFilterDrawer
          open={companyFilterOpen}
          company={selectedCompany}
          handleClose={() => setCompanyFilterOpen(false)}
        />
      )}
    </>
  )
}

export default CompaniesTable
