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
import Button from "../components/button";
import LinkButton from "../components/link-button";

const CubeEventPageTemplate: React.FC <{pageContext: { cubeId: string }}>= ({ pageContext: { cubeId } }) => {

  const imgHeight = { height: "calc(100vh - 104px - 250px)" };
  const lineHeight = { lineHeight: 1.7 };

  const {selectedCube: cube, headerImages} = queryAndBuildPageData(cubeId); 

  const getRandomHeaderImage = () => {
    const randomIndex = Math.floor(Math.random() * headerImages.length);
    return headerImages[randomIndex];
  };

  return (
    <Navbar selectedNavItem="kalender" selectedSubItem="vegan-wie">
        <div className="max-w-screen-lg">
          <div className="flex flex-col">
            <div style={imgHeight}>
              <GatsbyImage style={imgHeight} image={getImage(getRandomHeaderImage())} placeholder="blurred" alt="Cube-Formation, vier Maskierte Menschen" />
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
            <div className="flex flex-row mt-4">
              <div className="flex flex-col">
                  <div className="rounded bg-white p-4 text-2xl md:text-3xl text-gray-900 text-center h-16 w-16 md:h-20 md:w-20 items-center justify-center">
                    <div style={lineHeight} ><b>{cube?.getDay()}</b></div>
                  </div>
                  <div className="text-xl md:text-2xl text-gray-50 md:w-20 text-center w-16 mt-2">
                    <b>{cube?.getMonthAbbreviation()}</b>
                  </div>
              </div>

              <div className="text-4xl md:text-5xl ml-7 flex flex-col justify-center">

                <div className="flex min-h-14 md:min-h-16 items-end">
                  <h2 className={cube?.isCancelled() ? "line-through" : ""}>
                    <b>Cube in {cube?.location.city.name}, {cube?.location.name}</b>
                  </h2>
                </div>

                <div className="md:text-2xl text-lg">
                  <div className="inline-block mt-2 mr-2">
                    <FeatherIcon className="text-gray-50 inline-block" icon="calendar" />
                    <span className="mx-2 inline-block">{cube?.getWeekday()}, {cube?.getDateInSwissFormat()}</span>
                  </div>

                  <div className="inline-block mt-2">
                    <FeatherIcon className="text-gray-50 inline-block" icon="clock" />
                    <span className="inline-block ml-2">{cube?.getStartTime()} - {cube?.getEndTime()}</span>
                  </div>
                </div>

                <div className="mt-4 flex">
                  <a href={cube?.location.googleMapsLink} target="_blank">
                    <picture>
                      <source media="(width < 48rem)" srcset="" />
                      <source media="(width >= 48rem)" srcset="" />
                      <img className="rounded min-w-20 w-20 md:min-w-28 md:w-28" alt="Picture of a map where the cube takes place" />
                    </picture>
                  </a>
                  <span className="ml-3 text-lg max-w-60">Treffpunkt ist neben der Haltestelle an der Promenade</span>
                </div>

                <div className="hidden md:block">
                  <div className="mt-8 text-lg">
                    <p>An unseren Events zeigen wir Videos aus der Tierindustrie und klären die Bevölkerung über die Ausbeutung nicht-menschlicher Tiere auf. Unser Ziel ist es, die Passanten mehr an das Thema “Veganismus” heranzuführen. In der Kommunikation sind wir direkt, aber respektvoll. Wir setzen auf dabei gewaltlose Kommunikation und kritisches Hinterfragen.</p>
                  </div>

                  <div className="mt-2 text-lg">
                    <Button className="mr-2 mt-2" type="full">
                      <div className="flex">
                        <span className="text-gray-950">Fotos herunterladen</span>
                        <FeatherIcon className="ml-2" icon="download" />
                      </div>
                    </Button>

                    <LinkButton className="mr-2 mt-2" href="" type="skinny">
                      <div className="flex">
                        <span>Cube Guide</span>
                        <FeatherIcon className="ml-2" icon="external-link" />
                      </div>
                    </LinkButton>

                    <LinkButton className="mr-2 mt-2" href="" type="skinny">
                      <div className="flex">
                        <span>Outreach Guide</span>
                        <FeatherIcon className="ml-2" icon="external-link" />
                      </div>
                    </LinkButton>

                    <LinkButton className="mt-2" href="" type="skinny">
                      <div className="flex">
                        <span>Cube-Videos download</span>
                        <FeatherIcon className="ml-2" icon="download" />
                      </div>
                    </LinkButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="block md:hidden">
              <div className="mt-8 text-lg">
                <p>An unseren Events zeigen wir Videos aus der Tierindustrie und klären die Bevölkerung über die Ausbeutung nicht-menschlicher Tiere auf. Unser Ziel ist es, die Passanten mehr an das Thema “Veganismus” heranzuführen. In der Kommunikation sind wir direkt, aber respektvoll. Wir setzen auf dabei gewaltlose Kommunikation und kritisches Hinterfragen.</p>
              </div>

              <div className="mt-2">
              <Button className="mr-2 mt-2" type="full">
                <div className="flex">
                  <span className="text-gray-950">Fotos herunterladen</span>
                  <FeatherIcon className="ml-2" icon="download" />
                </div>
              </Button>

              <LinkButton className="mr-2 mt-2" href="" type="skinny">
                <div className="flex">
                  <span>Cube Guide</span>
                  <FeatherIcon className="ml-2" icon="external-link" />
                </div>
              </LinkButton>

              <LinkButton className="mr-2 mt-2" href="" type="skinny">
                <div className="flex">
                  <span>Outreach Guide</span>
                  <FeatherIcon className="ml-2" icon="external-link" />
                </div>
              </LinkButton>

              <LinkButton className="mt-2" href="" type="skinny">
                <div className="flex">
                  <span>Cube-Videos download</span>
                  <FeatherIcon className="ml-2" icon="download" />
                </div>
              </LinkButton>
            </div>
            </div>

            <div className="flex flex-col w-full mt-16 cursor-pointer">
              <div className="flex">
                <h3 className="text-2xl"><b>Ablauf</b></h3>
                <div className="h-1 flex-grow"></div>
                <FeatherIcon className="text-gray-50" icon="chevron-down" />
              </div>
              <div className="border-t-2 border-solid border-gray-50"></div>
            </div>

            <div className="flex flex-col w-full mt-6 cursor-pointer">
              <div className="flex">
                <h3 className="text-2xl"><b>Vorbereitung und Regeln</b></h3>
                <div className="h-1 flex-grow"></div>
                <FeatherIcon className="text-gray-50" icon="chevron-down" />
              </div>
              <div className="border-t-2 border-solid border-gray-50"></div>
            </div>

            <div className="flex flex-col w-full mt-6 cursor-pointer">
              <div className="flex">
                <h3 className="text-2xl"><b>Dein erster Cube?</b></h3>
                <div className="h-1 flex-grow"></div>
                <FeatherIcon className="text-gray-50" icon="chevron-down" />
              </div>
              <div className="border-t-2 border-solid border-gray-50"></div>

              <div className="mt-3">
                <p>Es ist dein erster Cube? Das freut uns! Wir verstehen, dass du vielleicht nervös bist. Aber keine angst, unsere Events sind alle legal und die Passanten sind fast immer freundlich. Du darfst selber dein Tempo bestimmen. Du darfst auch einfach mal vorbei kommen und zuschauen, oder auch schon in die Formation stehen.</p>
                <br />
                <p>Bei neuen Aktivist:innen möchten wir allerdings, dass du bei erfahreren Aktivist:innen zuerst einmal bei Gesprächen zuhörst. Bei deinem zweiten Event darfst du dich gerne mal an ein Gespräch trauen. Wir helfen dir gerne weiter und geben dir Feedback.</p>

                <div className="flex w-full">
                  <div className="flex-grow h-1"></div>
                  <LinkButton className="mr-2" href="" type="skinny">FAQ</LinkButton>
                  <LinkButton href="" type="skinny">Kontakt</LinkButton>
                </div>
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
