import { useState } from "react";
import * as React from "react";
import { PageProps, useStaticQuery, graphql } from "gatsby"
import CustomSelect from '../components/custom-select';
import { Dialog, DialogPanel, DialogTitle, Description, DialogBackdrop } from '@headlessui/react'

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
                        swissTransferLinkEnd(fromNow: true, locale: "de")
                    }
                }
            }
        }
    `);

    const allCubes = data.allEventsJson.nodes[0].cubesList;

    const [selectedFilter, setSelectedFilter] = useState('All');
  
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
      <CustomSelect 
        items={[{label: "Zürich", value: "zuerich"}, {label: "Aarau", value: "aar"}]}
        name="city"
        label="Stadt"
        onChange={handleFilterChange}
    /> 

      <br />

        {filteredItems.map((cube: any) => (
            <div>
                <p>{cube.city}</p>
                <p>{cube.start}</p>
                <p>{cube.end}</p>
                <input type="text"></input>
            </div>
        ))}

<button onClick={() => setIsOpen(true)} className="bg-gray-50 rounded p-2">Open dialog</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
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