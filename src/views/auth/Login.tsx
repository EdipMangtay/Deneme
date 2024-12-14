'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Alert from '@mui/material/Alert'

// Third-party Imports
import { signIn } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { email, object, minLength, string, pipe, nonEmpty } from 'valibot'
import type { SubmitHandler } from 'react-hook-form'
import type { InferInput } from 'valibot'

// Type Imports
import type { Locale } from '@configs/i18n'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Styled Component Imports
import AuthIllustrationWrapper from './AuthIllustrationWrapper'

type FormData = InferInput<typeof schema>

const schema = object({
  email: pipe(string(), minLength(1, 'Mail adresi zorunludur'), email('Geçerli bir mail adresi girin')),
  password: pipe(string(), nonEmpty('Şifre zorunludur'), minLength(5, 'Şifre en az 5 karakter olmalıdır'))
})

const Login = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState<string | null>(null)

  // Hooks
  const { lang: locale } = useParams()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: 'admin@vuexy.com',
      password: 'admin'
    }
  })

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setErrorState(null)

    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (res && res.ok) {
      router.push(getLocalizedUrl('/', locale as Locale))
    } else {
      setErrorState('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.')
    }
  }

  return (
    <AuthIllustrationWrapper>
      <Card className='flex flex-col sm:w-[450px]'>
        <CardContent className='sm:!p-12'>
          <Link href={getLocalizedUrl('/', locale as Locale)} className='flex justify-center mbe-6'>
            <Typography variant='h4'>Onay Müşavirlik Takip Sistemi</Typography>
          </Link>
          {errorState && (
            <Alert severity='error' className='mbe-4'>
              {errorState}
            </Alert>
          )}
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  autoFocus
                  fullWidth
                  label='Mail Adresi'
                  placeholder='Mail adresinizi girin'
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Şifre'
                  placeholder='············'
                  type={isPasswordShown ? 'text' : 'password'}
                  error={!!errors.password}
                  helperText={errors.password?.message}
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
              )}
            />
            <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
              <FormControlLabel control={<Checkbox />} label='Beni Hatırla' />
              <Typography
                className='text-end'
                color='primary'
                component={Link}
                href={getLocalizedUrl('/forgot-password', locale as Locale)}
              >
                Şifremi Unuttum
              </Typography>
            </div>
            <Button fullWidth variant='contained' type='submit'>
              Giriş
            </Button>
          </form>
        </CardContent>
      </Card>
    </AuthIllustrationWrapper>
  )
}

export default Login
