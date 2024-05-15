/** @type {import('next').NextConfig} */
const nextConfig = {
    //FOR DEV !!!
    cacheMaxMemorySize:0,
    experimental: {
        serverComponentsExternalPackages: ['sequelize'],
      },
}

export default nextConfig
