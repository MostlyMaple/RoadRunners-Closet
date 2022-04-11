import React from 'react'
import { useEffect, useState } from 'react';
import { listProductDetails } from '../actions/productActions'
import { Col, Row, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import Loader  from '../components/Loader';
import Message  from '../components/Message';

function ItemScreen({ match, history}) {
    
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails
    const [qty, setQty] = useState(1)

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match.params.id])


    const addToCartHandler = () => {
       history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to={`/`}>Go Back</Link>
            {loading ? 
                <Loader/>
                : error 
                ? <Message variant='danger'>{error}</Message>
                : (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.item_name} fluid/>
                    </Col>
                    <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3 className='display-4'><strong>{product.item_name}</strong></h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h3>Price: <strong>${product.price}</strong></h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h6>Description: {product.description}</h6>
                                </ListGroup.Item>
                            </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>Price: <strong>${product.price}</strong></h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h3>{product.quantity > 0 ? 'Product: In Stock' : 'Product: Out of Stock'}</h3>
                                </ListGroup.Item>
                                {product.quantity > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Quantity:</Col>
                                            <Col xs='auto' className='my-1'>
                                                <Form.Control
                                                    as="select"
                                                    value={qty}
                                                    onChange={(e) => setQty(e.target.value)}
                                                >
                                                    {
                                                        [...Array(product.quantity).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }
                                                
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Button 
                                    className="btn-block btn-lg" 
                                    type='button' 
                                    onClick={addToCartHandler}
                                    disabled={product.quantity === 0}>
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>

                                
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                )
            }
            
        </div>
    )
}

export default ItemScreen;