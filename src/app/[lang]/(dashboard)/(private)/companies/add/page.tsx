import { getMetadata } from '@/utils/getMetadata'
import AddCompanyHeader from '@/views/dashboard/companies/add/AddCompanyHeader'
import AddCompanyWizard from '@/views/dashboard/companies/add/AddCompanyWizard'

export const metadata = getMetadata('Departman Ekle')

const Departments = () => {
  return (
    <>
      <AddCompanyHeader />
      <AddCompanyWizard />
    </>
  )
}

export default Departments
