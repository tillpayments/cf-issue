/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    REACT_APP_GATEWAY_URL: process.env.REACT_APP_GATEWAY_URL,
  }
}

module.exports = nextConfig
