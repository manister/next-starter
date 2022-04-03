module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'frontmatter-markdown-loader',
    })
    return config
  },

  images: {
    domains: ['dl.airtable.com'],
  },
}
