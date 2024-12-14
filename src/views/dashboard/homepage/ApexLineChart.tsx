'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const series = [
  {
    name: 'Mevcut İlerleme',
    data: [0, 5, 10, 25, 35, 55, 75, 85, 95, 100, 100]
  },
  {
    name: 'Beklenen İlerleme',
    data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  }
]

const ApexLineChart = () => {
  // Vars
  const divider = 'var(--mui-palette-divider)'
  const disabledText = 'var(--mui-palette-text-disabled)'

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    colors: ['#ff9f43', '#7367f0'],
    stroke: { curve: 'straight', width: [5, 2] },
    dataLabels: { enabled: false },
    markers: {
      size: [5, 2],
      strokeWidth: 3,
      strokeOpacity: 1,
      colors: ['#ff9f43'],
      strokeColors: ['#fff']
    },
    grid: {
      padding: { top: -10 },
      borderColor: divider,
      xaxis: {
        lines: { show: true }
      }
    },
    tooltip: {
      enabled: false
    },
    legend: {
      show: false
    },
    yaxis: {
      labels: {
        style: { colors: disabledText, fontSize: '13px' }
      },
      min: 0,
      max: 100
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: divider },
      crosshairs: {
        stroke: { color: divider }
      },
      labels: {
        style: { colors: disabledText, fontSize: '13px' }
      },
      categories: ['2/12', '3/12', '4/12', '5/12', '6/12', '7/12', '8/12', '9/12', '10/12', '11/12', '12/12']
    }
  }

  return (
    <Card>
      <CardHeader
        title='Plan ve Performans Takibi'
        subheader='Gerçekleşen sürenin planlanan süreden farklılığı'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <AppReactApexCharts type='line' width='100%' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default ApexLineChart
