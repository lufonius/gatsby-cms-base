import * as React from "react"
import type { PageProps } from "gatsby"

const AboutPage = ({ path }: PageProps) => {
  return (
    <main>
        <h1>About you</h1>
        <p>Path: {path}</p>
    </main>
  )
}

export default AboutPage

export const Head = () => <title>About</title>