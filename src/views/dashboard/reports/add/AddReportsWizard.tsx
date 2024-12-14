'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

// Custom Imports
import StepReportDetails from './StepReportDetails'
import StepAdditionalInfo from './StepAdditionalInfo'

const AddReportWizard = () => {
  // States
  const [activeStep, setActiveStep] = useState(0)

  // Steps
  const steps = [
    { label: 'Rapor Bilgileri', description: 'Rapor Türü/Proje' },
    { label: 'Rapor Detayları', description: 'Saha Personelleri/İnşaat...' }
  ]

  // Handlers
  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1)
  }

  const handleSubmit = () => {
    console.log('Rapor başarıyla oluşturuldu!')
  }

  // Render Step Content
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <StepAdditionalInfo onNext={handleNext} />
      case 1:
        return <StepReportDetails onNext={handleNext} onBack={handleBack} />
      default:
        return null
    }
  }

  return (
    <Card style={{ padding: '24px', display: 'flex', gap: '24px' }}>
      {/* Sol Menü */}
      <div style={{ width: '250px', borderRight: '1px solid #ddd', paddingRight: '16px' }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>
                <Typography variant="subtitle1">{step.label}</Typography>
                <Typography variant="caption">{step.description}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {/* Sağ Form Alanı */}
      <div style={{ flex: 1 }}>
        <Typography variant="h6" gutterBottom>
          {steps[activeStep].label}
        </Typography>
        {renderStepContent(activeStep)}
        <Grid container justifyContent="space-between" style={{ marginTop: '24px' }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Geri
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Kaydet
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext}>
              İleri
            </Button>
          )}
        </Grid>
      </div>
    </Card>
  )
}

export default AddReportWizard
