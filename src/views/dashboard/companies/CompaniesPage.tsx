'use client'

// React Imports
import { useState } from 'react';

// MUI Imports
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Component Imports
import CompaniesTable from './CompaniesTable';
import CompanyDetail from './CompanyDetail';

const CompaniesPage = () => {
  const [selectedCompany, setSelectedCompany] = useState(null); // Seçilen şirketin verisi

  return (
    <>
    <Typography variant="h6" sx={{ fontWeight: 600 }}>
      Şirketler
    </Typography>
    <Grid container spacing={2}>
        {/* Sol tarafta tablo */}
        <Grid item xs={12} md={8} marginTop={5}>
          <CompaniesTable onRowClick={setSelectedCompany} />
        </Grid>

        {/* Sağ tarafta detay bileşeni */}
        <Grid item xs={12} md={4} marginTop={5}>
          <CompanyDetail selectedCompany={selectedCompany} />
        </Grid>
      </Grid>
      </>

  );
};

export default CompaniesPage;
