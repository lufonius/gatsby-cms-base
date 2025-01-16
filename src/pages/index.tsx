import { useState } from "react";
import * as React from "react";
import { PageProps, useStaticQuery, graphql } from "gatsby"
import Select from '../components/select';
import { Dialog, DialogPanel, DialogTitle, Description, DialogBackdrop, Field, Label, Switch } from '@headlessui/react';
import { motion, AnimatePresence } from "framer-motion";
import CubeEvent from '../components/event';

const IndexPage = ({ path }: PageProps) => {
    const data = useStaticQuery(graphql`
        query {
            allEventsJson {
                totalCount
                nodes {
                    cubesList {
                        city
                        end
                        location
                        start
                        status
                        swisstransferLink
                        swissTransferLinkEnd
                    }
                }
            }
        }
    `);

    const allCubes = data.allEventsJson.nodes[0].cubesList;

    const [selectedFilter, setSelectedFilter] = useState('All');
    const [enabled, setEnabled] = useState(false);
  
    // State for filtered items
    const [filteredItems, setFilteredItems] = useState(allCubes);
  
    // Handle filter change
    const handleFilterChange = (event: any) => {
      const filter = event.target.value;
      setSelectedFilter(filter);
  
      // Filter the list based on the selected option
      if (filter === 'All') {
        setFilteredItems(allCubes);
      } else {
        setFilteredItems(allCubes.filter((item: any) => item.city.includes(filter)));
      }
    };

    let [isOpen, setIsOpen] = useState(false);

  return (
    <main>
        <h1 className="font-heading text-6xl">AARS Kalender</h1>
      <Select 
        items={[{label: "Zürich", value: "zuerich"}, {label: "Aarau", value: "aar"}]}
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

      <br />

    <AnimatePresence>
        {filteredItems.map((cube: any) => (
            <motion.li
            key={cube.city + cube.start}
            initial={{ opacity: 0, height: 0}}
            animate={{ opacity: 1, height: "auto"}}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            layout
            
          >

            <CubeEvent
                city="Zürich"
                swissTransferLink={cube.swisstransferLink}
                swissTransferLinkValidUntil={cube.swissTransferLinkEnd}
            ></CubeEvent>

          </motion.li>
        ))}
    </AnimatePresence>

    <button onClick={() => setIsOpen(true)} className="bg-gray-50 rounded p-2 mt-10">Open dialog</button>
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}
        transition
        className="relative z-50 transition duration-300 ease-out">
    <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm backdrop-brightness-50" />

    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 bg-gray-800 p-12 rounded">
        <DialogTitle className="font-bold">Deactivate account</DialogTitle>
        <Description>This will permanently deactivate your account</Description>
        <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
        <div className="flex gap-4">
            <button onClick={() => setIsOpen(false)} className="bg-gray-50 rounded p-2">Cancel</button>
            <button onClick={() => setIsOpen(false)} className="bg-red-800 text-gray-50 rounded p-2">Deactivate</button>
        </div>
        </DialogPanel>
    </div>
    </Dialog>

    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home</title>