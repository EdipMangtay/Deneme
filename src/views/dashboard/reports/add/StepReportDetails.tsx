import { useForm } from 'react-hook-form';
import { TextField, Grid} from '@mui/material';

interface ReportDetails {
  durationExtension: string;
  comparisonAmount: string;
  revisedContractAmount: string;
  actualFFAmount: string;
  paidFFAmount: string;
  progressPayment: string;
  revisedEndDate: string;
  comparisonRate: string;
  revisedEndDateText: string;
  paidProgressPayment: string;
  actualFFRate: string;
  finalPNRate: string;
}

const StepReportDetails = ({
  onNext,
}: {
  onNext: (data: ReportDetails) => void;
  onBack: () => void;
}) => {
  const { register, handleSubmit } = useForm<ReportDetails>();

  const onSubmit = (data: ReportDetails) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Süre Uzatma"
            variant="outlined"
            {...register('durationExtension')}
          />
          <TextField
            fullWidth
            label="Mukayese Bedeli"
            variant="outlined"
            {...register('comparisonAmount')}
            style={{ marginTop: '16px' }}
          />
          <TextField
            fullWidth
            label="Revize Sözleşme Bedeli"
            variant="outlined"
            {...register('revisedContractAmount')}
            style={{ marginTop: '16px' }}
          />
          <TextField
            fullWidth
            label="Gerçekleşen FF Tutarı"
            variant="outlined"
            {...register('actualFFAmount')}
            style={{ marginTop: '16px' }}
          />
          <TextField
            fullWidth
            label="Ödenen FF Tutarı"
            variant="outlined"
            {...register('paidFFAmount')}
            style={{ marginTop: '16px' }}
          />
          <TextField
            fullWidth
            label="Hakediş İlerlemesi"
            variant="outlined"
            {...register('progressPayment')}
            style={{ marginTop: '16px' }}
          />
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Revize İş Bitim"
            variant="outlined"
            {...register('revisedEndDate')}
          />
          <TextField
            fullWidth
            label="Mukayese Oranı"
            variant="outlined"
            {...register('comparisonRate')}
            style={{ marginTop: '16px' }}
          />
          <TextField
            fullWidth
            label="Revize İş Bitim Tarihi"
            variant="outlined"
            {...register('revisedEndDateText')}
            style={{ marginTop: '16px' }}
          />
          <TextField
            fullWidth
            label="Ödenen Hakediş Tutarı"
            variant="outlined"
            {...register('paidProgressPayment')}
            style={{ marginTop: '16px' }}
          />
          <TextField
            fullWidth
            label="Gerçekleşen FF Oranı"
            variant="outlined"
            {...register('actualFFRate')}
            style={{ marginTop: '16px' }}
          />
          <TextField
            fullWidth
            label="Son PN Değerine Göre FF Oranı"
            variant="outlined"
            {...register('finalPNRate')}
            style={{ marginTop: '16px' }}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default StepReportDetails;
