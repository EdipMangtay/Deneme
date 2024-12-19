import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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

type Props = {
  selectedCompany: CompanyData | null;
  openEdit: () => void;
};

const CompanyDetailWidget: React.FC<Props> = ({ selectedCompany, openEdit }) => {
  const defaultCompany: CompanyData = {
    id: 634759,
    name: 'Onay Denetim',
    taxOffice: 'Ataşehir',
    taxNumber: '1234567890',
    manager: 'Berkay Ustem',
    phone1: '0216 929 48 98',
    phone2: '0216 929 45 95',
    website: 'www.onaydenetim.com',
    email: 'info@onaydenetim.com',
    secondEmail: 'support@onaydenetim.com',
    city: 'İstanbul',
    district: 'Ataşehir',
  };

  const company = selectedCompany || defaultCompany;

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 350,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
        padding: 2,
        minHeight: 600,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardContent>
        <Box>
          <Typography variant="h4" gutterBottom>
            {company.name}
          </Typography>

          <Typography variant="h6" color="textSecondary" sx={{ marginBottom: 2 }}>
            Şirket ID #{company.id}
          </Typography>
          <Typography variant="h4">
            <strong>Şirket Detayları</strong>
          </Typography>

          <Divider sx={{ marginBottom: 4 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">
              <strong>Vergi Dairesi:</strong> {company.taxOffice}
            </Typography>
            <Typography variant="h6">
              <strong>Vergi Numarası:</strong> {company.taxNumber}
            </Typography>
            <Typography variant="h6">
              <strong>Şirket Sorumlusu:</strong> {company.manager}
            </Typography>
            <Typography variant="h6">
              <strong>Telefon 1:</strong> {company.phone1}
            </Typography>
            <Typography variant="h6">
              <strong>Telefon 2:</strong> {company.phone2}
            </Typography>
            <Typography variant="h6">
              <strong>Web Sitesi:</strong> {company.website}
            </Typography>
            <Typography variant="h6">
              <strong>Mail Adresi:</strong> {company.email}
            </Typography>
            <Typography variant="h6">
              <strong>2. Mail Adresi:</strong> {company.secondEmail}
            </Typography>
            <Typography variant="h6">
              <strong>Şehir:</strong> {company.city}
            </Typography>
            <Typography variant="h6">
              <strong>İlçe:</strong> {company.district}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            marginTop: 4,
          }}
          onClick={openEdit}
        >
          Detayları Güncelle
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompanyDetailWidget;
