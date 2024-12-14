// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'
import type { getDictionary } from '@/utils/getDictionary'

const verticalMenuData = (dictionary: Awaited<ReturnType<typeof getDictionary>>): VerticalMenuDataType[] => [
  {
    label: dictionary['navigation'].homepage,
    href: '/homepage',
    icon: 'tabler-smart-home',
    exactMatch: false,
    activeUrl: '/homepage'
  },
  {
    label: dictionary['navigation'].pages,
    isSection: true,
    children: [
      {
        label: dictionary['navigation'].businessUnit,
        icon: 'tabler-subtask',
        children: [
          {
            label: dictionary['navigation'].myTasks,
            href: '/business-unit/my-tasks',
            icon: 'tabler-circle',
            exactMatch: false,
            activeUrl: '/business-unit/my-tasks'
          },
          {
            label: dictionary['navigation'].completedTasks,
            href: '/business-unit/completed-tasks',
            icon: 'tabler-circle',
            exactMatch: false,
            activeUrl: '/business-unit/completed-tasks'
          }
        ]
      },
      {
        label: dictionary['navigation'].projects,
        icon: 'tabler-article',
        href: '/projects',
        exactMatch: false,
        activeUrl: '/projects'
      },
      {
        label: dictionary['navigation'].persons,
        icon: 'tabler-user',
        href: '/persons',
        exactMatch: false,
        activeUrl: '/persons'
      },
      {
        label: dictionary['navigation'].companies,
        icon: 'tabler-building',
        href: '/companies',
        exactMatch: false,
        activeUrl: '/companies'
      },
      {
        label: dictionary['navigation'].departments,
        icon: 'tabler-users-group',
        href: '/departments',
        exactMatch: false,
        activeUrl: '/departments'
      },
      {
        label: dictionary['navigation'].reports,
        icon: 'tabler-report',
        href: '/reports',
        exactMatch: false,
        activeUrl: '/reports'
      }
    ]
  }
]

export default verticalMenuData
