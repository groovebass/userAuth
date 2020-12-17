import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';



function NavBar() {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">User Auth</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                
                </Nav>
                
            </Navbar.Collapse>
</Navbar>
        </div>
    )
}

export default NavBar
