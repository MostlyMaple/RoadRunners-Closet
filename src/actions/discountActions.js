import {
    DISCOUNT_CREATE_REQUEST,
    DISCOUNT_CREATE_FAIL,
    DISCOUNT_CREATE_SUCCESS,

    DISCOUNT_LIST_REQUEST,
    DISCOUNT_LIST_FAIL,
    DISCOUNT_LIST_SUCCESS,

    DISCOUNT_DETAILS_REQUEST,
    DISCOUNT_DETAILS_FAIL,
    DISCOUNT_DETAILS_SUCCESS,

    DISCOUNT_DELETE_REQUEST,
    DISCOUNT_DELETE_FAIL,
    DISCOUNT_DELETE_SUCCESS,

    DISCOUNT_APPLY_REQUEST,
    DISCOUNT_APPLY_FAIL,
    DISCOUNT_APPLY_SUCCESS,

    DISCOUNT_UPDATE_REQUEST,
    DISCOUNT_UPDATE_FAIL,
    DISCOUNT_UPDATE_SUCCESS,
} from '../constants/discountConstants'

import axios from 'axios'


export const createDiscount = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: DISCOUNT_CREATE_REQUEST
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
            `/api/create-discount/`,
            {},
            config
        )

        dispatch({
            type: DISCOUNT_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: DISCOUNT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteDiscount = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DISCOUNT_DELETE_REQUEST
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

        const { data } = await axios.delete(
            `/api/delete-discount/${id}/`,
            config
        )

        dispatch({
            type: DISCOUNT_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: DISCOUNT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listDiscountDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DISCOUNT_DETAILS_REQUEST })

        const { 
            userLogin: { userInfo },
         } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(`/api/get-discount/${id}`, config)

        dispatch({ 
            type: DISCOUNT_DETAILS_SUCCESS, 
            payload: data
        })

    } catch (error) {
        dispatch({ 
            type: DISCOUNT_DETAILS_FAIL, 
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const updateDiscount = (discount) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DISCOUNT_UPDATE_REQUEST
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

        const { data } = await axios.put(
            `/api/update-discount/${discount.id}/`,
            discount,
            config
        )

        dispatch({
            type: DISCOUNT_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: DISCOUNT_DETAILS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: DISCOUNT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listDiscounts = () => async (dispatch, getState) => {
    try {
        dispatch({ type: DISCOUNT_LIST_REQUEST })

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
            `/api/get-discounts/`,
            config
            )

        dispatch({ 
            type: DISCOUNT_LIST_SUCCESS, 
            payload: data,
        })

    } catch (error) {
        dispatch({ 
            type: DISCOUNT_LIST_FAIL, 
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const applyDiscount = (name) => async (dispatch) => {
    try {
        dispatch({ type: DISCOUNT_APPLY_REQUEST })

        const { data } = await axios.get(
            `/api/confirm-discount/${name}/`,
            )

        dispatch({ 
            type: DISCOUNT_APPLY_SUCCESS, 
            payload: data,
        })


        localStorage.setItem('discountCode', JSON.stringify(data))
    } catch (error) {
        localStorage.removeItem('discountCode')
        dispatch({ 
            type: DISCOUNT_APPLY_FAIL, 
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}