require('dotenv').config({ path: '../../.env' })

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['vc-trpc'],
}

if (process.env.VERCEL_URL && !process.env.NEXT_PUBLIC_ADMINAPP_URL) {
  // this means into a preview deployment
  process.env.NEXT_PUBLIC_ADMINAPP_URL = 'https://' + process.env.VERCEL_URL
}



module.exports = nextConfig
