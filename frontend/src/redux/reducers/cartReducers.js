import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from 'redux/reduxConstatns'

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
  default:
    return state
  }
}
