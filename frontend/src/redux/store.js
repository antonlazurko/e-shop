import { applyMiddleware,combineReducers,createStore } from 'redux'
import {
  allOrdersListReducer,  cartReducer,
  myOrdersListReducer,
  orderCreateReducer,
  orderDeliverReducer,  orderDetailsReducer,
  orderPayReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,  productUpdateReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer } from 'redux/reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreated: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate:productReviewCreateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate:userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  myOrdersList: myOrdersListReducer,
  allOrdersList: allOrdersListReducer
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

