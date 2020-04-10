import React from 'react';
import './PrivateLayout.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../logo.png';

const PrivateLayout = props => {
    const showUsers = true;

    return (
        <div className="Private-layout">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>
                    <LinkContainer to="/">
                        <img className="Nav-logo" src={logo} alt="" />
                    </LinkContainer>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/tasks">
                            <NavItem eventKey={1} className="Nav-link">Tasks</NavItem>
                        </LinkContainer>
                        {showUsers &&
                        <LinkContainer to="/users">
                            <NavItem eventKey={1} className="Nav-link">Users</NavItem>
                        </LinkContainer>
                        }
                        <LinkContainer to="/about">
                            <NavItem eventKey={2} className="Nav-link">About</NavItem>
                        </LinkContainer>  
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div>
                {props.children}
            </div>
        </div>
    );
};

export default PrivateLayout;