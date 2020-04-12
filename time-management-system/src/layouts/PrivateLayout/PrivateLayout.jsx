import React, { useContext } from 'react';
import './PrivateLayout.css';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../logo.png';
import { StateContext, hasManagerRole } from '../../contexts';

const PrivateLayout = props => {
    const stateContext = useContext(StateContext);
    const currentUser = stateContext.currentUser;
    const showUsers = hasManagerRole(currentUser.roles);
    const editUserHref = `/user/${currentUser.username}`;

    const handleLogout = () => {
        localStorage.removeItem('current-user');
        stateContext.setCurrentUser(null);
    };

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
                        <NavDropdown title={currentUser.username}>
                            <LinkContainer to={editUserHref}>
                                <NavDropdown.Item eventKey={3}>Edit user account</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="" onClick={handleLogout} >Log out</NavDropdown.Item>
                        </NavDropdown>
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