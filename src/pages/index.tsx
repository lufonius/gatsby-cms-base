import * as React from "react"
import type { PageProps } from "gatsby"

const IndexPage = ({ path }: PageProps) => {
  return (
    <main>
        <h1>Hello World</h1>
        <p>Path: {path}</p>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home</title>