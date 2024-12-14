// MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const CompanyDetailWidget = ({ selectedCompany }) => {
  // Varsayılan Şirket Bilgileri
  const defaultCompany = {
    id: '634759',
    name: 'Onay Denetim',
    taxOffice: 'Ataşehir',
    taxNumber: '1234567890',
    manager: 'Berkay Ustem',
    phone: '0216 929 48 98',
    secondPhone: '0216 929 45 95',
    email: 'smthng@bisiler.com',
    secondEmail: 'smtbrky@gmail.com',
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
            Şirket Id #{company.id}
          </Typography>
          <Typography variant="h4">
            <strong>Şirket Detayları</strong>
          </Typography>

          <Divider sx={{ marginBottom: 4 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
              <strong>Telefon Numarası:</strong> {company.phone}
            </Typography>
            <Typography variant="h6">
              <strong>2. Telefon:</strong> {company.secondPhone}
            </Typography>
            <Typography variant="h6">
              <strong>Web Sitesi:</strong> {company.email}
            </Typography>
            <Typography variant="h6">
              <strong>Mail Adresi:</strong> {company.secondEmail}
            </Typography>
            <Typography variant="h6">
              <strong>İl:</strong> {company.city}
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
            marginTop: 6,
          }}
        >
          Detayları Güncelle
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompanyDetailWidget;
