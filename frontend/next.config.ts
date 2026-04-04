import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {},
  },
  allowedDevOrigins: ['192.168.1.10'],
}

export default nextConfig