module.exports = {
  siteMetadata: {
    title: `Gatsby Typescript Starter`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    // Add typescript stack into webpack
    `gatsby-plugin-typescript`,
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `limelight`,
          'monstserrat',
          `source sans pro\:300,400,400i,700` // you can also specify font weights and styles
        ]
      }
    }
  ],
}
