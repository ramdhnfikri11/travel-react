import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link, Outlet } from 'react-router-dom';


let HomeLayout = () => {
    return(
        <>
            <Navbar expand="lg" className="navbar" bg="light">
                    <Navbar.Brand href="#"  className='navbar-brand'>My App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                        className="my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                        >
                            <Nav.Link>
                                <Link className="nav-link" to={"/"}>Home</Link>
                            </Nav.Link>
                            <Nav.Link >
                                <Link className="nav-link" to={"contact"}>Contact</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <NavDropdown title="About" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">
                                        Something else here
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Nav.Link >
                        <Link className="nav-link" to={"login"}>Login</Link>
                    </Nav.Link>
            </Navbar>
            <Outlet />
        </>
    )
}

export default HomeLayout;