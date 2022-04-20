import axios from 'axios'
import { 
    ORDER_CREATE_SUCCESS, 
    ORDER_CREATE_FAIL, 
    ORDER_CREATE_REQUEST,

    ORDER_DETAILS_SUCCESS, 
    ORDER_DETAILS_FAIL, 
    ORDER_DETAILS_REQUEST,

    ORDER_LIST_MY_SUCCESS, 
    ORDER_LIST_MY_FAIL, 
    ORDER_LIST_MY_REQUEST,

    ORDER_LIST_ALL_SUCCESS, 
    ORDER_LIST_ALL_FAIL, 
    ORDER_LIST_ALL_REQUEST,
} from '../constants/orderConstants'
import { DISCOUNT_APPLY_RESET } from '../constants/discountConstants'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'


export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { 
            userLogin: { userInfo },
         } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post(
            `http://35.224.232.15/api/orders/add/`,
            order,
            config
        )

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        })

        dispatch({
            type: DISCOUNT_APPLY_RESET,
            payload: data
        })

        localStorage.removeItem('cartItems')
        localStorage.removeItem('discountCode')

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { 
            userLogin: { userInfo },
         } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(
            `http://35.224.232.15/api/order/${id}/`,
            config
        )

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })

        const { 
            userLogin: { userInfo },
         } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(
            `http://35.224.232.15/api/orders/get/`,
            config
        )

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listAllOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_ALL_REQUEST
        })

        const { 
            userLogin: { userInfo },
         } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(
            `http://35.224.232.15/api/orders/admin/`,
            config
        )

        dispatch({
            type: ORDER_LIST_ALL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_ALL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
