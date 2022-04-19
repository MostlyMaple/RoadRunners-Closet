import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import Loader  from '../components/Loader';
import Message  from '../components/Message';
import { listProductDetails, updateProduct } from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

function ProductEditScreen({match, history}) {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [topic, setTopic] = useState('')
    const [stock, setStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
  

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    useEffect(() => {
      if(!userInfo) {
        history.push('/login')
      } else {
        if (successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        } else {
            if (!product.item_name || product.id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.item_name)
                setPrice(product.price)
                if (product.image) {
                    setImage(product.image.replace('/media', ''))
                } else {
                    setImage('/media/640x360.png')
                }
                setTopic(product.topic)
                setStock(product.quantity)
                setDescription(product.description)
            }
        }
      }
    }, [product, productId, successUpdate, history, dispatch])


    const uploadFileHandler = async (e) => {
      const file = e.target.files[0]
      const formData = new FormData()

      formData.append('image', file)
      formData.append('product_id', productId)

      setUploading(true)

      try {
          const config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }

          const { data } = await axios.post('/api/upload/', formData, config)


          setImage(data)
          setUploading(false)

      } catch (error) {
          setUploading(false)
      }
  }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
          id: productId,
          name,
          price,
          topic,
          description,
          stock,
        }))
    }

    return (
        <div>
            <Link to='/admin/productlist'>
            Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
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

                    <Form.Group controlId='price'>
                        <Form.Label>
                            Price
                        </Form.Label>
                        <Form.Control
                            type='float'
                            placeholder='Enter Price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='topic'>
                        <Form.Label>
                            Topic
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Topic'
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>
                            Image
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Image'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        >
                        </Form.Control>
                        <Form.File
                                    id='image-file'
                                    label=''
                                    custom
                                    onChange={uploadFileHandler}
                                >

                        </Form.File>
                        {uploading && <Loader/>}
                    </Form.Group>

                    <Form.Group controlId='stock'>
                        <Form.Label>
                            Stock
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Stock'
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>
                            Description
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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

export default ProductEditScreen