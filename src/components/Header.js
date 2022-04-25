import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

function Header({history}) {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }


    return (
        <header >
        <Navbar bg="light" variant="light" expand="lg" collapseOnSelect >
            <Container style={{
                backgroundColor: '#F15A22', height: '70px', borderRadius: '10px', width: '100%'
                }}
            >
                <LinkContainer to='/' style={{marginRight: '6rem'}}>
                    <Navbar.Brand>RoadRunner Closet</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <SearchBox />
                    <Nav className="ms-auto">

                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenue'>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/admin/discountlist'>
                                    <NavDropdown.Item>Discounts</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>

                            </NavDropdown>
                        )}

                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>

                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                            </NavDropdown>
                        ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                                </LinkContainer>
                            )}


                        

                        <LinkContainer to='/cart'>
                            <Nav.Link ><i className="fas fa-shopping-cart justify-content-end"></i>Cart</Nav.Link>
                        </LinkContainer>


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
    )
}

export default Header