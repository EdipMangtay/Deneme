// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import { useForm } from 'react-hook-form'

// Type Imports
import type { ReportType } from './ReportsTable'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

// City List Import
import cityList from './cities'

type Props = {
  open: boolean
  handleClose: () => void
  applyFilters: (filters: Partial<ReportType>) => void
}

type FormValues = {
  reportType: string
  city: string
}

const ReportFilterDrawer = (props: Props) => {
  // Props
  const { open, handleClose, applyFilters } = props

  // States
  const [reportType, setReportType] = useState('')
  const [city, setCity] = useState('')

  // Hooks
  const { reset: resetForm, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      reportType: '',
      city: ''
    }
  })

  // Handle Form Submit
  const handleFormSubmit = (data: FormValues) => {
    applyFilters({
      reportType: data.reportType,
      city: data.city
    })
    handleClose()
  }

  // Handle Form Reset
  const handleReset = () => {
    resetForm({
      reportType: '',
      city: ''
    })
    setReportType('')
    setCity('')
    applyFilters({})
    handleClose()
  }

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className="flex items-center justify-between pli-6 plb-5">
        <Typography variant="h5">Filtreler</Typography>
        <IconButton size="small" onClick={handleReset}>
          <i className="tabler-x text-textSecondary text-2xl" />
        </IconButton>
      </div>
      <Divider />
      <div className="p-6">
        <form onSubmit={handleSubmit(data => handleFormSubmit(data))} className="flex flex-col gap-5">
          {/* Rapor Türü */}
          <CustomTextField
            select
            fullWidth
            label="Rapor Türü"
            value={reportType}
            onChange={e => setReportType(e.target.value)}
          >
            <MenuItem value="">Tümü</MenuItem>
            <MenuItem value="Haftalık">Haftalık</MenuItem>
            <MenuItem value="Aylık">Aylık</MenuItem>
          </CustomTextField>

          {/* İl */}
          <CustomTextField
            select
            fullWidth
            label="İl"
            value={city}
            onChange={e => setCity(e.target.value)}
          >
            <MenuItem value="">Tümü</MenuItem>
            {cityList.map(cityName => (
              <MenuItem key={cityName} value={cityName}>
                {cityName}
              </MenuItem>
            ))}
          </CustomTextField>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 justify-end">
            <Button variant="tonal" color="error" type="reset" onClick={handleReset}>
              İptal
            </Button>
            <Button variant="contained" type="submit">
              Uygula
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default ReportFilterDrawer
