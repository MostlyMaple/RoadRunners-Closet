import React from 'react'
import { useEffect, useState } from 'react';
import { Col, Row, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import Loader  from '../components/Loader';
import Message  from '../components/Message';
import { listDiscountDetails, updateDiscount } from '../actions/discountActions'
import FormContainer from '../components/FormContainer'
import { DISCOUNT_UPDATE_RESET } from '../constants/discountConstants'

function UserEditScreen({match, history}) {

    const discountId = match.params.id

    const [name, setName] = useState('')
    const [discountAmount, setDiscountAmount] = useState(0)

    const dispatch = useDispatch()

    const discountDetails = useSelector(state => state.discountDetails)
    const {error, loading, discount} = discountDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const discountUpdate = useSelector(state => state.discountUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate } = discountUpdate

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if (successUpdate) {
                dispatch({type: DISCOUNT_UPDATE_RESET})
                history.push('/admin/discountlist')
            } else {
                if (!discount || discount.id !== Number(discountId)) {
                    dispatch(listDiscountDetails(discountId))
                } else {
                    setName(discount.name)
                    setDiscountAmount(discount.discount)
                }
            }
        }
    }, [discountId, discount, successUpdate, history, dispatch, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateDiscount({id:discountId, name, discount: discountAmount}))
    }

    return (
        <div>
            <Link to='/admin/discountlist'>
            Go Back
            </Link>
            <FormContainer>
                <h1>Edit Discount</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='discount'>
                        <Form.Label>
                            Discount
                        </Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter Discount Amount'
                            value={discountAmount}
                            onChange={(e) => setDiscountAmount(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' onClick={submitHandler}>Update</Button>
                </Form>
                )}
            </FormContainer>
        </div>
        
    )
}

export default UserEditScreen