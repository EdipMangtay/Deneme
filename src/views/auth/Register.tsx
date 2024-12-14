'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Styled Component Imports
import AuthIllustrationWrapper from './AuthIllustrationWrapper'

const Register = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  return (
    <AuthIllustrationWrapper>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='sm:!p-12'>
          <div className='flex flex-col gap-1 mbe-6'>
            <Typography variant='h4'>Onay Müşavirlik Takip Sistemi</Typography>
            <Typography>Giriş sağlamak için kişisel bilgilerini ve şifrenizi oluşturun.</Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='flex flex-col gap-6'>
            <CustomTextField autoFocus fullWidth label='Ad' placeholder='Adınızı girin' />
            <CustomTextField autoFocus fullWidth label='Soyad' placeholder='Soyadınızı girin' />
            <CustomTextField fullWidth label='Mail Adresi' placeholder='Mail adresini girin' />
            <CustomTextField
              fullWidth
              label='Yeni Şifre'
              placeholder='Yeni Şifrenizi girin'
              type={isPasswordShown ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                      <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <CustomTextField
              fullWidth
              label='Şifre Onayı'
              placeholder='Şifrenizi tekrar girin'
              type={isPasswordShown ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                      <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label={
                <>
                  <span>Kabul ediyorum </span>
                  <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
                    gizlilik politikası ve şartlar
                  </Link>
                </>
              }
            />
            <Button fullWidth variant='contained' type='submit'>
              Oluştur
            </Button>
          </form>
        </CardContent>
      </Card>
    </AuthIllustrationWrapper>
  )
}

export default Register
