'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stepper from '@mui/material/Stepper'
import MuiStep from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import type { StepProps } from '@mui/material/Step'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import StepCompany from './StepCompany'
import StepPermissions from './StepCompanyDetails'

// Styled Components
import StepperWrapper from '@core/styles/stepper'

const steps = [
  {
    icon: 'tabler-building',
    title: 'Genel Bilgiler',
    subtitle: 'Şirket / Departman Adı...'
  },
  {
    icon: 'tabler-lock',
    title: 'Yetkiler',
    subtitle: 'Yetki Listesi...'
  }
]

const Step = styled(MuiStep)<StepProps>({
  '&.Mui-completed .step-title , &.Mui-completed .step-subtitle': {
    color: 'var(--mui-palette-text-disabled)'
  }
})

const getStepContent = (step: number, handleNext: () => void, handlePrev: () => void) => {
  if (step === 0) {
    return <StepCompany handleNext={handleNext} handlePrev={handlePrev} />
  } else {
    return <StepPermissions handleNext={handleNext} handlePrev={handlePrev} />
  }
}

const AddCompanyWizard = () => {
  const [activeStep, setActiveStep] = useState<number>(0)

  const handleNext = () => setActiveStep(prev => prev + 1)
  const handlePrev = () => setActiveStep(prev => prev - 1)

  return (
    <Card className="flex flex-col lg:flex-row">
      <CardContent className="max-lg:border-be lg:border-ie lg:min-is-[300px]">
        <StepperWrapper>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            connector={<></>}
            className="flex flex-col gap-4 min-is-[220px]"
          >
            {steps.map((label, index) => (
              <Step key={index} onClick={() => setActiveStep(index)}>
                <StepLabel icon={<></>} className="p-1 cursor-pointer">
                  <div className="step-label flex items-center gap-3">
                    <CustomAvatar
                      variant="rounded"
                      skin={activeStep === index ? 'filled' : 'light'}
                      {...(activeStep >= index && { color: 'primary' })}
                      {...(activeStep === index && { className: 'shadow-primarySm' })}
                      size={38}
                    >
                      <i className={`tabler ${label.icon}`} />
                    </CustomAvatar>
                    <div className="flex flex-col">
                      <Typography color="text.primary" className="step-title">
                        {label.title}
                      </Typography>
                      <Typography className="step-subtitle">{label.subtitle}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </StepperWrapper>
      </CardContent>
      <CardContent className="flex-1 pbs-6">
        {getStepContent(activeStep, handleNext, handlePrev)}
      </CardContent>
    </Card>
  )
}

export default AddCompanyWizard
