/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['*.preview.emergentagent.com', '*.preview.emergentcf.cloud'],
}

export default nextConfig
