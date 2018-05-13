module.exports = {
  siteMetadata: {
    title: `Force Mindmap`,
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
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-109296138-2",
      },
    },
  ]
  
}
