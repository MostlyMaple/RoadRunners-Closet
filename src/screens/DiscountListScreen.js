import React from 'react'
import { useEffect, useState } from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from "react-router-bootstrap";
import Loader  from '../components/Loader';
import Message  from '../components/Message';
import { listDiscounts, deleteDiscount, createDiscount } from '../actions/discountActions'
import { DISCOUNT_CREATE_RESET } from '../constants/discountConstants'
function DiscountListScreen({ history }) {
    const dispatch = useDispatch()

    const discountList = useSelector(state => state.discountList)
    const {loading, error, discounts} = discountList

    const discountDelete = useSelector(state => state.discountDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = discountDelete

    const discountCreate = useSelector(state => state.discountCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, discount: createdDiscount} = discountCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    useEffect(() => {
        dispatch({type: DISCOUNT_CREATE_RESET})

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        } 

        if (successCreate) {
            history.push(`/admin/discount/${createdDiscount.id}/edit`)
        } else {
            dispatch(listDiscounts())
        }
        
    }, [dispatch, history, userInfo, successCreate, createdDiscount, successDelete])


    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
             dispatch(deleteDiscount(id))   
        }   
    }

    const createDiscountHandler = () => {
        dispatch(createDiscount())
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Discounts</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createDiscountHandler}>
                        <i className='fas fas-plus'></i> Create Discount Code
                    </Button>
                </Col>
            </Row>
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
                                NAME
                            </th>
                            <th>
                                DISCOUNT
                            </th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from(discounts).map(discount => (
                            <tr key={discount.id}>
                                <td>
                                    {discount.id}
                                </td>
                                <td>
                                    {discount.name}
                                </td>
                                <td>
                                    {discount.discount}
                                </td>
                                <td>
                                <LinkContainer to={`/admin/discount/${discount.id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                        </Button>
                                </LinkContainer>

                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(discount.id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default DiscountListScreen