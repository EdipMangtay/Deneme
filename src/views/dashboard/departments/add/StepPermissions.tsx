import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon';

type Props = {
  handleNext: () => void;
  handlePrev: () => void;
};

const permissions = ['Okuma', 'Yazma', 'Oluşturma'];

const categories = [
  'Admin',
  'Kullanıcı Yönetimi',
  'Proje Yönetimi',
  'İş Yönetimi',
  'Grup Yönetimi',
];

const StepPermissions = ({ handleNext, handlePrev }: Props) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          YETKİLER
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox />}
          label={<Typography variant="body1">Hepsini Seç</Typography>}
        />
      </Grid>
      {categories.map((category, index) => (
        <Grid item xs={12} key={category}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={3}>
              <Typography variant="body1">{category}</Typography>
            </Grid>
            {permissions.map((perm) => (
              <Grid item key={perm}>
                <FormControlLabel
                  control={<Checkbox />}
                  label={<Typography variant="body2">{perm}</Typography>}
                />
              </Grid>
            ))}
          </Grid>
          {index < categories.length - 1 && <Divider />}
        </Grid>
      ))}
      <Grid item xs={12}>
        <div className="flex items-center justify-between">
          <Button
            variant="tonal"
            color="secondary"
            onClick={handlePrev}
            startIcon={
              <DirectionalIcon ltrIconClass="tabler-arrow-left" rtlIconClass="tabler-arrow-right" />
            }
          >
            Geri
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            endIcon={
              <DirectionalIcon ltrIconClass="tabler-arrow-right" rtlIconClass="tabler-arrow-left" />
            }
          >
            Ekle
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default StepPermissions;
