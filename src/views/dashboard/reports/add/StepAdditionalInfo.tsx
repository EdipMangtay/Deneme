import { useForm } from 'react-hook-form';
import { TextField, MenuItem, Grid} from '@mui/material';

const StepAdditionalInfo = ({ onNext }: { onNext: (data: any) => void }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {/* Rapor Türü */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Rapor Türü"
            variant="outlined"
            {...register('reportType', { required: true })}
          >
            <MenuItem value="Haftalık">Haftalık</MenuItem>
            <MenuItem value="Aylık">Aylık</MenuItem>
          </TextField>
        </Grid>

        {/* İl */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="İl"
            variant="outlined"
            {...register('city', { required: true })}
          >
            <MenuItem value="Hatay">Hatay</MenuItem>
            <MenuItem value="İstanbul">İstanbul</MenuItem>
            <MenuItem value="Ankara">Ankara</MenuItem>
          </TextField>
        </Grid>

        {/* Proje */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Proje"
            variant="outlined"
            {...register('project', { required: true })}
          >
            <MenuItem value="Etap 1">Etap 1</MenuItem>
            <MenuItem value="Etap 2">Etap 2</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {/* İleri Butonu */}

    </form>
  );
};

export default StepAdditionalInfo;
