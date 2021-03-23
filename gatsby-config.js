module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-theme-material-ui`,
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: "l7v3yp1n",
        dataset: "production",
        // a token with read permissions is required
        // if you have a private dataset
        token: "skNuIKQdPZGvCyVTENM3DLiHeN5txZJP8RBIlkukxoSJFzPfLwcUKhU5yXcBjSSbPyAWfzSkcsv9p9taOVwKMJFQ8WogJJVjxYjxUFC9mCFRhFoBjUAeBxYHfOAnawNVnAcdjq61IKUS6MPXuxNM7HmMJ2vKoYN5tv4dlroQ9Pq9tBwznw4v",

        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        // graphqlTag: 'default',
        overlayDrafts: true,
        watchMode: true
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
