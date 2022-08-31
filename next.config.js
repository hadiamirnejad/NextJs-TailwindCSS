/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'csrfToken',
            value: process.env.CSRF_TOKEN,
          },
          {
            key: 'x-another-custom-header',
            value: 'my other custom header value',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig