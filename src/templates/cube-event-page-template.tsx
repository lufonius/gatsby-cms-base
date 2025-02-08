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
import DownloadPhotosDialog from "../components/download-photos-dialog";
import { useState } from "react";
import MarkdownRenderer from "../components/markdown-renderer/markdown-renderer";


const CubeEventPageTemplate: React.FC <{pageContext: { cubeId: string }}>= ({ pageContext: { cubeId } }) => {

  const imgHeight = { height: "calc(100vh - 104px - 250px)" };
  const lineHeight = { lineHeight: 1.7 };

  const {selectedCube: cube, headerImages, eventPageData} = queryAndBuildPageData(cubeId); 

  const getRandomHeaderImage = () => {
    const randomIndex = Math.floor(Math.random() * headerImages.length);
    return headerImages[randomIndex];
  };

  return (
    <Navbar selectedNavItem="events">
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
                      <img className="rounded min-w-20 w-20 md:min-w-28 md:w-28 text-lg text-gray-50" alt="Picture of a geographical map showing the location of the event" />
                    </picture>
                  </a>
                  <span className="ml-3 text-lg max-w-60">{cube?.location.meetingPointSummary}</span>
                </div>

                <div className="hidden md:block">
                  <div className="mt-8 text-lg">
                    <p>{eventPageData.summary}</p>
                  </div>

                  <div className="mt-2 text-lg">
                  {cube && <EventActions eventPage={eventPageData} cube={cube} />}
                  </div>
                </div>
              </div>
            </div>

            <div className="block md:hidden">
              <div className="mt-8 text-lg">
                <p>{eventPageData.summary}</p>
              </div>

              <div className="mt-2">
                {cube && <EventActions eventPage={eventPageData} cube={cube} />}
              </div>
            </div>

            {eventPageData.sectionList?.map((section) => {
              return (<>{section && <InfoSection section={section}/>}</>);
            })}
          </div>
        </div>
        
    </Navbar>
  )
}

const EventActions: React.FC <{ cube: Cube, eventPage: Queries.eventpage }>= ({ cube, eventPage }) => {
  const [isDownloadPhotoDialogOpen, setIsDownloadPhotoDialogOpen] = useState(false);

  return (<>
    <Button className="mr-2 mt-2" type="full" onClick={() => { setIsDownloadPhotoDialogOpen(true) }}>
      <div className="flex">
        <span className="text-gray-950">Fotos herunterladen</span>
        <FeatherIcon className="ml-2" icon="download" />
      </div>
    </Button>

    {eventPage.videoDownloadLink && <LinkButton className="mt-2" href={eventPage.videoDownloadLink} type="skinny">
      <div className="flex">
        <span>{eventPage.videoDownloadLinkText}</span>
        <FeatherIcon className="ml-2" icon="download" />
      </div>
    </LinkButton>}

    {eventPage.linkList?.map(link => {
      return(<>
        {link && link.link && <LinkButton className="mr-2 mt-2" href={link.link} type="skinny">
          <div className="flex">
            <span>{link?.linkText}</span>
            <FeatherIcon className="ml-2" icon="external-link" />
          </div>
        </LinkButton>}
      </>);
    })}

    <LinkButton className="mr-2 mt-2" href="" type="skinny">
      <div className="flex">
        <span>Outreach Guide</span>
        <FeatherIcon className="ml-2" icon="external-link" />
      </div>
    </LinkButton>

    {cube?.hasActiveSwissTransferlink() && (
            <DownloadPhotosDialog
                isOpen={isDownloadPhotoDialogOpen}
                onClosed={() => setIsDownloadPhotoDialogOpen(false)}
                cube={cube}
            />
        )}
  </>);
};

const InfoSection: React.FC<{ section: Queries.eventpageSectionList }> = ({ section }) => {
  const [collapsed, setCollapsed] = useState(true);

  return(
    <div className="flex flex-col w-full mt-6 cursor-pointer">
      <div className="flex" onClick={() => setCollapsed(!collapsed)}>
        <h3 className="text-2xl"><b>{section.sectionTitle}</b></h3>
        <div className="h-1 flex-grow"></div>
        <div style={{display: collapsed ? "none" : "block"}}><FeatherIcon className="text-gray-50" icon="chevron-down" /></div>
        <div style={{display: collapsed ? "block" : "none"}}><FeatherIcon className="text-gray-50" icon="chevron-up" /></div>
      </div>
      <div className="border-t-2 border-solid border-gray-50"></div>

      <div style={{display: collapsed ? "none" : "block"}} className="mt-3 text-gray-50">
        <MarkdownRenderer>{section.sectionText}</MarkdownRenderer>

        {section.sectionLinkList?.length && section.sectionLinkList.length > 0 && <div className="flex w-full">
          <div className="flex-grow h-1"></div>
          {section.sectionLinkList.map(link => {
            return (<>
              {link?.sectionLink && <LinkButton className="mr-2" href={link?.sectionLink} type="skinny">{link.sectionLinkText}</LinkButton>}
            </>);
          })}
        </div>}
      </div>
    </div>
  );
};

const queryAndBuildPageData = (selectedCubeId: string): { selectedCube?: Cube, headerImages: FileNode[], eventPageData: Queries.eventpage } => {
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
                    meetingPointSummary
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
        allEventpage {
          nodes {
            summary
            videoDownloadLink
            videoDownloadLinkText
            sectionList {
              sectionText
              sectionTitle
              sectionLinkList {
                sectionLink
                sectionLinkText
              }
            }
          }
        }
    }
`);

  const allCubes = data.allCubes.nodes[0].cubesList as CubeDto[];
  const allCities = data.allCities.nodes[0].citiesList as CityDto[];
  const allLocations = data.allLocations.nodes[0].locationsList as LocationDto[];
  const eventPageData = data.allEventpage.nodes[0] as Queries.eventpage;

  const mapper = new ModelMapper();
  const cubes = mapper.mapFromData(allCubes, allCities, allLocations);

  const selectedCube = cubes.find((cube: Cube) => cube.id === selectedCubeId);

  return {
    selectedCube,
    headerImages: data.allFile.nodes,
    eventPageData
  };
};

export default CubeEventPageTemplate;
