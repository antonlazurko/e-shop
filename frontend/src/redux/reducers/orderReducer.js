import {
  MY_ORDERS_LIST_FAIL,
  MY_ORDERS_LIST_REQUEST,
  MY_ORDERS_LIST_RESET,
  MY_ORDERS_LIST_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,  ORDER_LIST_SUCCESS,  ORDER_PAY_FAIL,  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS } from 'redux/reduxConstatns'


export const orderCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
  case ORDER_CREATE_REQUEST:
    return {
      loading: true,
    }
  case ORDER_CREATE_SUCCESS:
    return {
      loading: false,
      success: true,
      order: payload
    }
  case ORDER_CREATE_FAIL:
    return {
      loading: false,
      error: payload
    }
  case ORDER_CREATE_RESET:
    return {}
  default:
    return state
  }
}
export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, { type, payload }) => {
  switch (type) {
  case ORDER_DETAILS_REQUEST:
    return {
      ...state,
      loading: true,
    }
  case ORDER_DETAILS_SUCCESS:
    return {
      loading: false,
      order: payload
    }
  case ORDER_DETAILS_FAIL:
    return {
      loading: false,
      error: payload
    }
  default:
    return state
  }
}

export const orderPayReducer = (state = {}, { type, payload }) => {
  switch (type) {
  case ORDER_PAY_REQUEST:
    return {
      ...state,
      loading: true,
    }
  case ORDER_PAY_SUCCESS:
    return {
      loading: false,
      success: true
    }
  case ORDER_PAY_FAIL:
    return {
      loading: false,
      error: payload
    }
  case ORDER_PAY_RESET:
    return {}
  default:
    return state
  }
}

export const myOrdersListReducer = (state = { orders: [] }, { type, payload }) => {
  switch (type) {
  case MY_ORDERS_LIST_REQUEST:
    return {
      loading: true,
    }
  case MY_ORDERS_LIST_SUCCESS:
    return {
      loading: false,
      orders: payload
    }
  case MY_ORDERS_LIST_FAIL:
    return {
      loading: false,
      error: payload
    }
  case MY_ORDERS_LIST_RESET:
    return {
      orders: []
    }
  default:
    return state
  }
}

export const allOrdersListReducer = (state = { orders: [] }, { type, payload }) => {
  switch (type) {
  case ORDER_LIST_REQUEST:
    return {
      loading: true,
    }
  case ORDER_LIST_SUCCESS:
    return {
      loading: false,
      orders: payload
    }
  case ORDER_LIST_FAIL:
    return {
      loading: false,
      error: payload
    }
  default:
    return state
  }
}
