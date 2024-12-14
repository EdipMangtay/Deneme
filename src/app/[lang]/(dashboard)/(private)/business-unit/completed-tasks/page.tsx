import { Typography } from '@mui/material'

import { getMetadata } from '@/utils/getMetadata'

export const metadata = getMetadata('Tamamlanmış İşler')

const CompletedTasks = () => {
  return <Typography variant='h5'>Tamamlanmış İşler</Typography>
}

export default CompletedTasks
