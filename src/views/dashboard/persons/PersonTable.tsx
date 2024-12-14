'use client'

// React Imports
import { useEffect, useMemo, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'
import type { TextFieldProps } from '@mui/material/TextField'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'

import OptionMenu from '@core/components/option-menu'
import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import PersonFilterDrawer from './PersonFilterDrawer'
import Link from '@/components/Link'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

export type personType = {
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

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

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
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Vars
const personData = [
  {
    id: 1,
    name: 'Jordan Stevenson',
    role: 'Proje Sorumlusu',
    department: 'Mekanik',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 2,
    name: 'Richard Payne',
    role: 'Yönetici',
    department: 'Mekanik',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 3,
    name: 'Jennifer Summers',
    role: 'Proje Sorumlusu',
    department: 'Mekanik',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 4,
    name: 'Mr. Justin Richardson',
    role: 'Saha Personeli',
    department: 'Elektrik',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 5,
    name: 'Nicholas Tanner',
    role: 'Saha Personeli',
    department: 'Mekanik',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 6,
    name: 'Crystal Mays',
    role: 'Saha Personeli',
    department: 'Mekanik',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 7,
    name: 'Mary Garcia',
    role: 'Saha Personeli',
    department: 'İnşaat',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 8,
    name: 'Megan Roberts',
    role: 'Proje Sorumlusu',
    department: 'İnşaat',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 9,
    name: 'Joseph Oliver',
    role: 'Saha Personeli',
    department: 'İnşaat',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 10,
    name: 'Amanda Green',
    role: 'Proje Sorumlusu',
    department: 'Mekanik',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 11,
    name: 'Sophia Bennett',
    role: 'Saha Personeli',
    department: 'Elektrik',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 12,
    name: 'Ethan Reed',
    role: 'Yönetici',
    department: 'İnşaat',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 13,
    name: 'Olivia Morgan',
    role: 'Saha Personeli',
    department: 'Mekanik',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 14,
    name: 'Liam Martinez',
    role: 'Proje Sorumlusu',
    department: 'Elektrik',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 15,
    name: 'Mia Walker',
    role: 'Yönetici',
    department: 'İnşaat',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 16,
    name: 'Daniel Cooper',
    role: 'Saha Personeli',
    department: 'Elektrik',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 17,
    name: 'Emma Scott',
    role: 'Proje Sorumlusu',
    department: 'Mekanik',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 18,
    name: 'James Brown',
    role: 'Saha Personeli',
    department: 'İnşaat',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 19,
    name: 'Isabella Wilson',
    role: 'Yönetici',
    department: 'Mekanik',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 20,
    name: 'Lucas Davis',
    role: 'Saha Personeli',
    department: 'Elektrik',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 21,
    name: 'Ava King',
    role: 'Proje Sorumlusu',
    department: 'Mekanik',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 22,
    name: 'Benjamin Lee',
    role: 'Yönetici',
    department: 'İnşaat',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 23,
    name: 'Charlotte Miller',
    role: 'Saha Personeli',
    department: 'Elektrik',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  },
  {
    id: 24,
    name: 'Noah Martinez',
    role: 'Proje Sorumlusu',
    department: 'Mekanik',
    email: 'smthng@gmail.com',
    phone: '5316258798'
  }
]

// Column Definitions
const columnHelper = createColumnHelper<PersonWithActionsType>()

const PersonTable = () => {
  // States
  const [personFilterOpen, setPersonpersonFilterOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(...[personData])
  const [globalFilter, setGlobalFilter] = useState('')

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
          <div className='flex items-center'>
            <IconButton>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                { text: 'Profili Görüntüle', icon: 'tabler-user' },
                {
                  text: 'Yetkiler',
                  icon: 'tabler-settings',
                  menuItemProps: {
                    onClick: () => setData(data.filter(category => category.id !== row.original.id))
                  }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    [data]
  )

  const table = useReactTable({
    data: data as personType[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
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
              onClick={() => setPersonpersonFilterOpen(!personFilterOpen)}
              startIcon={<i className='tabler-adjustments-horizontal' />}
            >
              Filtreler
            </Button>
            <Link href='/tr/persons/add'>
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
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
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
        />
      </Card>
      <PersonFilterDrawer
        open={personFilterOpen}
        personData={data}
        setData={setData}
        handleClose={() => setPersonpersonFilterOpen(!personFilterOpen)}
      />
    </>
  )
}

export default PersonTable
