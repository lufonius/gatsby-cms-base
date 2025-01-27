import path from "path";

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const queryResults = await graphql(`
    query {
        allCubes {
            nodes {
                cubesList {
                    id
                    end
                    locationId
                    start
                    status
                    swissTransferLinkEnd
                    swissTransferLink
                }
            }
        }
    }
  `);

  const eventPageTemplate = path.resolve(`src/templates/event-page-template.tsx`);
  queryResults.data.allCubes.nodes[0].cubesList.forEach((node: any) => {
    createPage({
      path: `/events/${node.id}`,
      component: eventPageTemplate,
      context: {
        cube: node,
      },
    });
  });
}