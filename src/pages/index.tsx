import * as React from "react"
import type { PageProps } from "gatsby"
import Navbar from "../components/navbar"

const IndexPage = ({ path }: PageProps) => {
  return (
    <Navbar selectedNavItem="home">
        <div className="p-5">
        <h1 className="font-heading text-6xl mt-6">Home</h1>
        </div>
    </Navbar>
  )
}

export default IndexPage;

export const Head = () => <title>About</title>