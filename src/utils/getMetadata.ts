import themeConfig from '@/configs/themeConfig'

interface Metadata {
  title: string
}

export const getMetadata = (pageTitle: string): Metadata => ({
  title: `${themeConfig.templateName} - ${pageTitle}`
})
