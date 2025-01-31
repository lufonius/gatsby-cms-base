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

  const eventPageTemplate = path.resolve(`src/templates/cube-event-page-template.tsx`);
  queryResults.data.allCubes.nodes[0].cubesList.forEach((cube: any) => {
    createPage({
      path: `/events/${cube.id}`,
      component: eventPageTemplate,
      context: {
        cubeId: cube.id,
      },
    });
  });
}