import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS
} from 'redux/reduxConstatns'
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
    if (message === 'User not found!') {
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
    if (message === 'User not found!') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message
    })
  }
}