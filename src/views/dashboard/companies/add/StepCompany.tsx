import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'

type Props = {
  handleNext: () => void
  handlePrev: () => void
}

const StepCompany = ({ handleNext, handlePrev }: Props) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <CustomTextField fullWidth label="Vergi Numarası" defaultValue="" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField fullWidth label="Vergi Dairesi" defaultValue="Ataşehir" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField fullWidth label="Şirket Adı" defaultValue="Berkay İnşaat" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField fullWidth label="Mail Adresi" defaultValue="smthbkry@gmail.com" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField fullWidth label="Telefon Numarası" defaultValue="0216 929 48 98" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField fullWidth label="2. Telefon" defaultValue="0216 929 48 98" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField fullWidth label="Web Sitesi" defaultValue="smthng@bilsiler.com" />
      </Grid>
      <Grid item xs={12} sm={3}>
        <CustomTextField fullWidth label="İl" defaultValue="İstanbul" />
      </Grid>
      <Grid item xs={12} sm={3}>
        <CustomTextField fullWidth label="İlçe" defaultValue="Ataşehir" />
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={12}>
        <div className="flex items-center justify-between">
          <Button
            variant="tonal"
            color="secondary"
            disabled // İlk adımda geri butonu pasif
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
  )
}

export default StepCompany
