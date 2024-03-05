require('dotenv').config({ path: '../../.env' })

if (process.env.VERCEL_URL && !process.env.NEXT_PUBLIC_WEBAPP_URL) {
  // this means into a preview deployment
  process.env.NEXT_PUBLIC_WEBAPP_URL = 'https://' + process.env.VERCEL_URL
}


/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['vc-trpc'],
}

module.exports = nextConfig

