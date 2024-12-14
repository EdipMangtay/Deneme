'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
  const { isBreakpointReached } = useVerticalNav()

  return (
    <div
      className={classnames(verticalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      <p>
        <span className='text-textSecondary'>{`© ${new Date().getFullYear()}, `}</span>
        <Link href='https://d2teknoloji.com/' target='_blank' className='text-primary uppercase'>
          D Kare Bilgi Teknolojileri
        </Link>
      </p>
      {!isBreakpointReached && (
        <div className='flex items-center gap-4'>
          <Link href='https://d2teknoloji.com/' target='_blank' className='text-primary'>
            Dökümantasyon
          </Link>
          <Link href='https://d2teknoloji.com/' target='_blank' className='text-primary'>
            Destek
          </Link>
        </div>
      )}
    </div>
  )
}

export default FooterContent
