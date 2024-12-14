// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
}

const StepPersonalDetails = ({ activeStep, handleNext, handlePrev, steps }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <CustomTextField fullWidth label='Ad' placeholder='' />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField fullWidth label='Soyad' placeholder='' />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField fullWidth label='Mail Adresi' placeholder='' />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField fullWidth label='Telefon Numarası' placeholder='' />
      </Grid>
      <Grid item xs={12}>
        <div className='flex items-center justify-between'>
          <Button
            variant='tonal'
            color='secondary'
            disabled={activeStep === 0}
            onClick={handlePrev}
            startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
          >
            Geri
          </Button>
          <Button
            variant='contained'
            color={activeStep === steps.length - 1 ? 'success' : 'primary'}
            onClick={handleNext}
            endIcon={
              activeStep === steps.length - 1 ? (
                <i className='tabler-check' />
              ) : (
                <DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />
              )
            }
          >
            {activeStep === steps.length - 1 ? 'Kaydet' : 'İleri'}
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default StepPersonalDetails
