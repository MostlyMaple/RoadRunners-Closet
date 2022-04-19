import React from 'react'
import { useEffect, useState } from 'react';
import { Button, Table,  Navbar, Nav, Container, NavDropdown, Link } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from "react-router-bootstrap";
import Loader  from '../components/Loader';
import Message  from '../components/Message';
import { listAllOrders } from '../actions/orderActions'

function OrderListScreen({ history }) {
    const dispatch = useDispatch()

    const orderListAll = useSelector(state => state.orderListAll)
    const {loading, error, orders} = orderListAll

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const [sortingMethod, setSortingMethod] = useState('')

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listAllOrders())
        } else {
            history.push('/login')
        }
        
    }, [dispatch, history, userInfo])


    return (
        <div>
            <h1>Orders</h1>
            <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
                <Container>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavDropdown title='Sort By' id='username'>
                                <NavDropdown.Item id='1' onClick={(e) => setSortingMethod('1')}>Date Low to High</NavDropdown.Item>
                                <NavDropdown.Item id='2' onClick={(e) => setSortingMethod('2')}>Date High to Low</NavDropdown.Item>
                                <NavDropdown.Item id='3' onClick={(e) => setSortingMethod('3')}>Customer A to Z</NavDropdown.Item>
                                <NavDropdown.Item id='4' onClick={(e) => setSortingMethod('4')}>Customer Z to A</NavDropdown.Item>
                                <NavDropdown.Item id='5' onClick={(e) => setSortingMethod('5')}>Total Low to High</NavDropdown.Item>
                                <NavDropdown.Item id='6' onClick={(e) => setSortingMethod('6')}>Total High to Low</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            { loading 
            ? (<Loader/>)
            : error 
            ? (<Message variant='danger'>{error}</Message>)
            : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                USER
                            </th>
                            <th>
                                DATE
                            </th>
                            <th>
                                TOTAL
                            </th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortingMethod === '1' ? (
                            Array.from(orders).sort((a, b) => ((a.created).localeCompare(b.created))).map(order => (
                                <tr key={order.id}>
                                    <td>
                                        {order.id}
                                    </td>
                                    <td>
                                        {order.user && order.user.name}
                                    </td>
                                    <td>
                                        {order.created.substring(0,10)}
                                    </td>
                                    <td>
                                        {order.totalPrice}
                                    </td>
    
                                    <td>
                                    <LinkContainer to={`/order/${order.id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                    </LinkContainer>
                                    </td>
                                </tr>
                            ))
                        ) : sortingMethod === '2' ? (
                            Array.from(orders).sort((a, b) => ((b.created).localeCompare(a.created))).map(order => (
                                <tr key={order.id}>
                                    <td>
                                        {order.id}
                                    </td>
                                    <td>
                                        {order.user && order.user.name}
                                    </td>
                                    <td>
                                        {order.created.substring(0,10)}
                                    </td>
                                    <td>
                                        {order.totalPrice}
                                    </td>
    
                                    <td>
                                    <LinkContainer to={`/order/${order.id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                    </LinkContainer>
                                    </td>
                                </tr>
                            ))
                        ) : sortingMethod === '3' ? (
                            Array.from(orders).sort((a, b) => ((a.user.name).localeCompare(b.user.name))).map(order => (
                                <tr key={order.id}>
                                    <td>
                                        {order.id}
                                    </td>
                                    <td>
                                        {order.user && order.user.name}
                                    </td>
                                    <td>
                                        {order.created.substring(0,10)}
                                    </td>
                                    <td>
                                        {order.totalPrice}
                                    </td>
    
                                    <td>
                                    <LinkContainer to={`/order/${order.id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                    </LinkContainer>
                                    </td>
                                </tr>
                            ))
                        ) : sortingMethod === '4' ? (
                            Array.from(orders).sort((a, b) => ((b.user.name).localeCompare(a.user.name))).map(order => (
                                <tr key={order.id}>
                                    <td>
                                        {order.id}
                                    </td>
                                    <td>
                                        {order.user && order.user.name}
                                    </td>
                                    <td>
                                        {order.created.substring(0,10)}
                                    </td>
                                    <td>
                                        {order.totalPrice}
                                    </td>
    
                                    <td>
                                    <LinkContainer to={`/order/${order.id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                    </LinkContainer>
                                    </td>
                                </tr>
                            ))
                        ) : sortingMethod === '5' ? (
                            Array.from(orders).sort((a, b) => (a.totalPrice - b.totalPrice)).map(order => (
                                <tr key={order.id}>
                                    <td>
                                        {order.id}
                                    </td>
                                    <td>
                                        {order.user && order.user.name}
                                    </td>
                                    <td>
                                        {order.created.substring(0,10)}
                                    </td>
                                    <td>
                                        {order.totalPrice}
                                    </td>
    
                                    <td>
                                    <LinkContainer to={`/order/${order.id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                    </LinkContainer>
                                    </td>
                                </tr>
                            ))
                        ) : sortingMethod === '6' ? (
                            Array.from(orders).sort((a, b) => (b.totalPrice - a.totalPrice)).map(order => (
                                <tr key={order.id}>
                                    <td>
                                        {order.id}
                                    </td>
                                    <td>
                                        {order.user && order.user.name}
                                    </td>
                                    <td>
                                        {order.created.substring(0,10)}
                                    </td>
                                    <td>
                                        {order.totalPrice}
                                    </td>
    
                                    <td>
                                    <LinkContainer to={`/order/${order.id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                    </LinkContainer>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            Array.from(orders).map(order => (
                                <tr key={order.id}>
                                    <td>
                                        {order.id}
                                    </td>
                                    <td>
                                        {order.user && order.user.name}
                                    </td>
                                    <td>
                                        {order.created.substring(0,10)}
                                    </td>
                                    <td>
                                        {order.totalPrice}
                                    </td>
    
                                    <td>
                                    <LinkContainer to={`/order/${order.id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                    </LinkContainer>
                                    </td>
                                </tr>
                            ))
                        )}
                        
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default OrderListScreen