import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Navbar from "../components/navbar";
import { Cube } from "../model/cube";
import FeatherIcon from "feather-icons-react";
import { CubeDto } from "../model/cube.dto";
import { CityDto } from "../model/city.dto";
import { LocationDto } from "../model/location.dto";
import { ModelMapper } from "../model/model.mapper";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { FileNode } from "gatsby-plugin-image/dist/src/components/hooks";

const CubeEventPageTemplate: React.FC <{pageContext: { cubeId: string }}>= ({ pageContext: { cubeId } }) => {

  const imgHeight = { height: "calc(100vh - 104px - 250px)" };
  const lineHeight = { lineHeight: 1.6 };

  const {selectedCube: cube, headerImages} = queryAndBuildPageData(cubeId); 

  return (
    <Navbar selectedNavItem="kalender" selectedSubItem="vegan-wie">
      {/* defer the script load fonts of google with Gatsby Script API */}
        <div className="w-screen flex flex-col">
          <div style={imgHeight} className="w-screen">
            <GatsbyImage style={imgHeight} image={getImage(headerImages[0])} alt="Cube-Formation, vier Maskierte Menschen" />
          </div>
          {cube?.isCancelled() && <div className="flex flex-row px-5 py-3 items-center bg-red-700 w-screen">
            <div>
              <FeatherIcon className="text-gray-50 inline" icon="alert-triangle" />
            </div>
            <div className="ml-4">
              <p><b>Achtung: </b>Der Cube wurde abgesagt!</p>
            </div>
          </div>}
        </div>
        <div className="p-5">
          <div className="flex flex-row">
            <div className="flex flex-col">
                <div style={lineHeight} className="rounded bg-white p-4 text-2xl text-gray-900 text-center h-16 w-16 items-center justify-center">
                  <b>{cube?.getDay()}</b>
                </div>
                <div className="text-xl text-gray-50 text-center w-full mt-2">
                  <b>{cube?.getMonthAbbreviation()}</b>
                </div>
            </div>
            <div className="ml-4">
                <div className="text-3xl">
                  <h2 className={cube?.isCancelled() ? "line-through" : ""}>
                    <b>Cube in {cube?.location.city.name}, {cube?.location.name}</b>
                  </h2>
                </div>
            </div>
          </div>
        </div>
    </Navbar>
  )
}

const queryAndBuildPageData = (selectedCubeId: string): { selectedCube?: Cube, headerImages: FileNode[] } => {
  const data = useStaticQuery(graphql`
    query {
        allCities {
            nodes {
                citiesList {
                    id
                    name
                }
          }
        }
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
        allLocations {
            nodes {
                locationsList {
                    cityId
                    googleMapsLink
                    id
                    name
                }
            }
        }
        allFile(filter: {relativeDirectory: {eq: "photos/static/event-page-heading"}}) {
          nodes {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
    }
`);

  const allCubes = data.allCubes.nodes[0].cubesList as CubeDto[];
  const allCities = data.allCities.nodes[0].citiesList as CityDto[];
  const allLocations = data.allLocations.nodes[0].locationsList as LocationDto[];

  const mapper = new ModelMapper();
  const cubes = mapper.mapFromData(allCubes, allCities, allLocations);

  const selectedCube = cubes.find((cube: Cube) => cube.id === selectedCubeId);

  return {
    selectedCube,
    headerImages: data.allFile.nodes
  };
};

export default CubeEventPageTemplate;
