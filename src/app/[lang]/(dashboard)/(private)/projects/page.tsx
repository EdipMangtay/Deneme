import { getMetadata } from '@/utils/getMetadata'
import ProjectTable from '@/views/dashboard/projects/ProjectTable'

export const metadata = getMetadata('Personeller')

const Persons = () => {
  return <ProjectTable/>
}

export default Persons
