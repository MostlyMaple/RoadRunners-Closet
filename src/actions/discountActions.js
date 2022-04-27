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

import { saveDiscountCode } from '../actions/cartActions'

import { CART_SAVE_DISCOUNT_CODE } from '../constants/cartConstants'

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
            `http://35.224.232.15/api/create-discount/`,
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
            `http://35.224.232.15/api/delete-discount/${id}/`,
            config
        )

        dispatch({
            type: DISCOUNT_DELETE_SUCCESS,
            payload: data
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

        const { data } = await axios.get(`http://147.182.178.230:4000/v1/get-discount/?id=${id}`, config)

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
            `http://35.224.232.15/api/update-discount/${discount.id}/`,
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
            `http://147.182.178.230:4000/v1/get-discounts/`,
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
            `http://35.224.232.15/api/confirm-discount/${name}/`,
            )

        dispatch({ 
            type: DISCOUNT_APPLY_SUCCESS, 
            payload: data,
        })


        dispatch(saveDiscountCode(data))

    } catch (error) {
        dispatch({ 
            type: DISCOUNT_APPLY_FAIL, 
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })

        dispatch({
            type:CART_SAVE_DISCOUNT_CODE,
            payload: { } ,
        })
    }
}
