import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS } from 'constants'
import { ProductService } from 'services/products.service'


export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const data = await ProductService.getProducts()
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload:
         error.response && error.response.data.message ?
           error.response.data.message :
           error.data.message })
  }
}