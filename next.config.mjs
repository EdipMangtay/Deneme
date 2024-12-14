/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/tr/homepage',
        permanent: true,
        locale: false
      },
      {
        source: '/:lang(tr|en)',
        destination: '/:lang/homepage',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
