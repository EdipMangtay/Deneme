'use client';

// React Imports
import React, { useEffect, useMemo, useState, useCallback } from 'react';

import Link from 'next/link';

// MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// Third-party Imports
import classNames from 'classnames';
import { rankItem } from '@tanstack/match-sorter-utils';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table';
import type { ColumnDef, FilterFn } from '@tanstack/react-table';

// Component Imports
import DebouncedInput from '../../components/DebouncedInput';
import TablePaginationComponent from '@components/TablePaginationComponent';
import OptionMenu from '@core/components/option-menu'; // PersonTable'deki gibi kullan

// Style Imports
import tableStyles from '@core/styles/table.module.css';

// Props for DepartmentTable
interface Person {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  departmentName?: string;
}

interface DepartmentTableProps {
  users: Person[];
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  return itemRank.passed;
};

const columnHelper = createColumnHelper<Person>();

const DepartmentTable: React.FC<DepartmentTableProps> = ({ users }) => {
  const [data, setData] = useState<Person[]>(users); // Veri durumunu yönetin
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  // Gelen users prop'u değiştiğinde data'yı güncelle
  useEffect(() => {
    setData(users);
  }, [users]);

  // useCallback ile fonksiyonları sarmala
  const handleDelete = useCallback((id: number) => {
    setData(prevData => prevData.filter(user => user.id !== id));
  }, []);

  const handlePermissions = useCallback((id: number) => {
    console.log(`Yetkiler düzenlenecek: ${id}`);

    // Yetkiler düzenleme mantığını buraya ekleyin
  }, []);

  const handleViewDetails = useCallback((id: number) => {
    console.log(`Detayları görüntüle: ${id}`);

    // Detay görüntüleme mantığını buraya ekleyin
  }, []);

  const columns = useMemo<ColumnDef<Person, any>[]>(
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
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
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
          <div className='flex items-center gap-2'>
            {/* Silme Butonu */}
            <IconButton
              title="Sil"
              onClick={() => handleDelete(row.original.id)}
            >
              <i className="tabler-trash" />
            </IconButton>

            {/* OptionMenu Bileşeni */}
            <OptionMenu
              iconButtonProps={{ size: 'medium', 'aria-label': 'Diğer seçenekler' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Detayları Gör',
                  icon: 'tabler-eye',
                  menuItemProps: {
                    onClick: () => handleViewDetails(row.original.id)
                  }
                },
                {
                  text: 'Yetkiler',
                  icon: 'tabler-settings',
                  menuItemProps: {
                    onClick: () => handlePermissions(row.original.id)
                  }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      }
    ],
    [handleDelete, handlePermissions, handleViewDetails]
  );

  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection, globalFilter },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter
  });

  return (
    <Card sx={{ p: 3, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <CardContent className='flex justify-between items-center flex-wrap gap-4 p-6'>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          placeholder='Kullanıcı Ara'
          debounce={500}
          className='max-sm:w-full'
        />
        <div className='flex items-center gap-2'>
          <Link href='/tr/departments/add' passHref>
            <Button variant='contained' startIcon={<i className='tabler-plus' />}>
              Departmana Kullanıcı Ekle
            </Button>
          </Link>

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
                <tr key={row.id}>
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
  );
};

export default DepartmentTable;
