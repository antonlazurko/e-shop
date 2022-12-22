import { CART_ADD_ITEM } from 'redux/reduxConstatns'

export const cartReducer = (state = { cartItems: [] }, { type, payload }) => {
  switch (type) {
  case CART_ADD_ITEM:
    const item = payload
    const existItem = state.cartItems.find(({ product }) => product === item.product)
    if(existItem){
      return {
        ...state,
        cartItems: state.cartItems.map((itemEl) => itemEl.iproduct === existItem.product ? item : itemEl)
      }
    }else{
      return {
        ...state,
        cartItems:[...state.cartItems, item]
      }
    }
    //   case CART_REMOVE_ITEM:
    //     return {
    //       loading: false,
    //       products: payload
    //     }
  default:
    return state
  }
}
