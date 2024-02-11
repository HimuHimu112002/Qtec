import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'

const NavMenu = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-success py-4">
        <Container>
          <Navbar.Brand className='text-white' href="#">Qtec Todo Application</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="m-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link>
                <Link to="/"><h6 className='sideBar__layout--designContent py-4 rounded px-4'>Add Task</h6></Link>
                </Nav.Link>
                <Nav.Link>
                <Link to="/all"><h6 className='sideBar__layout--designContent py-4 rounded px-4'>All Task</h6></Link>
                </Nav.Link>
                <Nav.Link > <Link to="/com"><h6 className='sideBar__layout--designContent py-4 px-4'>completed</h6></Link></Nav.Link>
                <Nav.Link href="#pricing"><Link to="/incom"><h6 className='sideBar__layout--designContent py-4 px-4'>incomplete</h6></Link></Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
export default NavMenu