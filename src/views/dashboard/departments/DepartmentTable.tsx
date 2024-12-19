'use client'

import React, { useMemo, useState } from 'react'

import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { FaEye } from 'react-icons/fa'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'

import { Box } from '@mui/material'

import DebouncedInput from '../../components/DebouncedInput'

// Props for DepartmentTable
interface Person {
  id: number
  name: string
  role: string
  email: string
  phone: string
  departmentName?: string
}

interface DepartmentTableProps {
  users: Person[]
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  
  return itemRank.passed
}

const columnHelper = createColumnHelper<Person>()

const DepartmentTable: React.FC<DepartmentTableProps> = ({ users }) => {
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<Person, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            indeterminate={table.getIsSomePageRowsSelected()}
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        )
      },
      columnHelper.accessor('name', {
        header: 'AD SOYAD',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('role', {
        header: 'ÜNVAN',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('email', {
        header: 'MAIL',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('phone', {
        header: 'TEL NUMARASI',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '8px' }}>
            <IconButton title="Detayları Gör" onClick={() => handleViewDetails(row.original.id)}>
              <FaEye />
            </IconButton>
            <IconButton title="Yetkiler" onClick={() => handlePermissions(row.original.id)}>
              <MoreVertIcon />
            </IconButton>
            <IconButton title="Sil" onClick={() => handleDelete(row.original.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        )
      }
    ],
    []
  )

  const handleDelete = (id: number) => console.log(`Kullanıcı ID: ${id} silindi.`)
  const handlePermissions = (id: number) => console.log(`Yetkiler düzenlenecek: ${id}`)
  const handleViewDetails = (id: number) => console.log(`Detayları görüntüle: ${id}`)

  const table = useReactTable({
    data: users,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { globalFilter },
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <Card sx={{ p: 3, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <DebouncedInput
          value={globalFilter}
          onChange={value => setGlobalFilter(value.toString())}
          placeholder="Kullanıcı Ara"
          debounce={500}
        />
        <Button variant="contained">+ Departmana Kullanıcı Ekle</Button>
      </Box>

      <div className="overflow-x-auto">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} style={{ padding: '12px', textAlign: 'left' }}>
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
                  <td key={cell.id} style={{ padding: '12px' }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        component="div"
        count={table.getFilteredRowModel().rows.length}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => table.setPageIndex(page)}
        rowsPerPage={table.getState().pagination.pageSize}
        onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
        rowsPerPageOptions={[10, 25, 50]}
        labelRowsPerPage="Satır Sayısı"
      />
    </Card>
  )
}

export default DepartmentTable
