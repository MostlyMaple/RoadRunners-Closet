import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Navbar, Nav, Container, Row, NavDropdown, Link} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }


    return (
            <header>
                <Navbar className="" bg="light" variant="light" expand="lg" collapseOnSelect>
                    <Container>
                        <LinkContainer to='/'>
                            <Navbar.Brand>RoadRunner's Closet</Navbar.Brand>
                        </LinkContainer>

                        <LinkContainer to='/cart'>
                            <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                        </LinkContainer>


                        {userInfo ? (
                            <NavDropdown title={userInfo.username} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>

                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                            </NavDropdown>
                        ) : (
                            <LinkContainer to='/login'>
                                <Nav.Link ><i className="fas fa-user"></i>Login</Nav.Link>
                            </LinkContainer>
                        )}
                            
                    
                    </Container>
                </Navbar>
            </header>
    )
}

export default Header