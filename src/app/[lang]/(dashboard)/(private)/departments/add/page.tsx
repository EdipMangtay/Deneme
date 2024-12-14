import { getMetadata } from '@/utils/getMetadata'
import AddDepartmentHeader from '@/views/dashboard/departments/add/AddDepartmentHeader'
import AddDepartmentWizard from '@/views/dashboard/departments/add/AddDepartmentWizard'

export const metadata = getMetadata('Departman Ekle')

const Departments = () => {
  return (
    <>
      <AddDepartmentHeader />
      <AddDepartmentWizard />
    </>
  )
}

export default Departments
