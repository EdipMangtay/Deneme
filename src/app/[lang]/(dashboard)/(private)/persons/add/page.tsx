import { getMetadata } from '@/utils/getMetadata'
import AddPersonHeader from '@/views/dashboard/persons/add/AddPersonHeader'
import AddPersonWizard from '@/views/dashboard/persons/add/AddPersonWizard'

export const metadata = getMetadata('Personel Ekle')

const Persons = () => {
  return (
    <>
      <AddPersonHeader />
      <AddPersonWizard />
    </>
  )
}

export default Persons
