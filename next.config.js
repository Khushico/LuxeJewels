/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    traceWorkers: false, // ✅ Added to fix call stack error during build traces
  },
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Performance optimizations
  poweredByHeader: false,
  generateEtags: false,
  compress: true,

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ]
  },

  // Webpack configuration for better bundle optimization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize bundle size
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    }

    // Add module resolution for better tree shaking
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    }

    return config
  },

  // Environment variables for build optimization
  env: {
    SITE_NAME: 'GIVA Fine Jewelry',
    SITE_DESCRIPTION: 'Discover our exquisite collection of fine jewelry, crafted with timeless elegance and modern sophistication.',
    SITE_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/jewelry',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/shop',
        destination: '/products',
        permanent: true,
      },
    ]
  },

  // Enable static exports for better performance
  trailingSlash: false,

  // Optimize for production
  swcMinify: true,

  // Enable React strict mode for better development experience
  reactStrictMode: true,
}

module.exports = nextConfig
