import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'


export const addToCart = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`http://34.123.91.205/get-item/${id}`)

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

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}