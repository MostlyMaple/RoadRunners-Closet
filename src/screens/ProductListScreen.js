import React from 'react'
import { useEffect } from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from "react-router-bootstrap";
import Loader  from '../components/Loader';
import Message  from '../components/Message';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function ProductListScreen({ history, match }) {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        } 

        if (successCreate) {
            history.push(`/admin/product/${createdProduct.id}/edit`)
        } else {
            dispatch(listProducts())
        }
        
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
             dispatch(deleteProduct(id))   
        }   
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }


    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right col-2'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fas-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

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
                                PRICE
                            </th>
                            <th>
                                STOCK
                            </th>
                            <th>
                                CATEGORY
                            </th>
                            <th>
                                EDIT / DELETE
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from(products).map(item => (
                            <tr key={item.id}>
                                <td>
                                    {item.id}
                                </td>
                                <td>
                                    {item.item_name}
                                </td>
                                <td>
                                    ${item.price}
                                </td>
                                <td>
                                    {item.quantity}
                                </td>
                                <td>
                                    {item.topic}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/product/${item.id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(item.id)}>
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

export default ProductListScreen