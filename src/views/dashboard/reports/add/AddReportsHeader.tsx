import Link from 'next/link'

import Typography from '@mui/material/Typography'

const AddReportsHeader = () => {
  return (
    <div className="flex items-center gap-2 p-6 border-b border-gray-200">
      <Link href="/tr/reports">
        <Typography className="text-blue-500 cursor-pointer">Raporlar</Typography>
      </Link>
      <span>/</span>
      <Typography className="font-semibold">Yeni Rapor Oluştur</Typography>
    </div>
  )
}

export default AddReportsHeader
