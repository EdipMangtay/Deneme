import React from 'react'
import { Box, Typography } from '@mui/material'

import DepartmentCards from './DepartmentCards'
import DepartmentTable from './DepartmentTable'

const DepartmentsPage = () => {
  return (
    <Box sx={{ px: 4, py: 2 }}>
      {/* Departmanlar Başlığı */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        Departmanlar
      </Typography>

      {/* Departman Kartları */}
      <DepartmentCards />

      {/* Kullanıcı Listesi Başlığı ve Alt Başlık */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 600,
          mt: 10,
          mb: 1,
          color: '#212529',
        }}
      >
        Kullanıcı Listesi
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: '#6c757d',
          fontSize: '14px',
          mb: 3,
        }}
      >
        Departmanlara ait kullanıcı listesi
      </Typography>

      {/* Kullanıcı Tablosu */}
      <DepartmentTable />
    </Box>
  )
}

export default DepartmentsPage
