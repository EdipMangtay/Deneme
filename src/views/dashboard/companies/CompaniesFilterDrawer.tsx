import React, { useEffect } from 'react';

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

type CompanyData = {
  id: number;
  taxNumber: string;
  taxOffice: string;
  name: string;
  manager: string;
  phone1: string;
  phone2: string;
  website: string;
  email: string;
  secondEmail: string;
  city: string;
  district: string;
};

type Props = {
  open: boolean;
  handleClose: () => void;
  companyData: CompanyData | null;
  handleUpdate: (updatedData: CompanyData) => void;
};

const CompaniesFilterDrawer: React.FC<Props> = ({
  open,
  handleClose,
  companyData,
  handleUpdate,
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CompanyData>({
    defaultValues: companyData || {
      id: 0,
      taxNumber: '',
      taxOffice: '',
      name: '',
      manager: '',
      phone1: '',
      phone2: '',
      website: '',
      email: '',
      secondEmail: '',
      city: '',
      district: '',
    },
  });

  useEffect(() => {
    if (companyData) {
      reset(companyData);
    } else {
      reset({
        id: 0,
        taxNumber: '',
        taxOffice: '',
        name: '',
        manager: '',
        phone1: '',
        phone2: '',
        website: '',
        email: '',
        secondEmail: '',
        city: '',
        district: '',
      });
    }
  }, [companyData, reset]);

  const onSubmit: SubmitHandler<CompanyData> = (data) => {
    handleUpdate(data);
    handleClose();
  };

  const onReset = () => {
    if (companyData) {
      reset(companyData);
    } else {
      reset({
        id: 0,
        taxNumber: '',
        taxOffice: '',
        name: '',
        manager: '',
        phone1: '',
        phone2: '',
        website: '',
        email: '',
        secondEmail: '',
        city: '',
        district: '',
      });
    }
    handleClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      sx={{ '& .MuiDrawer-paper': { width: 400 } }}
      ModalProps={{ keepMounted: true }}
    >
      <div className="flex items-center justify-between p-4">
        <Typography variant="h6">Şirket Düzenle</Typography>
        <IconButton onClick={handleClose}>
          <i className="tabler-x" />
        </IconButton>
      </div>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <TextField
          fullWidth
          label="Vergi Numarası"
          {...register('taxNumber', { required: 'Vergi Numarası zorunludur.' })}
          margin="normal"
          error={!!errors.taxNumber}
          helperText={errors.taxNumber?.message}
        />
        <TextField
          fullWidth
          label="Vergi Dairesi"
          {...register('taxOffice', { required: 'Vergi Dairesi zorunludur.' })}
          margin="normal"
          error={!!errors.taxOffice}
          helperText={errors.taxOffice?.message}
        />
        <TextField
          fullWidth
          label="Şirket Adı"
          {...register('name', { required: 'Şirket Adı zorunludur.' })}
          margin="normal"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          fullWidth
          label="Şirket Sorumlusu"
          {...register('manager', { required: 'Şirket Sorumlusu zorunludur.' })}
          margin="normal"
          error={!!errors.manager}
          helperText={errors.manager?.message}
        />
        <TextField
          fullWidth
          label="Telefon 1"
          {...register('phone1', { required: 'Telefon 1 zorunludur.' })}
          margin="normal"
          error={!!errors.phone1}
          helperText={errors.phone1?.message}
        />
        <TextField
          fullWidth
          label="Telefon 2"
          {...register('phone2')}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Web Sitesi"
          {...register('website')}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Mail Adresi"
          {...register('email', {
            required: 'Mail Adresi zorunludur.',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Geçerli bir mail adresi giriniz.'
            }
          })}
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          fullWidth
          label="2. Mail Adresi"
          {...register('secondEmail')}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Şehir"
          {...register('city', { required: 'Şehir zorunludur.' })}
          margin="normal"
          error={!!errors.city}
          helperText={errors.city?.message}
        />
        <TextField
          fullWidth
          label="İlçe"
          {...register('district', { required: 'İlçe zorunludur.' })}
          margin="normal"
          error={!!errors.district}
          helperText={errors.district?.message}
        />
        <div className="flex justify-end mt-4">
          <Button type="button" variant="outlined" onClick={onReset}>
            İptal
          </Button>
          <Button type="submit" variant="contained" sx={{ ml: 2 }}>
            Kaydet
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default CompaniesFilterDrawer;
