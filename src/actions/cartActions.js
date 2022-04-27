import axios from 'axios'
import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS, 
    CART_SAVE_PAYMENT_METHOD, 
    CART_SAVE_DISCOUNT_CODE, 
} 
    from '../constants/cartConstants'


export const addToCart = (id, qty) => async (dispatch, getState) => {

    try {
        const { data } = await axios.get(`http://147.182.178.230:4000/v1/get-items/?id=${id}`)

        dispatch({
            type:CART_ADD_ITEM,
            payload:{
                product:data.id,
                name:data.item_name,
                image:data.image,
                price:data.price,
                stock:data.quantity,
                qty
            }
        })
    } catch (error) {
        try {
            const {data} = await axios.get(`http://35.224.232.15/api/get-item/${id}/`)

            dispatch({
                type:CART_ADD_ITEM,
                payload:{
                    product:data.id,
                    name:data.item_name,
                    image:data.image,
                    price:data.price,
                    stock:data.quantity,
                    qty
                }
            })
        } catch (error) {

        }
    }

    

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type:CART_SAVE_SHIPPING_ADDRESS,
        payload:data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const saveDiscountCode = (data) => (dispatch) => {
    dispatch({
        type:CART_SAVE_DISCOUNT_CODE,
        payload:data,
    })
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type:CART_SAVE_PAYMENT_METHOD,
        payload:data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}
