import { CART_ADD_ITEM, } from 'redux/reduxConstatns'
import { ProductService } from 'services/products.service'

export const addToCart = (id, qty) => async(dispatch, getState) => {
  const { data } = await ProductService.getProductById(id)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.id,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      quantity: data.quantity
    }
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}