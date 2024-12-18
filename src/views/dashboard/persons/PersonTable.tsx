'use client'

// React Imports
import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { fakeUsers } from '@/utils/fakeData'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'
import TextField, { TextFieldProps } from '@mui/material/TextField'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import OptionMenu from '@core/components/option-menu' // Bu bileşenin içinde button render etmeyin
import CustomTextField from '@core/components/mui/TextField'
import PersonFilterDrawer from './PersonFilterDrawer'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Type Definitions
export type personType = {
  departmentId: number
  companyId: number // Şirket ID'si
  id: number
  name: string
  role: string
  department: string
  email: string
  phone: string
}

type PersonWithActionsType = personType & {
  actions?: string
}

// Fuzzy Filter
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId) as string, value)
  addMeta({ itemRank })
  return itemRank.passed
}

// Debounced Input Component
const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, onChange, debounce])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const columnHelper = createColumnHelper<PersonWithActionsType>()

const departmentMap: Record<number, string> = {
  1: 'Mühendislik',
  2: 'Proje Yönetimi',
  3: 'Muhasebe',
  4: 'Saha Operasyonları',
  5: 'IT Destek',
  6: 'Ar-Ge',
  7: 'Satış',
  8: 'Üretim',
  9: 'Finans',
  10: 'Teknik Destek',
  11: 'Lojistik Yönetimi',
  12: 'Müşteri Hizmetleri',
  13: 'Halkla İlişkiler',
  14: 'Kalite Kontrol',
  15: 'Yazılım Geliştirme'
}

const PersonTable = () => {
  // URL'den companyId'yi almak için useSearchParams hook'unu kullanıyoruz
  const searchParams = useSearchParams()
  const companyIdParam = searchParams.get('companyId')
  const companyId = companyIdParam ? Number(companyIdParam) : null

  // States
  const [personFilterOpen, setPersonFilterOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  // Orijinal veriyi transform et ve sakla
  const originalData = useMemo(() => {
    return fakeUsers
      .filter(user => (companyId ? user.companyId === companyId : true)) // companyId varsa filtrele
      .map(user => ({
        ...user,
        department: departmentMap[user.departmentId] || 'Bilinmeyen Departman'
      }))
  }, [companyId])

  const [filteredData, setFilteredData] = useState<PersonWithActionsType[]>(originalData)

  const columns = useMemo<ColumnDef<PersonWithActionsType, any>[]>(
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
      columnHelper.accessor('name', {
        header: 'Ad Soyad',
        cell: ({ row }) => (
          <Typography className='font-medium' color='text.primary'>
            {row.original.name}
          </Typography>
        )
      }),
      columnHelper.accessor('role', {
        header: 'Rol',
        cell: ({ row }) => <Typography>{row.original.role}</Typography>
      }),
      columnHelper.accessor('department', {
        header: 'Departman',
        cell: ({ row }) => <Typography>{row.original.department}</Typography>
      }),
      columnHelper.accessor('email', {
        header: 'MAIL',
        cell: ({ row }) => <Typography>{row.original.email}</Typography>
      }),
      columnHelper.accessor('phone', {
        header: 'Telefon',
        cell: ({ row }) => <Typography>{row.original.phone}</Typography>
      }),
      columnHelper.accessor('actions', {
        header: '',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            {/* Silme Butonu */}
            <IconButton onClick={() => handleDelete(row.original.id)} title='Sil'>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>

            {/* OptionMenu Bileşenini Farklı Bir Eleman İçinde Kullanma */}
            <div>
              <OptionMenu
                iconButtonProps={{ size: 'medium' }}
                iconClassName='text-textSecondary'
                options={[
                  { text: 'Profili Görüntüle', icon: 'tabler-user' },
                  {
                    text: 'Yetkiler',
                    icon: 'tabler-settings',
                    menuItemProps: {
                      onClick: () => handleDelete(row.original.id)
                    }
                  }
                ]}
              />
            </div>
          </div>
        ),
        enableSorting: false
      })
    ],
    [filteredData]
  )

  // Kullanıcı silme işlemi
  const handleDelete = (id: number) => {
    const newData = filteredData.filter(user => user.id !== id)
    setFilteredData(newData)
  }

  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection, globalFilter },
    initialState: { pagination: { pageSize: 10 } },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <>
      <Card>
        <div className='flex flex-wrap justify-between gap-4 p-6'>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Ara'
            className='max-sm:is-full'
          />
          <div className='flex max-sm:flex-col items-start sm:items-center gap-4 max-sm:is-full'>
            <Button
              variant='outlined'
              className='max-sm:is-full'
              onClick={() => setPersonFilterOpen(!personFilterOpen)}
              startIcon={<i className='tabler-adjustments-horizontal' />}
            >
              Filtreler
            </Button>
            <Link href='/tr/persons/add' passHref>
              <Button variant='contained' className='max-sm:is-full' startIcon={<i className='tabler-plus' />}>
                Yeni Kullanıcı Ekle
              </Button>
            </Link>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
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
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => (
                    <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
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
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
          rowsPerPageOptions={[10, 25, 50]}
          onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
        />
      </Card>
      <PersonFilterDrawer
        open={personFilterOpen}
        fakeUsers={originalData} // Orijinal veriyi geçin
        setData={setFilteredData} // Filtrelenmiş veriyi set et
        handleClose={() => setPersonFilterOpen(false)} // OnClose'u sadece pencereyi kapatacak şekilde ayarlayın
      />
    </>
  )
}

export default PersonTable
