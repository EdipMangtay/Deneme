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
  personData: personType[]
  setData: (data: personType[]) => void
}

type FormValues = {
  name: string
  role: string
  department: string
  email: string
  phone: string
}

const PersonFilterDrawer = (props: Props) => {
  // Props
  const { open, handleClose, personData, setData } = props

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
  const handleFormSubmit = (data: FormValues) => {
    const newData = {
      id: personData.length + 1,
      name: data.name,
      role: data.role,
      department: data.department,
      email: data.email,
      phone: data.phone
    }

    setData([...personData, newData])
    handleReset()
  }

  // Handle Form Reset
  const handleReset = () => {
    handleClose()
    resetForm({
      name: '',
      role: '',
      department: '',
      email: '',
      phone: ''
    })
    setRole('')
    setDepartment('')
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between pli-6 plb-5'>
        <Typography variant='h5'>Filtreler</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-textSecondary text-2xl' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-6'>
        <form onSubmit={handleSubmit(data => handleFormSubmit(data))} className='flex flex-col gap-5'>
          <CustomTextField select fullWidth label='Rol' value={role} onChange={e => setRole(e.target.value)}>
            <MenuItem value='HouseHold'>Proje Sorumlusu</MenuItem>
            <MenuItem value='Management'>Yönetici</MenuItem>
            <MenuItem value='Electronics'>Saha Personeli</MenuItem>
          </CustomTextField>
          <CustomTextField
            select
            fullWidth
            label='Departman'
            value={department}
            onChange={e => setDepartment(e.target.value)}
          >
            <MenuItem value='HouseHold'>Mekanik</MenuItem>
            <MenuItem value='Management'>Elektrik</MenuItem>
            <MenuItem value='Electronics'>İnşaat</MenuItem>
          </CustomTextField>
          <div className='flex items-center gap-4 justify-end'>
            <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
              İptal
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
