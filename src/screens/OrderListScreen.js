import React from 'react'
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
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
                        {Array.from(orders).map(order => (
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
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default OrderListScreen