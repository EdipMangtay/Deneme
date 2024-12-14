import { getMetadata } from '@/utils/getMetadata'

export const metadata = getMetadata('Departmanlar')
import DepartmentsPage from '@/views/dashboard/departments/DepartmentsPage'


const Departments = () => {
  return <DepartmentsPage/>
}

export default Departments
