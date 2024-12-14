'use client'

// React Imports
import { useRef, useState } from 'react'

// MUI Imports
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import { useTheme } from '@mui/material/styles'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Switch from '@mui/material/Switch'
import type { Breakpoint } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'
import { useDebounce, useMedia } from 'react-use'
import { HexColorPicker, HexColorInput } from 'react-colorful'
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { Settings } from '@core/contexts/settingsContext'
import type { Direction } from '@core/types'
import type { PrimaryColorConfig } from '@configs/primaryColorConfig'

// Icon Imports
import LayoutVertical from '@core/svg/LayoutVertical'
import LayoutCollapsed from '@core/svg/LayoutCollapsed'
import ContentCompact from '@core/svg/ContentCompact'
import ContentWide from '@core/svg/ContentWide'

// Config Imports
import primaryColorConfig from '@configs/primaryColorConfig'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Style Imports
import styles from './styles.module.css'

type CustomizerProps = {
  breakpoint?: Breakpoint | 'xxl' | `${number}px` | `${number}rem` | `${number}em`
  dir?: Direction
  disableDirection?: boolean
}

type DebouncedColorPickerProps = {
  settings: Settings
  isColorFromPrimaryConfig: PrimaryColorConfig | undefined
  handleChange: (field: keyof Settings | 'primaryColor', value: Settings[keyof Settings] | string) => void
}

const DebouncedColorPicker = (props: DebouncedColorPickerProps) => {
  // Props
  const { settings, isColorFromPrimaryConfig, handleChange } = props

  // States
  const [debouncedColor, setDebouncedColor] = useState(settings.primaryColor ?? primaryColorConfig[0].main)

  // Hooks
  useDebounce(() => handleChange('primaryColor', debouncedColor), 200, [debouncedColor])

  return (
    <>
      <HexColorPicker
        color={!isColorFromPrimaryConfig ? (settings.primaryColor ?? primaryColorConfig[0].main) : '#eee'}
        onChange={setDebouncedColor}
      />
      <HexColorInput
        className={styles.colorInput}
        color={!isColorFromPrimaryConfig ? (settings.primaryColor ?? primaryColorConfig[0].main) : '#eee'}
        onChange={setDebouncedColor}
        prefixed
        placeholder='Type a color'
      />
    </>
  )
}

const Customizer = ({ breakpoint = 'lg' }: CustomizerProps) => {
  // States
  const [isOpen, setIsOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Refs
  const anchorRef = useRef<HTMLDivElement | null>(null)

  // Hooks
  const theme = useTheme()
  const { settings, updateSettings, resetSettings, isSettingsChanged } = useSettings()
  const isSystemDark = useMedia('(prefers-color-scheme: dark)', false)

  // Vars
  let breakpointValue: CustomizerProps['breakpoint']

  switch (breakpoint) {
    case 'xxl':
      breakpointValue = '1920px'
      break
    case 'xl':
      breakpointValue = `${theme.breakpoints.values.xl}px`
      break
    case 'lg':
      breakpointValue = `${theme.breakpoints.values.lg}px`
      break
    case 'md':
      breakpointValue = `${theme.breakpoints.values.md}px`
      break
    case 'sm':
      breakpointValue = `${theme.breakpoints.values.sm}px`
      break
    case 'xs':
      breakpointValue = `${theme.breakpoints.values.xs}px`
      break
    default:
      breakpointValue = breakpoint
  }

  const breakpointReached = useMedia(`(max-width: ${breakpointValue})`, false)
  const isMobileScreen = useMedia('(max-width: 600px)', false)
  const isBelowLgScreen = useMedia('(max-width: 1200px)', false)
  const isColorFromPrimaryConfig = primaryColorConfig.find(item => item.main === settings.primaryColor)

  const ScrollWrapper = isBelowLgScreen ? 'div' : PerfectScrollbar

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  // Update Settings
  const handleChange = (field: keyof Settings | 'direction', value: Settings[keyof Settings] | Direction) => {
    updateSettings({ [field]: value })
  }

  const handleMenuClose = (event: MouseEvent | TouchEvent): void => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setIsMenuOpen(false)
  }

  return (
    !breakpointReached && (
      <div
        className={classnames('customizer', styles.customizer, {
          [styles.show]: isOpen,
          [styles.smallScreen]: isMobileScreen
        })}
      >
        <div className={styles.toggler} onClick={handleToggle}>
          <i className='tabler-settings text-[22px]' />
        </div>
        <div className={styles.header}>
          <div className='flex flex-col'>
            <h4 className={styles.customizerTitle}>Tema Düzenleyici</h4>
          </div>
          <div className='flex gap-4'>
            <div onClick={resetSettings} className='relative flex cursor-pointer'>
              <i className='tabler-refresh text-textPrimary' />
              <div className={classnames(styles.dotStyles, { [styles.show]: isSettingsChanged })} />
            </div>
            <i className='tabler-x text-textPrimary cursor-pointer' onClick={handleToggle} />
          </div>
        </div>
        <ScrollWrapper
          {...(isBelowLgScreen
            ? { className: 'bs-full overflow-y-auto overflow-x-hidden' }
            : { options: { wheelPropagation: false, suppressScrollX: true } })}
        >
          <div className={styles.customizerBody}>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col gap-2'>
                <p className='font-medium'>Ana Renk</p>
                <div className='flex items-center justify-between'>
                  {primaryColorConfig.map(item => (
                    <div
                      key={item.main}
                      className={classnames(styles.primaryColorWrapper, {
                        [styles.active]: settings.primaryColor === item.main
                      })}
                      onClick={() => handleChange('primaryColor', item.main)}
                    >
                      <div className={styles.primaryColor} style={{ backgroundColor: item.main }} />
                    </div>
                  ))}
                  <div
                    ref={anchorRef}
                    className={classnames(styles.primaryColorWrapper, {
                      [styles.active]: !isColorFromPrimaryConfig
                    })}
                    onClick={() => setIsMenuOpen(prev => !prev)}
                  >
                    <div
                      className={classnames(styles.primaryColor, 'flex items-center justify-center')}
                      style={{
                        backgroundColor: !isColorFromPrimaryConfig
                          ? settings.primaryColor
                          : 'var(--mui-palette-action-selected)',
                        color: isColorFromPrimaryConfig
                          ? 'var(--mui-palette-text-primary)'
                          : 'var(--mui-palette-primary-contrastText)'
                      }}
                    >
                      <i className='tabler-color-picker text-xl' />
                    </div>
                  </div>
                  <Popper
                    transition
                    open={isMenuOpen}
                    disablePortal
                    anchorEl={anchorRef.current}
                    placement='bottom-end'
                    className='z-[1]'
                  >
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} style={{ transformOrigin: 'right top' }}>
                        <Paper elevation={6} className={styles.colorPopup}>
                          <ClickAwayListener onClickAway={handleMenuClose}>
                            <div>
                              <DebouncedColorPicker
                                settings={settings}
                                isColorFromPrimaryConfig={isColorFromPrimaryConfig}
                                handleChange={handleChange}
                              />
                            </div>
                          </ClickAwayListener>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-medium'>Mod</p>
                <div className='flex items-center justify-between'>
                  <div className='flex flex-col items-start gap-0.5'>
                    <div
                      className={classnames(styles.itemWrapper, styles.modeWrapper, {
                        [styles.active]: settings.mode === 'light'
                      })}
                      onClick={() => handleChange('mode', 'light')}
                    >
                      <i className='tabler-sun text-[30px]' />
                    </div>
                    <p className={styles.itemLabel} onClick={() => handleChange('mode', 'light')}>
                      Açık
                    </p>
                  </div>
                  <div className='flex flex-col items-start gap-0.5'>
                    <div
                      className={classnames(styles.itemWrapper, styles.modeWrapper, {
                        [styles.active]: settings.mode === 'dark'
                      })}
                      onClick={() => handleChange('mode', 'dark')}
                    >
                      <i className='tabler-moon-stars text-[30px]' />
                    </div>
                    <p className={styles.itemLabel} onClick={() => handleChange('mode', 'dark')}>
                      Koyu
                    </p>
                  </div>
                  <div className='flex flex-col items-start gap-0.5'>
                    <div
                      className={classnames(styles.itemWrapper, styles.modeWrapper, {
                        [styles.active]: settings.mode === 'system'
                      })}
                      onClick={() => handleChange('mode', 'system')}
                    >
                      <i className='tabler-device-laptop text-[30px]' />
                    </div>
                    <p className={styles.itemLabel} onClick={() => handleChange('mode', 'system')}>
                      Sistem
                    </p>
                  </div>
                </div>
              </div>
              {settings.mode === 'dark' ||
              (settings.mode === 'system' && isSystemDark) ||
              settings.layout === 'horizontal' ? null : (
                <div className='flex items-center justify-between'>
                  <label className='font-medium cursor-pointer' htmlFor='customizer-semi-dark'>
                    Yarı Karanlık
                  </label>
                  <Switch
                    id='customizer-semi-dark'
                    checked={settings.semiDark === true}
                    onChange={() => handleChange('semiDark', !settings.semiDark)}
                  />
                </div>
              )}
            </div>
            <hr className={styles.hr} />
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col gap-2'>
                <p className='font-medium'>Yerleşim</p>
                <div className='flex items-center gap-4'>
                  <div className='flex flex-col items-start gap-0.5'>
                    <div
                      className={classnames(styles.itemWrapper, { [styles.active]: settings.layout === 'vertical' })}
                      onClick={() => handleChange('layout', 'vertical')}
                    >
                      <LayoutVertical />
                    </div>
                    <p className={styles.itemLabel} onClick={() => handleChange('layout', 'vertical')}>
                      Dikey
                    </p>
                  </div>
                  <div className='flex flex-col items-start gap-0.5'>
                    <div
                      className={classnames(styles.itemWrapper, { [styles.active]: settings.layout === 'collapsed' })}
                      onClick={() => handleChange('layout', 'collapsed')}
                    >
                      <LayoutCollapsed />
                    </div>
                    <p className={styles.itemLabel} onClick={() => handleChange('layout', 'collapsed')}>
                      Daraltılmış
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-medium'>İçerik</p>
                <div className='flex items-center gap-4'>
                  <div className='flex flex-col items-start gap-0.5'>
                    <div
                      className={classnames(styles.itemWrapper, {
                        [styles.active]: settings.contentWidth === 'compact'
                      })}
                      onClick={() =>
                        updateSettings({
                          navbarContentWidth: 'compact',
                          contentWidth: 'compact',
                          footerContentWidth: 'compact'
                        })
                      }
                    >
                      <ContentCompact />
                    </div>
                    <p
                      className={styles.itemLabel}
                      onClick={() =>
                        updateSettings({
                          navbarContentWidth: 'compact',
                          contentWidth: 'compact',
                          footerContentWidth: 'compact'
                        })
                      }
                    >
                      Kompakt
                    </p>
                  </div>
                  <div className='flex flex-col items-start gap-0.5'>
                    <div
                      className={classnames(styles.itemWrapper, { [styles.active]: settings.contentWidth === 'wide' })}
                      onClick={() =>
                        updateSettings({ navbarContentWidth: 'wide', contentWidth: 'wide', footerContentWidth: 'wide' })
                      }
                    >
                      <ContentWide />
                    </div>
                    <p
                      className={styles.itemLabel}
                      onClick={() =>
                        updateSettings({ navbarContentWidth: 'wide', contentWidth: 'wide', footerContentWidth: 'wide' })
                      }
                    >
                      Geniş
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollWrapper>
      </div>
    )
  )
}

export default Customizer
