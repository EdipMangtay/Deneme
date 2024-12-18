// DepartmentsPage.jsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import DepartmentCards from './DepartmentCards';
import DepartmentTable from './DepartmentTable';
import { fakeDepartments, fakeUsers } from '@/utils/fakeData';

const DepartmentsPage = () => {
  const searchParams = useSearchParams();

  // Varsayılan şirket ID'si
  const defaultCompanyId = 1;
  const [selectedCompanyId, setSelectedCompanyId] = useState<number>(defaultCompanyId);

  // URL'den companyId al ve state'i güncelle
  useEffect(() => {
    const companyIdFromUrl = searchParams.get('companyId');
    if (companyIdFromUrl && !isNaN(Number(companyIdFromUrl))) {
      setSelectedCompanyId(Number(companyIdFromUrl));
    } else {
      setSelectedCompanyId(defaultCompanyId);
    }
  }, [searchParams]);

  // Şirket ID'sine göre departmanları filtrele
  const filteredDepartments = useMemo(() => {
    return fakeDepartments.filter(dept => dept.companyId === selectedCompanyId);
  }, [selectedCompanyId]);

  // Her departman için kullanıcı sayısını hesapla
  const departmentsWithUserCount = useMemo(() => {
    return filteredDepartments.map(dept => {
      const userCount = fakeUsers.filter(user => user.departmentId === dept.id).length;
      return { ...dept, users: userCount };
    });
  }, [filteredDepartments]);

  // Şirketin departmanlarına ait kullanıcıları filtrele
  const filteredUsers = useMemo(() => {
    const departmentIds = filteredDepartments.map(dept => dept.id);
    return fakeUsers
      .filter(user => departmentIds.includes(user.departmentId))
      .map(user => ({
        ...user,
        departmentName: filteredDepartments.find(dept => dept.id === user.departmentId)?.name || 'Bilinmeyen Departman',
      }));
  }, [filteredDepartments]);

  return (
    <Box sx={{ px: 4, py: 2 }}>
      {/* Departmanlar Başlığı */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        Departmanlar
      </Typography>

      {/* Departman Kartları */}
      <DepartmentCards departments={departmentsWithUserCount} />

      {/* Kullanıcı Listesi Başlığı ve Alt Başlık */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 600,
          mt: 10,
          mb: 1,
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
      <DepartmentTable users={filteredUsers} />
    </Box>
  );
};

export default DepartmentsPage;
