import * as React from "react"
import { graphql, useStaticQuery, type PageProps } from "gatsby"
import Navbar from "../components/navbar";
import { Cube } from "../model/cube";
import FeatherIcon from "feather-icons-react";
import { CubeDto } from "../model/cube.dto";
import { CityDto } from "../model/city.dto";
import { LocationDto } from "../model/location.dto";
import { ModelMapper } from "../model/model.mapper";

const CubeEventPageTemplate: React.FC <{pageContext: { cubeId: string }}>= ({ pageContext: { cubeId } }) => {

  const imgHeight = { height: "calc(100vh - 104px - 250px)" };
  const lineHeight = { lineHeight: 1.6 };

  const cube = getCube(cubeId);
  console.log(cube);

  return (
    <Navbar selectedNavItem="kalender" selectedSubItem="vegan-wie">
        <div style={imgHeight} className="bg-[url(/cube-photo-1.jpg)] bg-cover bg-center w-screen flex flex-col">
          <div className="w-screen flex-grow"></div>
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

const getCube = (id: string): Cube | undefined => {
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
      }
  `);

  const allCubes = data.allCubes.nodes[0].cubesList as CubeDto[];
  const allCities = data.allCities.nodes[0].citiesList as CityDto[];
  const allLocations = data.allLocations.nodes[0].locationsList as LocationDto[];

  const mapper = new ModelMapper();
  const cubes = mapper.mapFromData(allCubes, allCities, allLocations);

  return cubes.find((cube: Cube) => cube.id === id);
};

export default CubeEventPageTemplate;
