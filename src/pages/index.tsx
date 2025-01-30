import { useState } from "react";
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

const IndexPage = ({ path }: PageProps) => {
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
    const allCitiesMapped = allCities.map((city: any) => ({ label: city.name, value: city.id }));
    const allLocations = data.allLocations.nodes[0].locationsList as LocationDto[];

    const mapper = new ModelMapper();
    const cubes = mapper.mapFromData(allCubes, allCities, allLocations);

    const [selectedFilter, setSelectedFilter] = useState('All');
    const [enabled, setEnabled] = useState(false);
  
    // State for filtered items
    const [filteredItems, setFilteredItems] = useState(cubes);
  
    // Handle filter change
    const handleFilterChange = (event: any) => {
      const filter = event.target.value;
      setSelectedFilter(filter);
  
      // Filter the list based on the selected option
      if (filter === 'All') {
        setFilteredItems(cubes);
      } else {
        setFilteredItems(cubes.filter((item: Cube) => item.location.city.id === filter));
      }
    };

    let [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar selectedNavItem="kalender">
        <h1 className="font-heading text-6xl mt-6">Eventkalender</h1>
        <div className="hidden">
        <Select 
            items={allCitiesMapped}
            name="city"
            label="Stadt"
            onChange={handleFilterChange}
        /> 

        <Field className="mt-5">
        <Label className="block">Nur bestätigte Cubes anzeigen</Label>
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-green-600"
        >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
        </Switch>
        </Field>
        </div>

        <AnimatePresence>
            {filteredItems.map((cube: Cube) => (
                <li><CubeEvent cube={cube} /></li>
            ))}
        </AnimatePresence>
    </Navbar>
  )
}

export default IndexPage

export const Head = () => <title>Home</title>