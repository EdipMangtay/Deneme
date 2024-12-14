import Grid from '@mui/material/Grid'

import { Card, CardContent, CardHeader } from '@mui/material'

import { getMetadata } from '@/utils/getMetadata'
import StatisticsCard from '@/views/dashboard/homepage/StatisticsCard'
import ApexLineChart from '@/views/dashboard/homepage/ApexLineChart'

export const metadata = getMetadata('Anasayfa')

const Homepage = () => {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={9}>
          <ApexLineChart />
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardHeader
              title='Bölgeler'
              subheader='Hatay İli'
              sx={{
                flexDirection: ['column', 'row'],
                alignItems: ['flex-start', 'center'],
                '& .MuiCardHeader-action': { mb: 0 },
                '& .MuiCardHeader-content': { mb: [2, 0] }
              }}
            />
            <CardContent className='text-center'>
              <img
                alt='Hatay'
                src='/images/hatay.png'
                className='max-bs-[250px] block-end-0 inline-end-6 max-is-full'
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Homepage
