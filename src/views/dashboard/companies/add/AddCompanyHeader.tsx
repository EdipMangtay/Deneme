'use client'

import Link from 'next/link'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const AddCompanyHeader = () => {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Breadcrumb benzeri başlık */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#6c757d', mr: 1 }}>
          <Link href="/companies" style={{ textDecoration: 'none', color: '#6c757d' }}>
            Şirketler
          </Link>
        </Typography>
        <Typography variant="body2" sx={{ color: '#6c757d' }}>
          / Yeni Şirket Oluştur
        </Typography>
      </Box>
    </Box>
  )
}

export default AddCompanyHeader
