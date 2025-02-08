import { useEffect, useState } from "react";
import * as React from "react";
import { PageProps, useStaticQuery, graphql } from "gatsby"
import Select from '../components/select';
import { Field, Label, Switch } from '@headlessui/react';
import { motion, AnimatePresence } from "framer-motion";
import CubeEvent from '../components/event';
import { CubeDto } from "../model/cube.dto";
import { CityDto } from "../model/city.dto";
import { LocationDto } from "../model/location.dto";
import { ModelMapper } from "../model/model.mapper";
import { Cube } from "../model/cube";
import Navbar from "../components/navbar";
import LinkButton from "../components/link-button";

const EventsPage = ({ path }: PageProps) => {
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
    let allCitiesMapped = allCities.map((city: any) => ({ label: city.name, value: city.id }));
    allCitiesMapped = [{ label: "Alle", value: "all" }, ...allCitiesMapped];

    const allLocations = data.allLocations.nodes[0].locationsList as LocationDto[];

    const mapper = new ModelMapper();
    const cubes = mapper.mapFromData(allCubes, allCities, allLocations);

    const [selectedCityFilter, setSelectedCityFilter] = useState('all');
    const [showOnlyApprovedCubes, setShowOnlyApprovedCubes] = useState(true);
    const [hidePastEvents, setHidePastEvents] = useState(true);
  
    // Separate state for filtered items
    const [filteredItems, setFilteredItems] = useState(cubes);
  
    // on any filter change, run this function
    const handleFilterChange = (selectedCityId: string, showOnlyApprovedCubes: boolean, hidePastEvents: boolean) => {
      setSelectedCityFilter(selectedCityId);
      setShowOnlyApprovedCubes(showOnlyApprovedCubes);
      setHidePastEvents(hidePastEvents);
  
      let filteredItems = cubes;
      // Filter the list based on the selected option
      if (selectedCityId !== 'all') {
        filteredItems = filterByCity(filteredItems, selectedCityId)
      }

      if (showOnlyApprovedCubes) {
        filteredItems = filterByIsApproved(filteredItems);
      }

      if (hidePastEvents) {
        filteredItems = filterByIsNotPastEvent(filteredItems);
      }

      setFilteredItems(filteredItems);
    };

    const filterByCity = (cubes: Cube[], cityId: string): Cube[] => {
        return cubes.filter((item: Cube) => item.location.city.id === cityId);
    }

    const filterByIsApproved = (cubes: Cube[]): Cube[] => {
        return cubes.filter((item: Cube) => item.isConfirmed());
    }

    const filterByIsNotPastEvent = (cubes: Cube[]): Cube[] => {
        return cubes.filter((item: Cube) => item.isFutureEvent());
    }

    useEffect(() => {
         // initial filtering of the cubes
        handleFilterChange(selectedCityFilter, showOnlyApprovedCubes, hidePastEvents);
      }, []);

  return (
    <Navbar selectedNavItem="events">
        <div className="p-5">
            <h1 className="font-heading text-6xl mt-6">Eventkalender</h1>
            <p className="text-lg">
                Hier findest du alle unsere Events.
                Wenn du Fotos von den Events herunterladen möchtest, kannst du mit dem Filter die vergangenen Cubes anzeigen.
            </p>

            <div className="flex w-full mt-4">
                <div className="h-1 flex-grow"></div>
                <LinkButton type="skinny" href="https://calendar.google.com/calendar/embed?src=ac777afc379bf8bb3957cda6dbcd8240e31e90023c3593823e23b2018c059d7c%40group.calendar.google.com&ctz=Europe%2FParis">
                    Im Google Kalender anzeigen
                </LinkButton>

            </div>

            <span className="block text-2xl text-gray-50 mt-12"><b>Filter</b></span>
            <div className="p-3 rounded bg-gray-800 max-w-lg mb-4">
                <Select 
                    items={allCitiesMapped}
                    name="city"
                    label="Stadt"
                    onChange={(event: any) => handleFilterChange(event.target.value, showOnlyApprovedCubes, hidePastEvents)}
                    className="min-w-32"
                /> 

                <Field className="mt-5">
                    <Label className="block">Nur bestätigte Events anzeigen</Label>
                    <Switch
                        checked={showOnlyApprovedCubes}
                        onChange={(checked: boolean) => handleFilterChange(selectedCityFilter, checked, hidePastEvents)}
                        className="group inline-flex h-8 w-12 mt-1 items-center rounded-full bg-gray-200 transition data-[checked]:bg-green-600"
                    >
                        <span className="size-5 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                    </Switch>
                </Field>

                <Field className="mt-5">
                    <Label className="block">Vergangene Events ausblenden</Label>
                    <Switch
                        checked={hidePastEvents}
                        onChange={(checked: boolean) => handleFilterChange(selectedCityFilter, showOnlyApprovedCubes, checked)}
                        className="group inline-flex h-8 w-12 items-center rounded-full bg-gray-200 transition data-[checked]:bg-green-600"
                    >
                        <span className="size-5 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                    </Switch>
                </Field>
            </div>

            <AnimatePresence>
                {filteredItems.map((cube: Cube) => (
                    <li><CubeEvent cube={cube} /></li>
                ))}
                {filteredItems.length === 0 && <>
                    <span className="block text-2xl text-gray-50 mt-12"><b>Keine Events gefunden.</b></span>
                </>}
            </AnimatePresence>
        </div>
    </Navbar>
)
}

export default EventsPage;

export const Head = () => <title>Home</title>;