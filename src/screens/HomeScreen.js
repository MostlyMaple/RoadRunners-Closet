import React from 'react'
import {useEffect, useState} from 'react';
import { Row, Col, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Item  from '../components/Item';
import Loader  from '../components/Loader';
import Message  from '../components/Message';
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'


function HomeScreen({ history }) {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    let keyword = history.location.search

    const [sortingMethod, setSortingMethod] = useState('')



    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword, sortingMethod])


    return (
        <div>
            <h1 style={{justifyContent: 'center'}}>Latest Products</h1>
            <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
                <Container>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">


                            <LinkContainer to='/?keyword=shirt' style={{marginRight: '6rem'}}>
                                <Navbar.Brand>Shirts</Navbar.Brand>
                            </LinkContainer>

                            <LinkContainer to='/?keyword=pants' style={{marginRight: '6rem'}}>
                                <Navbar.Brand>Pants</Navbar.Brand>
                            </LinkContainer>

                            <LinkContainer to='/?keyword=socks' style={{marginRight: '6rem'}}>
                                <Navbar.Brand>Socks</Navbar.Brand>
                            </LinkContainer>

                            <LinkContainer to='/?keyword=shoe' style={{marginRight: '6rem'}}>
                                <Navbar.Brand>Shoes</Navbar.Brand>
                            </LinkContainer>

                            <LinkContainer to='/?keyword=accessory' style={{marginRight: '6rem'}}>
                                <Navbar.Brand>Accessories</Navbar.Brand>
                            </LinkContainer>

                            <LinkContainer to='/?keyword=women' style={{marginRight: '6rem'}}>
                                <Navbar.Brand>Women</Navbar.Brand>
                            </LinkContainer>

                            <LinkContainer to='/?keyword=men' style={{marginRight: '6rem'}}>
                                <Navbar.Brand>Men</Navbar.Brand>
                            </LinkContainer>

                            <NavDropdown title='Sort By' id='username'>
                                <NavDropdown.Item id='1' onClick={(e) => setSortingMethod('1')}>Price Low to High</NavDropdown.Item>
                                <NavDropdown.Item id='2' onClick={(e) => setSortingMethod('2')}>Price High to Low</NavDropdown.Item>
                                <NavDropdown.Item id='3' onClick={(e) => setSortingMethod('3')}>Quantity Low to High</NavDropdown.Item>
                                <NavDropdown.Item id='4' onClick={(e) => setSortingMethod('4')}>Quantity High to Low</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            { loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message> 
            : sortingMethod === '1'  ? (
                <Row>
                {Array.from(products).sort((a, b) => (a.price - b.price)).map(item => (
                    <Col key={item.id} sm={12} md={6} lg={4} xl={3}>
                        <Item item={item} />
                    </Col>
                ))}
                </Row>
            ) : sortingMethod === '2' ? (
                <Row>
                {Array.from(products).sort((a, b) => (b.price - a.price)).map(item => (
                    <Col key={item.id} sm={12} md={6} lg={4} xl={3}>
                        <Item item={item} />
                    </Col>
                ))}
                </Row>
            ) : sortingMethod === '3' ? (
                <Row>
                {Array.from(products).sort((a, b) => (a.quantity - b.quantity)).map(item => (
                    <Col key={item.id} sm={12} md={6} lg={4} xl={3}>
                        <Item item={item} />
                    </Col>
                ))}
                </Row>
            ) : sortingMethod === '4' ? (
                <Row>
                {Array.from(products).sort((a, b) => (b.quantity - a.quantity)).map(item => (
                    <Col key={item.id} sm={12} md={6} lg={4} xl={3}>
                        <Item item={item} />
                    </Col>
                ))}
                </Row>
            ) : (
                <Row>
                {Array.from(products).map(item => (
                    <Col key={item.id} sm={12} md={6} lg={4} xl={3}>
                        <Item item={item} />
                    </Col>
                ))}
                </Row>
            )}
        </div>
    )
}


export default HomeScreen;