// DepartmentCards.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Box, Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Department {
  id: number;
  name: string;
  companyId: number;
  users?: number; // Kullanıcı sayısı
}

interface DepartmentCardsProps {
  departments: Department[];
}

const DepartmentCards: React.FC<DepartmentCardsProps> = ({ departments }) => {
  const handleDelete = (id: number) => {
    console.log(`Departman ID: ${id} silindi.`);
    // Silme işlemi için gerekli fonksiyonelliği ekleyebilirsiniz
  };

  return (
    <Box sx={{ flexGrow: 1, px: 1, py: 2 }}>
      <Grid container spacing={3}>
        {departments.map((dept) => (
          <Grid item xs={12} sm={6} md={4} key={dept.id}>
            <Card
              sx={{
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                p: 0.4,
              }}
            >
              <CardContent>
                {/* Departman Adı */}
                <Typography
                  variant="h5"
                  sx={{ fontSize: '20px', fontWeight: 600 }}
                >
                  {dept.name}
                </Typography>
                {/* Kullanıcı Sayısı */}
                <Typography variant="body2" color="text.secondary">
                  {dept.users} Kullanıcı
                </Typography>

                {/* Düzenle Linki */}
                <Box sx={{ textAlign: 'right', mt: 2 }}>
                  <Link href={`/departments/${dept.id}/edit`} passHref>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: '14px',
                        color: '#007bff',
                        cursor: 'pointer',
                        fontWeight: 500,
                      }}
                    >
                      Düzenle
                    </Typography>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DepartmentCards;
