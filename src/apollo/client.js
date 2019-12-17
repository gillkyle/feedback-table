import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"

export const client = new ApolloClient({
  uri: "http://api.gatsbyjs.org/public", // change back to api.gatsbyjs.org for PROD
  fetch,
})
