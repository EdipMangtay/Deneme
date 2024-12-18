import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { fakeCompanies } from '@/utils/fakeData';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { IconButton } from '@mui/material';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  FilterFn,
  Row
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';

import tableStyles from '@core/styles/table.module.css';
import TablePaginationComponent from '@components/TablePaginationComponent';
import CompaniesFilterDrawer from './CompaniesFilterDrawer';

// CompanyData tipi, fakeCompanies veri yapısına uygun şekilde tanımlanmalı.
// fakeCompanies verisinde email ve secondEmail gibi alanların da olduğundan emin olun.
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
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(null);

  const handleFilterDrawerOpen = (companyId: number) => {
    const company = fakeCompanies.find((c) => c.id === companyId) || null;
    setSelectedCompany(company);
    setFilterDrawerOpen(true);
  };

  const handleFilterDrawerClose = () => {
    setSelectedCompany(null);
    setFilterDrawerOpen(false);
  };

  const handleDelete = (id: number) => {
    console.log(`Şirket ID: ${id} silindi.`);
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'FİRMA ADI',
        cell: ({ row }: { row: Row<TableCompany> }) => <Typography>{row.original.name}</Typography>,
      }),
      columnHelper.accessor('manager', {
        header: 'FİRMA SORUMLUSU',
        cell: ({ row }: { row: Row<TableCompany> }) => <Typography>{row.original.manager}</Typography>,
      }),
      columnHelper.accessor('phone', {
        header: 'TELEFON',
        cell: ({ row }: { row: Row<TableCompany> }) => <Typography>{row.original.phone}</Typography>,
      }),
      columnHelper.accessor('website', {
        header: 'WEB SİTESİ',
        cell: ({ row }: { row: Row<TableCompany> }) => <Typography>{row.original.website}</Typography>,
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
    []
  );

  const table = useReactTable({
    data: companyDataForTable,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <Card>
        <div className="flex justify-between items-center p-4">
          <Select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            size="small"
            displayEmpty
            sx={{ width: 80 }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
          <div className="flex items-center gap-4">
            <TextField
              label="Şirket Ara"
              variant="outlined"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              size="small"
            />
            <Link href="/tr/companies/add">
              <Button variant="contained" startIcon={<i className="tabler-plus" />}>
                Yeni Şirket Ekle
              </Button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={companyDataForTable.length}
          rowsPerPage={rowsPerPage}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => table.setPageIndex(page)}
          rowsPerPageOptions={[10, 25, 50]}
          onRowsPerPageChange={(e) => setRowsPerPage(Number(e.target.value))}
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
