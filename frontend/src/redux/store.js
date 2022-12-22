import { applyMiddleware,combineReducers,createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { cartReducer } from './reducers/cartReducers'
import { productDetailsReducer,productListReducer } from './reducers/productReducers'

const reducer = combineReducers({ productList: productListReducer, productDetails: productDetailsReducer, cart: cartReducer })

const cartItemsFromStorage = localStorage.getItem('cartItems')

const initialState = {
  cart: { cartItems: cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [] }
}

const middleware = [thunk]

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

