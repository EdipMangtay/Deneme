import Link from 'next/link';

import { Breadcrumbs, Typography } from '@mui/material';

const AddDepartmentHeader = () => {
  return (
    <div className="p-4">
      <Breadcrumbs>
      <Link href="/tr/departments">Departmanlar</Link>
      <Typography color="textPrimary">Yeni Departman Ekle</Typography>
      </Breadcrumbs>
      <Typography variant="h5" className="mt-2">
        Yeni Departman Ekle
      </Typography>
    </div>
  );
};

export default AddDepartmentHeader;
