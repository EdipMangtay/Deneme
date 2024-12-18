'use client'

// React Imports
import { useMemo, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { FaEye } from 'react-icons/fa'


// Third-party Imports
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

import TablePaginationComponent from '@/components/TablePaginationComponent'

// Veri: Görseldeki tabloya uygun olarak düzenlendi
const personData = [
  { id: 1, name: 'Jordan Stevenson', role: 'Departman Sorumlusu', email: 'smthng@gmail.com', phone: '5316258798' },
  { id: 2, name: 'Richard Payne', role: 'Çalışan', email: 'smthng@gmail.com', phone: '5316258798' },
  { id: 3, name: 'Jennifer Summers', role: 'Çalışan', email: 'smthng@gmail.com', phone: '5316258798' },
  { id: 4, name: 'Mr. Justin Richardson', role: 'Elektrikçi', email: 'smthng@gmail.com', phone: '5316258798' },
  { id: 5, name: 'Nicholas Tanner', role: 'Tesisatçı', email: 'smthng@gmail.com', phone: '5316258798' },
  { id: 6, name: 'Crystal Mays', role: 'Saha Personeli', email: 'smthng@gmail.com', phone: '5316258798' },
  { id: 7, name: 'Mary Garcia', role: 'Saha Personeli', email: 'smthng@gmail.com', phone: '5316258798' },
  { id: 8, name: 'Megan Roberts', role: 'Çalışan', email: 'smthng@gmail.com', phone: '5316258798' },
  { id: 9, name: 'Joseph Oliver', role: 'Saha Personeli', email: 'smthng@gmail.com', phone: '5316258798' }
]

// Fuzzy Filter Function
const fuzzyFilter: FilterFn<any> = (row, columnId, value) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  return itemRank.passed
}

// Column Helper
const columnHelper = createColumnHelper<typeof personData[0]>()

const DepartmentTable = () => {
  const [data] = useState(personData)
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<typeof personData[0], any>[]>(
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
        cell: () => (
          <div style={{ display: 'flex', gap: '8px' }}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
            <IconButton title="Detayları Gör">
            <FaEye />
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
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      globalFilter
    },
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <Card sx={{ p: 3, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
      {/* Üst kısım: Solda arama, sağda buton */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Kullanıcı Ara"
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          style={{
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            width: '200px'
          }}
        />
        <Button variant="contained" sx={{ textTransform: 'none', fontWeight: 500 }}>
          + Departmana Kullanıcı Ekle
        </Button>
      </div>

      {/* Tablo */}
      <div className="overflow-x-auto">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} style={{ borderBottom: '2px solid #e0e0e0' }}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    style={{
                      textAlign: 'left',
                      padding: '12px',
                      fontWeight: 'bold',
                      color: '#757575',
                      fontSize: '14px'
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    style={{
                      textAlign: 'left',
                      padding: '12px',
                      color: '#424242',
                      fontSize: '14px'
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <TablePagination
        component={() => <TablePaginationComponent table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
      />
    </Card>
  )
}

export default DepartmentTable
