import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

// Component Imports
import CustomTextField from '@core/components/mui/TextField';
import DirectionalIcon from '@components/DirectionalIcon';



type Props = {
  activeStep: number;
  handleNext: () => void;
  handlePrev: () => void;
  steps: { title: string; subtitle: string }[];
};

const StepGeneralDetails = ({handleNext, handlePrev}: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <CustomTextField
          select
          fullWidth
          label="Şirket"
          id="company-select"
          aria-describedby="company-select"
          defaultValue=""
        >
          <MenuItem value="Berkay İnşaat">Berkay İnşaat</MenuItem>
          <MenuItem value="Osman İnşaat">Osman İnşaat</MenuItem>
        </CustomTextField>
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField
          fullWidth
          label="Departman Adı"
          id="department-name"
          aria-describedby="department-name"
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          fullWidth
          multiline
          rows={4}
          label="Departman Açıklaması"
          id="department-description"
          aria-describedby="department-description"
        />
      </Grid>
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
            İleri
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default StepGeneralDetails;
