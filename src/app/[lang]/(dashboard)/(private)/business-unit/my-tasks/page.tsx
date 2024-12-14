import { Typography } from '@mui/material'

import { getMetadata } from '@/utils/getMetadata'

export const metadata = getMetadata('İşlerim')

const MyTasks = () => {
  return <Typography variant='h5'>İşlerim</Typography>
}

export default MyTasks
