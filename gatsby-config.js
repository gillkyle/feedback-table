module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        url: "http://localhost:3000/public", // change back to api.gatsbyjs.org for PROD
        typeName: "GatsbyFeedback",
        fieldName: "gatsby",
      },
    },
    `gatsby-plugin-chakra-ui`,
  ],
}
