import React, { Fragment } from 'react'
import NavBar from './NavBar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Fragment>
      <NavBar />
      {children}
    </Fragment>
  )
}

export default Layout
