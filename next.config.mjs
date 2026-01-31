/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/tghtfl.github.io', // Required for GitHub Pages subdirectory deployment
  output: 'export', // Required for static site generation (GitHub Pages)
  trailingSlash: true, // Recommended for GitHub Pages
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
