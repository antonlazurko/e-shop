import { applyMiddleware,combineReducers,createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { productDetailsReducer,productListReducer } from './reducers/productReducers'

const reducer = combineReducers({ productList: productListReducer, productDetails: productDetailsReducer })

const initialState = {}

const middleware = [thunk]

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

