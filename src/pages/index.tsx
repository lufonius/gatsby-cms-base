import { useState } from "react";
import * as React from "react";
import { PageProps, useStaticQuery, graphql } from "gatsby"

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

  return (
    <main>
        <select value={selectedFilter} onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="zuerich">Zürich</option>
        <option value="aarau">Aarau</option>
      </select>

      <br />

        {filteredItems.map((cube: any) => (
            <div>
                <p>{cube.city}</p>
                <p>{cube.start}</p>
                <p>{cube.end}</p>
                <input type="text"></input>
            </div>
        ))}
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home</title>