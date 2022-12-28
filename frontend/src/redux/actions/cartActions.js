import { CART_ADD_ITEM,CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD_ADDRESS,CART_SAVE_SHIPPING_ADDRESS } from 'redux/reduxConstatns'
import { ProductService } from 'services/products.service'

export const addToCart = (id, quantity) => async(dispatch, getState) => {
  const data = await ProductService.getProductById(id)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      quantity: quantity
    }
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async(dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const saveShippingAddress = (addressData) => async(dispatch, getState) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: addressData
  })
  localStorage.setItem('shippingAddress', JSON.stringify(addressData))
}
export const savePaymentMethod = ({ paymentMethod }) => async(dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD_ADDRESS,
    payload: paymentMethod
  })
  localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
}