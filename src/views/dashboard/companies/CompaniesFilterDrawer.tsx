// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'

// Third-party Imports
import { useForm } from 'react-hook-form'

type CompanyData = {
  id: number
  taxNumber: string
  taxOffice: string
  name: string
  manager: string
  phone1: string
  phone2: string
  website: string
  city: string
  district: string
}

type Props = {
  open: boolean
  handleClose: () => void
  companyData: CompanyData | null
  handleUpdate: (updatedData: CompanyData) => void
  company: CompanyData
}

// Form Values tipini tanımlıyoruz
type FormValues = {
  taxNumber: string
  taxOffice: string
  name: string
  manager: string
  phone1: string
  phone2: string
  website: string
  city: string
  district: string
}

const CompaniesFilterDrawer = ({ open, handleClose, companyData, handleUpdate }: Props) => {
  // useForm ile default değerleri companyData ya da boş string olarak ayarlıyoruz.
  const { register, reset, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      taxNumber: companyData?.taxNumber || '10',
      taxOffice: companyData?.taxOffice || 'Ataşehir',
      name: companyData?.name || '',
      manager: companyData?.manager || '',
      phone1: companyData?.phone1 || '',
      phone2: companyData?.phone2 || '',
      website: companyData?.website || '',
      city: companyData?.city || '',
      district: companyData?.district || ''
    }
  })

  // companyData değiştiğinde formu resetliyoruz
  useEffect(() => {
    if (companyData) {
      reset({
        taxNumber: companyData.taxNumber || '10',
        taxOffice: companyData.taxOffice || 'Ataşehir',
        name: companyData.name || '',
        manager: companyData.manager || '',
        phone1: companyData.phone1 || '',
        phone2: companyData.phone2 || '',
        website: companyData.website || '',
        city: companyData.city || '',
        district: companyData.district || ''
      })
    }
  }, [companyData, reset])

  const handleFormSubmit = (data: FormValues) => {
    // form verilerini handleUpdate ile üst seviyeye iletiyoruz
    if (companyData) {
      const updatedData: CompanyData = {
        ...companyData,
        ...data
      }
      handleUpdate(updatedData)
    }
    handleClose()
  }

  const handleReset = () => {
    reset({
      taxNumber: '10',
      taxOffice: 'Ataşehir',
      name: '',
      manager: '',
      phone1: '',
      phone2: '',
      website: '',
      city: '',
      district: ''
    })
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
      <div className="flex items-center justify-between p-6">
        <Typography variant="h6">Şirket Düzenle</Typography>
        <IconButton size="small" onClick={handleReset}>
          <i className="tabler-x text-textSecondary text-2xl" />
        </IconButton>
      </div>
      <Divider />
      <div className="p-6">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
          <TextField
            fullWidth
            label="Vergi Numarası"
            {...register('taxNumber')}
          />
          <TextField
            fullWidth
            label="Vergi Dairesi"
            {...register('taxOffice')}
          />
          <TextField
            fullWidth
            label="Şirket Adı"
            {...register('name')}
          />
          <TextField
            fullWidth
            label="Şirket Sorumlusu"
            {...register('manager')}
          />
          <TextField
            fullWidth
            label="Telefon Numarası"
            {...register('phone1')}
          />
          <TextField
            fullWidth
            label="2. Telefon Numarası"
            {...register('phone2')}
          />
          <TextField
            fullWidth
            label="Web Sitesi"
            {...register('website')}
          />
          <TextField
            fullWidth
            label="İl"
            {...register('city')}
          />
          <TextField
            fullWidth
            label="İlçe"
            {...register('district')}
          />

          <div className="flex items-center gap-4 justify-end mt-6">
            <Button variant="tonal" color="error" type="reset" onClick={handleReset}>
              İptal
            </Button>
            <Button variant="contained" type="submit">
              Düzenle
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default CompaniesFilterDrawer
