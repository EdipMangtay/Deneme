'use client'

import Link from 'next/link'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const AddCompanyHeader = () => {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Breadcrumb benzeri başlık */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" sx={{ color: "c", mr: 1 }}>
        <Link href="/tr/companies">
        <Typography className="text-blue-500 cursor-pointer">Şirketler</Typography>
      </Link>
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          / Yeni Şirket Oluştur
        </Typography>
      </Box>
    </Box>
  )
}

export default AddCompanyHeader
