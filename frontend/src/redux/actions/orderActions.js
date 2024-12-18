import { USER_NOT_FOUND } from 'constants'
import {
  CART_RESET,
  MY_ORDERS_LIST_FAIL,
  MY_ORDERS_LIST_REQUEST,
  MY_ORDERS_LIST_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,  ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,   ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS } from 'redux/reduxConstatns'
import { OrderService } from 'services/order.service.js'

import { logout } from './userActions'

export const createdOrder = (order) => async(dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}` }
    }
    const data = await OrderService.createdOrder(order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data

    })
  } catch (error) {
    const message = error?.response?.data?.message ?
      error?.data?.message :
      error?.message
    if (message === USER_NOT_FOUND) {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message
    })
  }
}
export const getOrderDetails = (id) => async(dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}` }
    }
    const data = await OrderService.getOrderDetails(id, config)
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data

    })
  } catch (error) {
    const message = error?.response?.data?.message ?
      error?.data?.message :
      error?.message
    if (message === USER_NOT_FOUND) {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message
    })
  }
}

export const payOrder = (orderId, paymentResult) => async(dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}` }
    }
    const data = await OrderService.putPayOrder(orderId, paymentResult, config)
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data

    })
    dispatch({
      type: CART_RESET
    })
  } catch (error) {
    const message = error?.response?.data?.message ?
      error?.data?.message :
      error?.message
    if (message === USER_NOT_FOUND) {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message
    })
  }
}

export const myOrdersList = () => async(dispatch, getState) => {
  try {
    dispatch({
      type: MY_ORDERS_LIST_REQUEST
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}` }
    }
    const data = await OrderService.getMyOrdersList(config)
    dispatch({
      type: MY_ORDERS_LIST_SUCCESS,
      payload: data

    })
  } catch (error) {
    const message = error?.response?.data?.message ?
      error?.data?.message :
      error?.message
    if (message === USER_NOT_FOUND) {
      dispatch(logout())
    }
    dispatch({
      type: MY_ORDERS_LIST_FAIL,
      payload: message
    })
  }
}

export const allOrdersList = () => async(dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}` }
    }
    const data = await OrderService.getAllOrdersList(config)
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data

    })
  } catch (error) {
    const message = error?.response?.data?.message ?
      error?.data?.message :
      error?.message
    if (message === USER_NOT_FOUND) {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message
    })
  }
}

export const deliverOrder = (orderId) => async(dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const data = await OrderService.putDeliverOrder(orderId, config)
    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data

    })
    dispatch({
      type: CART_RESET
    })
  } catch (error) {
    const message = error?.response?.data?.message ?
      error?.data?.message :
      error?.message
    if (message === USER_NOT_FOUND) {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: message
    })
  }
}

export const deleteOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELETE_REQUEST
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}` }
    }
    const data = await OrderService.deleteOrder(id, config)

    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })

  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL,
      payload: error.response && error.response.data.message ?
        error.data.message :
        error.message })
  }
}