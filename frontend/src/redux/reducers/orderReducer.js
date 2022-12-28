import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS
} from 'redux/reduxConstatns'


export const orderCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
  case ORDER_CREATE_REQUEST:
    return {
      loasding: true,
    }
  case ORDER_CREATE_SUCCESS:
    return {
      loasding: false,
      success: true,
      order: payload
    }
  case ORDER_CREATE_FAIL:
    return {
      loasding: false,
      error: payload
    }
  default:
    return state
  }
}
export const orderDetailsReducer = (state = { orderItens: [], shippingAddress: {} }, { type, payload }) => {
  switch (type) {
  case ORDER_DETAILS_REQUEST:
    return {
      ...state,
      loasding: true,
    }
  case ORDER_DETAILS_SUCCESS:
    return {
      loasding: false,
      order: payload
    }
  case ORDER_DETAILS_FAIL:
    return {
      loasding: false,
      error: payload
    }
  default:
    return state
  }
}