import { ORDER_CREATE_FAIL,ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from 'redux/reduxConstatns'


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