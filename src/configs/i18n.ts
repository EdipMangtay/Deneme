export const i18n = {
  defaultLocale: 'tr',
  locales: ['tr', 'en'],
  langDirection: {
    tr: 'ltr',
    en: 'ltr'
  }
} as const

export type Locale = (typeof i18n)['locales'][number]
