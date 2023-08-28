import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import { Link, Outlet } from 'react-router-dom';


let Layout = () => {
    return(
        <>
        <Container>
            <Navbar expand="lg" className="navbar">
                    <Navbar.Brand href="#"  className='navbar-brand'>My App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                        className="mx-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                        >
                            <Nav.Link>
                                <Link className="nav-link" to={"/"}>Home</Link>
                            </Nav.Link>
                            <Nav.Link >
                                <Link className="nav-link" to={"travel"}>Travel</Link>
                            </Nav.Link>
                        
                            <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            </Form>
        
                        </Nav>
                    </Navbar.Collapse>
                
            </Navbar>
            </Container>
            <Outlet />
        </>
    )
}

export default Layout;