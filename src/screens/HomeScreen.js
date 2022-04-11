import React from 'react'
import {useEffect} from 'react';
import { Row, Col } from 'react-bootstrap'
import Item  from '../components/Item';
import Loader  from '../components/Loader';
import Message  from '../components/Message';
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'

function HomeScreen({ history }) {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <div>
            <h1>Latest Products</h1>
            { loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message> 
            : <Row>
                {Array.from(products).map(item => (
                    <Col key={item.id} sm={12} md={6} lg={4} xl={3}>
                        <Item item={item} />
                    </Col>
                ))}
                </Row>
            }
            
        </div>
    )
}


export default HomeScreen;