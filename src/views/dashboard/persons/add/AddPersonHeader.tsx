// MUI Imports
import Button from '@mui/material/Button'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'

import Link from '@/components/Link'

const AddPersonHeader = () => {
  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6 mb-6'>
      <div>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link color='inherit' href='/tr/persons'>
            Kullanıcılar
          </Link>
          <Typography sx={{ color: 'text.primary' }}>Yeni Kullanıcı Ekle</Typography>
        </Breadcrumbs>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Link href='/tr/persons'>
          <Button variant='tonal' color='secondary'>
            Geri
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default AddPersonHeader
