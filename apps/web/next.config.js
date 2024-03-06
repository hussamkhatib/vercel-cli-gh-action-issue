require('dotenv').config({ path: '../../.env' })

console.log("inside next config");

if (process.env.VERCEL_URL && !process.env.NEXT_PUBLIC_WEBAPP_URL) {
  console.log("inside next config IF", process.env.VERCEL_URL);
  // this means into a preview deployment
  process.env.NEXT_PUBLIC_WEBAPP_URL = 'https://' + process.env.VERCEL_URL
}


/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

