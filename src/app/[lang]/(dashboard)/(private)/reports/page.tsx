import { getMetadata } from '@/utils/getMetadata'
import ReportsTable from '@/views/dashboard/reports/ReportsTable'

export const metadata = getMetadata('Personeller')

const Persons = () => {
  return <ReportsTable/>
}

export default Persons
