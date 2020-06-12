const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
// const path = require('path')

const nextConfig = {
  experimental: {
    jsconfigPaths: true, // enables it for both jsconfig.json and tsconfig.json
  },
}

module.exports = withPlugins([
  [optimizedImages, {
    /* config for next-optimized-images */
    optimizeImagesInDev: true,
  }],
  nextConfig,

  // your other plugins here

])
