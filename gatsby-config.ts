import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `gatsby-cms-base`,
    siteUrl: `https://www.yourdomain.tld`
  },
  graphqlTypegen: true,
};

export default config;