import { applyMiddleware,combineReducers,createStore } from 'redux'
import { cartReducer } from 'redux/reducers/cartReducers'
import { productDetailsReducer,productListReducer } from 'redux/reducers/productReducers'
import { userLoginReducer } from 'redux/reducers/userLoginReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer })

const cartItemsFromStorage = localStorage.getItem('cartItems')
const userInfoFromStorage = localStorage.getItem('userInfo')

const initialState = {
  cart: { cartItems: cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [] },
  userLogin: { userInfo: userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null }
}

const middleware = [thunk]

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

