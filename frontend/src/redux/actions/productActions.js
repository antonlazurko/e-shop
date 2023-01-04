import {
  PRODUCT_DELETE_FAIL,  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from 'redux/reduxConstatns'
import { ProductService } from 'services/products.service'


export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const data = await ProductService.getProducts()
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload:
         error.response && error.response.data.message ?
           error.data.message :
           error.message })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const data = await ProductService.getProductById(id)
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload:
           error.response && error.response.data.message ?
             error.data.message :
             error.message })
  }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}` }
    }
    const data = await ProductService.deleteProduct(id, config)

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data })

  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload:
           error.response && error.response.data.message ?
             error.data.message :
             error.message })
  }
}