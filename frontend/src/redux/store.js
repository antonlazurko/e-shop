import { applyMiddleware,combineReducers,createStore } from 'redux'
import {
  cartReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  productDetailsReducer,
  productListReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer } from 'redux/reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
const userInfoFromStorage = localStorage.getItem('userInfo')
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
const paymentMethodFromStorage =   localStorage.getItem('paymentMethod')

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [],
    paymentMethod: paymentMethodFromStorage ? JSON.parse(paymentMethodFromStorage) : [],
    shippingAddress: shippingAddressFromStorage ? JSON.parse(shippingAddressFromStorage) : {} },
  userLogin: { userInfo: userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null },
}

const middleware = [thunk]

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

