import React, { Fragment } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { useRecoilValue } from 'recoil'
import { userState } from '../states/user'

const NavBar = () => {
  const user = useRecoilValue(userState)
  return (
    <Navbar bg="warning" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {!user && (
              <Fragment>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
