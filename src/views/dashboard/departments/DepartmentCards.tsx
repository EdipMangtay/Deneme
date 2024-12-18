import React from 'react'
import Link from 'next/link'
import { Box, Grid, Card, CardContent, Typography, Button, IconButton } from '@mui/material'
import { FaEye } from 'react-icons/fa'
import {fakeDepartments } from '@/utils/fakeData'

const DepartmentCards = () => {
  const departments = [
    { name: 'Hatay Cephe Departmanı', users: 12 },
    { name: 'Hatay Mühendislik Departmanı', users: 12 },
    { name: 'Antakya IT Departmanı', users: 13 },
    { name: 'Halkla İlişkiler Departmanı', users: 12 },
    { name: 'Hatay Dizayn Departmanı', users: 12 },
    { name: 'İstanbul Dizayn Departmanı', users: 12 }
  ]

  return (
    <Box sx={{ flexGrow: 1, px: 4, py: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        Departmanlar
      </Typography>

      <Grid container spacing={2}>
        {departments.map((dept, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                p: 2
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#212529',
                    mb: 0.5
                  }}
                >
                  {dept.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#6c757d',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  {dept.users} Kullanıcı
                </Typography>
                <Box sx={{ textAlign: 'right', mt: 1 }}>
                  <Button
                    variant="text"
                    sx={{
                      textTransform: 'none',
                      color: '#007bff',
                      fontWeight: 500,
                      fontSize: '14px',
                      padding: 0,
                      minWidth: 0
                    }}
                  >
                    <IconButton title="Detayları Gör">
                      <FaEye />
                    </IconButton>
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'right', mt: 4 }}>
        <Link href="/departments/add" passHref>
          <Button variant="contained" sx={{ textTransform: 'none', fontWeight: 500 }}>
            + Yeni Departman Ekle
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default DepartmentCards
