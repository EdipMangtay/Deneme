import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { fakeCompanies } from '@/utils/fakeData';

// MUI Imports
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// Third-party Imports
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  FilterFn,
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';

// Style Imports
import tableStyles from '@core/styles/table.module.css';
import TablePaginationComponent from '@components/TablePaginationComponent';
import CompaniesFilterDrawer from './CompaniesFilterDrawer';
import { IconButton } from '@mui/material';

// Şirket tipi
type Company = {
  id: number;
  name: string;
  manager: string;
  phone: string;
  email: string;
};

// Fuzzy Filter
const fuzzyFilter: FilterFn<Company> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

const companyData = fakeCompanies.map((company) =>({
  id: company.id,
  name: company.name,
  manager: company.manager,
  phone: '555-123-4567',
  email: ''
}))

const columnHelper = createColumnHelper<Company>();

const CompaniesTable = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const handleFilterDrawerOpen = () => setFilterDrawerOpen(true);

  const handleDelete = (id: number) => {
    console.log(`Şirket ID: ${id} silindi.`);
  };

  const columns = useMemo(() => [
    columnHelper.accessor('name', {
      header: 'FİRMA ADI',
      cell: ({ row }: { row: any }) => <Typography>{row.original.name}</Typography>,
    }),
    columnHelper.accessor('manager', {
      header: 'FİRMA SORUMLUSU',
      cell: ({ row }: { row: any }) => <Typography>{row.original.manager}</Typography>,
    }),
    {
      id: 'actions',
      header: 'İŞLEMLER',
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center gap-2">
          <IconButton title="Şirket Detayları" onClick={handleFilterDrawerOpen}>
            <i className="tabler-eye" />
          </IconButton>
          <Link href="/tr/persons" passHref>
            <IconButton title="Personeller">
              <i className="tabler-users" />
            </IconButton>
          </Link>
          <Link href="/tr/departments" passHref>
            <IconButton title="Departmanlar">
              <i className="tabler-building" />
            </IconButton>
          </Link>
          <IconButton
            title="Sil"
            onClick={() => handleDelete(row.original.id)}
            style={{ color: '' }}
          >
            <i className="tabler-trash" />
          </IconButton>
        </div>
      ),
    },
  ], []);

  const table = useReactTable({
    data: companyData,
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
                    <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
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
          count={companyData.length}
          rowsPerPage={rowsPerPage}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => table.setPageIndex(page)}
          rowsPerPageOptions={[10, 25, 50]}
          onRowsPerPageChange={(e) => setRowsPerPage(Number(e.target.value))}
        />
      </Card>
      <CompaniesFilterDrawer
        open={filterDrawerOpen}
        handleClose={() => setFilterDrawerOpen(false)} companyData={null} handleUpdate={function (updatedData: { id: number; taxNumber: string; taxOffice: string; name: string; manager: string; phone1: string; phone2: string; website: string; city: string; district: string; }): void {
          throw new Error('Function not implemented.');
        } } company={{
          id: 0,
          taxNumber: '',
          taxOffice: '',
          name: '',
          manager: '',
          phone1: '',
          phone2: '',
          website: '',
          city: '',
          district: ''
        }}      />
    </>
  );
};

export default CompaniesTable;
