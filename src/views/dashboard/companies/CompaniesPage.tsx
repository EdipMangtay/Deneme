'use client';

import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CompaniesTable from './CompaniesTable';
import CompanyDetailWidget from './CompanyDetail';

type CompanyData = {
  id: number;
  taxNumber: string;
  taxOffice: string;
  name: string;
  manager: string;
  phone1: string;
  phone2: string;
  website: string;
  email: string;
  secondEmail: string;
  city: string;
  district: string;
};

const CompaniesPage = () => {
  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(null);

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Şirketler
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} marginTop={5}>
          {/* CompaniesTable bir onRowClick prop'u olmadığı için bu örnekte direk kullanıyorum.
              Eğer onRowClick kullanmak istiyorsanız CompaniesTable bileşeninde de tanımlamalısınız. */}
          <CompaniesTable />
        </Grid>

        <Grid item xs={12} md={4} marginTop={5}>
          <CompanyDetailWidget selectedCompany={selectedCompany} openEdit={() => {/** Drawer açma fonksiyonu ekleyin */}} />
        </Grid>
      </Grid>
    </>
  );
};

export default CompaniesPage;
