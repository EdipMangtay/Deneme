'use client';

// React Imports
import React, { useState, useMemo, useCallback } from 'react';

import Link from 'next/link';

// MUI Imports
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';

// Third-party Imports
import classnames from 'classnames';
import { rankItem } from '@tanstack/match-sorter-utils';
import type {
  ColumnDef,
  FilterFn,
  Row} from '@tanstack/react-table';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';

// Component Imports
import { CardContent } from '@mui/material';

import TablePaginationComponent from '@components/TablePaginationComponent';

import CompaniesFilterDrawer from './CompaniesFilterDrawer';

import DebouncedInput from '../../components/DebouncedInput';

// Style Imports
import tableStyles from '@core/styles/table.module.css';

// Dummy Data
import { fakeCompanies } from '@/utils/fakeData';


// Type Definitions
type CompanyData = {
  id: number;
  taxNumber: string;
  taxOffice: string;
  name: string;
  manager: string;
  phone1: string;
  phone2: string;
  website: string;
  email: string;       // Bu alan fakeCompanies içinde olmalı
  secondEmail: string; // Bu alan da fakeCompanies içinde olmalı
  city: string;
  district: string;
};

type TableCompany = {
  id: number;
  name: string;
  manager: string;
  phone: string;
  website: string;
};

// Fuzzy Filter
const fuzzyFilter: FilterFn<TableCompany> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId) as string, value);

  addMeta({ itemRank });

  return itemRank.passed;
};

const columnHelper = createColumnHelper<TableCompany>();

// companyData'yı tabloya uygun hale getiriyoruz
const companyDataForTable: TableCompany[] = fakeCompanies.map((c) => ({
  id: c.id,
  name: c.name,
  manager: c.manager,
  phone: c.phone1,    // phone alanı tablo için phone1'den alınıyor
  website: c.website, // website alanı tablo için website alanından alınıyor
}));

const CompaniesTable = () => {
  const [data, setData] = useState<TableCompany[]>(companyDataForTable);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(null);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilterDrawerOpen = (companyId: number) => {
    const company = fakeCompanies.find((c) => c.id === companyId) || null;

    setSelectedCompany(company);
    setFilterDrawerOpen(true);
  };

  const handleFilterDrawerClose = () => {
    setSelectedCompany(null);
    setFilterDrawerOpen(false);
  };

  const handleDelete = useCallback((id: number) => {
    console.log(`Şirket ID: ${id} silindi.`);
    setData(prevData => prevData.filter(company => company.id !== id));
  }, []);

  // Handle Bulk Delete
  const handleBulkDelete = useCallback(() => {
    const selectedIds = Object.keys(rowSelection)
      .filter(id => rowSelection[id])
      .map(id => Number(id));

    console.log('Selected IDs for bulk delete:', selectedIds); // For debugging

    setData(prevData => prevData.filter(company => !selectedIds.includes(company.id)));
    setRowSelection({});
  }, [rowSelection]);

  const columns = useMemo<ColumnDef<TableCompany, any>[]>(
    () => [
      // Select Checkbox Column
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      columnHelper.accessor('name', {
        header: 'ŞİRKET ADI',
        cell: ({ row }: { row: Row<TableCompany> }) => (
          <Typography>{row.original.name}</Typography>
        ),
      }),
      columnHelper.accessor('manager', {
        header: 'ŞİRKET SORUMLUSU',
        cell: ({ row }: { row: Row<TableCompany> }) => (
          <Typography>{row.original.manager}</Typography>
        ),
      }),


      {
        id: 'actions',
        header: 'İŞLEMLER',
        cell: ({ row }: { row: Row<TableCompany> }) => (
          <div className="flex items-center gap-2">
            <IconButton
              title="Şirket Detayları"
              onClick={() => handleFilterDrawerOpen(row.original.id)}
            >
              <i className="tabler-eye" />
            </IconButton>
            <Link href={`/tr/persons?companyId=${row.original.id}`} passHref>
              <IconButton title="Personeller">
                <i className="tabler-users" />
              </IconButton>
            </Link>
            <Link href={`/tr/departments?companyId=${row.original.id}`} passHref>
              <IconButton title="Departmanlar">
                <i className="tabler-building" />
              </IconButton>
            </Link>
            <IconButton
              title="Sil"
              onClick={() => handleDelete(row.original.id)}
            >
              <i className="tabler-trash" />
            </IconButton>
          </div>
        ),
      },
    ],
    [handleFilterDrawerOpen, handleDelete]
  );

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id.toString(), // Ensure row.id matches the company's id
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection, globalFilter },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
  });

  return (
    <>
      <Card>
        <CardContent className="flex justify-between flex-wrap gap-4 p-6">
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Şirket Ara"
            debounce={500}
            className="max-sm:w-full"
          />
          <div className="flex items-center gap-2">
          <Link href='/tr/companies/add' passHref>
            <Button variant="contained" startIcon={<i className="tabler-plus" />}>
              Yeni Şirket Ekle
            </Button>
            </Link>
            {/* Global Toplu Silme İkonu */}
            <IconButton
              onClick={handleBulkDelete}
              disabled={Object.keys(rowSelection).length === 0}
              title="Seçilenleri Sil"
              color="error"
              aria-label="Seçilenleri Sil"
            >
              <i className="tabler-trash" />
            </IconButton>
          </div>
        </CardContent>
        <div className="overflow-x-auto">
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-2 border-b">
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort(),
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className="tabler-chevron-up text-xl" />,
                              desc: <i className="tabler-chevron-down text-xl" />,
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
                  <td colSpan={table.getVisibleFlatColumns().length} className="text-center">
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={classnames({ 'bg-gray-100': row.getIsSelected() })}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-2 border-b">
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
          rowsPerPage={rowsPerPage}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => table.setPageIndex(page)}
          rowsPerPageOptions={[10, 25, 50]}
          onRowsPerPageChange={(e) => setRowsPerPage(Number(e.target.value))}
          labelRowsPerPage="Satır Sayısı"
        />
      </Card>
      {selectedCompany && (
        <CompaniesFilterDrawer
          open={filterDrawerOpen}
          handleClose={handleFilterDrawerClose}
          companyData={selectedCompany}
          handleUpdate={(updatedData) => console.log('Updated Company Data:', updatedData)}
        />
      )}
    </>
  );
};

export default CompaniesTable;
