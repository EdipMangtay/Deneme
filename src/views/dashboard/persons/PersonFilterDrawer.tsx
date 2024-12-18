'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm } from 'react-hook-form'

// Type Imports
import type { personType } from './PersonTable'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  open: boolean
  handleClose: () => void
  fakeUsers: personType[]
  setData: (data: personType[]) => void
}

type FormValues = {
  name: string
  role: string
  department: string
  email: string
  phone: string
}

const departmentMap: Record<number, string> = {
  1: 'Mühendislik',
  2: 'Proje Yönetimi',
  3: 'Muhasebe',
  4: 'Saha Operasyonları',
  5: 'IT Destek',
  6: 'Ar-Ge',
  7: 'Satış',
  8: 'Üretim',
  9: 'Finans',
  10: 'Teknik Destek',
  11: 'Lojistik Yönetimi',
  12: 'Müşteri Hizmetleri',
  13: 'Halkla İlişkiler',
  14: 'Kalite Kontrol',
  15: 'Yazılım Geliştirme'
}

const PersonFilterDrawer = (props: Props) => {
  // Props
  const { open, handleClose, fakeUsers, setData } = props

  // States
  const [role, setRole] = useState('')
  const [department, setDepartment] = useState('')

  // Hooks
  const {
    reset: resetForm,
    handleSubmit,
    formState: {}
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      role: '',
      department: '',
      email: '',
      phone: ''
    }
  })

  // Handle Form Submit
  const handleFormSubmit = () => {
    let filteredUsers = fakeUsers

    // Rol'e göre filtreleme
    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role)
    }

    // Departman'a göre filtreleme
    if (department) {
      // departmentMap'ten departman adını departmentId'ye çevir
      const departmentId = Object.keys(departmentMap).find(
        key => departmentMap[Number(key)] === department
      )

      if (departmentId) {
        filteredUsers = filteredUsers.filter(user => user.departmentId === Number(departmentId))
      }
    }

    console.log('Filtered Users:', filteredUsers)

    // Filtrelenmiş veriyi güncelle
    setData(filteredUsers)
    handleClose()
  }

  // Handle Form Reset
  const handleReset = () => {
    setRole('')
    setDepartment('')
    setData(fakeUsers) // Orijinal verileri geri yükler
    resetForm({
      name: '',
      role: '',
      department: '',
      email: '',
      phone: ''
    })
    handleClose()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose} // Pencereyi kapatırken sıfırlama yapmaz
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between p-6'>
        <Typography variant='h5'>Filtreler</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-textSecondary text-2xl' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-6'>
        <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-5'>
          <CustomTextField select fullWidth label='Rol' value={role} onChange={e => setRole(e.target.value)}>
            <MenuItem value='Baş Mühendis'>Baş Mühendis</MenuItem>
            <MenuItem value='Proje Sorumlusu'>Proje Sorumlusu</MenuItem>
            <MenuItem value='Saha Personeli'>Saha Personeli</MenuItem>
          </CustomTextField>
          <CustomTextField
            select
            fullWidth
            label='Departman'
            value={department}
            onChange={e => setDepartment(e.target.value)}
          >
            {Object.values(departmentMap).map(dep => (
              <MenuItem key={dep} value={dep}>
                {dep}
              </MenuItem>
            ))}
          </CustomTextField>
          <div className='flex items-center gap-4 justify-end'>
            <Button variant='tonal' color='error' type='button' onClick={handleReset}>
              Sıfırla
            </Button>
            <Button variant='contained' type='submit'>
              Uygula
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default PersonFilterDrawer
