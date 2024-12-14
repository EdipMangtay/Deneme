// MUI IMports
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'

type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
}

const StepCompanyDetails = ({ activeStep, handleNext, handlePrev, steps }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <CustomTextField
          select
          fullWidth
          label='Şirket Seç'
          id='country-select'
          aria-describedby='country-select'
          defaultValue=''
        >
          <MenuItem value='1'>Berkay İnşaat</MenuItem>
        </CustomTextField>
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField
          select
          fullWidth
          label='Departman Seç'
          id='country-select'
          aria-describedby='country-select'
          defaultValue=''
        >
          <MenuItem value='1'>Teknik Ofis 1</MenuItem>
          <MenuItem value='2'>Teknik Ofis 2</MenuItem>
          <MenuItem value='3'>Teknik Ofis 3</MenuItem>
        </CustomTextField>
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
            Previous
          </Button>
          <Button
            variant='contained'
            color={activeStep === steps.length - 1 ? 'primary' : 'primary'}
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

export default StepCompanyDetails
