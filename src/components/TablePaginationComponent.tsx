// MUI Imports
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

// Third-party Imports
import { Table } from '@tanstack/react-table';

const TablePaginationComponent = <T,>({ table }: { table: Table<T> }) => {
  return (
    <div className="flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2">
      <Typography color="text.disabled">
        Sayfa {table.getState().pagination.pageIndex + 1} /{' '}
        {Math.ceil(table.getFilteredRowModel().rows.length / table.getState().pagination.pageSize)}
      </Typography>
      <Pagination
        shape="rounded"
        color="primary"
        variant="tonal"
        count={Math.ceil(table.getFilteredRowModel().rows.length / table.getState().pagination.pageSize)}
        page={table.getState().pagination.pageIndex + 1}
        onChange={(_, page) => {
          table.setPageIndex(page - 1);
        }}
        showFirstButton
        showLastButton
      />
    </div>
  );
};

export default TablePaginationComponent;
