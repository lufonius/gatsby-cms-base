import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `gatsby-cms-base`,
    siteUrl: `https://www.yourdomain.tld`
  },
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-decap-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`, // Path to your CMS customization file
      },
    },
    {
      resolve: `gatsby-transformer-json`,
      options: {
        // for each file a graphQl node is created
        typeName: ({ node }) => node.name
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Bebas Neue`, // Add fonts you want to use
          `Epilogue\:400,700`, // Example of adding multiple fonts
        ],
        display: 'swap', // This is optional but helps with font rendering
      },
    }
  ]
};

export default config;