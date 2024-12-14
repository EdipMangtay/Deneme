import { getMetadata } from '@/utils/getMetadata'
import AddReportsHeader from '@/views/dashboard/reports/add/AddReportsHeader'
import AddReportsWizard from '@/views/dashboard/reports/add/AddReportsWizard'

export const metadata = getMetadata('Personel Ekle')

const Reports = () => {
  return (
    <>
      <AddReportsHeader/>
      <AddReportsWizard />
    </>
  )
}

export default Reports

