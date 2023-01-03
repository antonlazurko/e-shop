import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_RESET,CART_SAVE_PAYMENT_METHOD_ADDRESS,CART_SAVE_SHIPPING_ADDRESS } from 'redux/reduxConstatns'

export const cartReducer = (state = { cartItems: [], shippingAddress: { city: 'Kyiv' } }, { type, payload }) => {
  switch (type) {
  case CART_ADD_ITEM:
    const item = payload
    const existItem = state.cartItems.find(({ product }) => product === item.product)
    if(existItem){
      return {
        ...state,
        cartItems: state.cartItems.map((itemEl) => itemEl.product === existItem.product ? item : itemEl)
      }
    }else{
      return {
        ...state,
        cartItems:[...state.cartItems, item]
      }
    }
  case CART_REMOVE_ITEM:
    return {
      ...state,
      cartItems:state.cartItems.filter(({ product }) => product !== payload )
    }
  case CART_SAVE_SHIPPING_ADDRESS:
    return {
      ...state,
      shippingAddress:payload
    }
  case CART_SAVE_PAYMENT_METHOD_ADDRESS:
    return {
      ...state,
      paymentMethod: payload
    }
  case CART_RESET:
    return {
      ...state,
      cartItems: [],
    }
  default:
    return state
  }
}
