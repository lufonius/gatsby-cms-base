import * as React from "react"
import type { PageProps } from "gatsby"
import Navbar from "../components/navbar";

const EventPageTemplate: React.FC <{pageContext: any}>= ({ pageContext }) => {
  return (
    <Navbar selectedNavItem="kalender" selectedSubItem="vegan-wie">
        <h1 className="font-heading text-6xl mt-6">Cube: ID {pageContext.cube.id}</h1>
    </Navbar>
  )
}

export default EventPageTemplate;
