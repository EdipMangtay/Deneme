import { getMetadata } from '@/utils/getMetadata'
import PersonTable from '@/views/dashboard/persons/PersonTable'

export const metadata = getMetadata('Personeller')

const Persons = () => {
  return <PersonTable />
}

export default Persons
