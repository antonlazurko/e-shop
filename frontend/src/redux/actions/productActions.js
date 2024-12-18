import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_TOP_FAIL,  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS } from 'redux/reduxConstatns'
import { ProductService } from 'services/products.service'

export const listProducts = (searhQuery = '', pageNumber = 1) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const data = await ProductService.getProducts(searhQuery, pageNumber)
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message ?
        error.data.message :
        error.message })
  }
}

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST })
    const data = await ProductService.getTopProducts()
    dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_TOP_FAIL,
      payload: error.response && error.response.data.message ?
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
    dispatch({ type: PRODUCT_DETAILS_FAIL,
      payload:   error.response && error.response.data.message ?
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
    dispatch({ type: PRODUCT_DELETE_FAIL,
      payload: error.response && error.response.data.message ?
        error.data.message :
        error.message })
  }
}

export const createProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}` }
    }
    const data = await ProductService.createProduct(config)

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })

  } catch (error) {
    dispatch({ type: PRODUCT_CREATE_FAIL,
      payload: error.response && error.response.data.message ?
        error.data.message :
        error.message })
  }
}
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}` }
    }
    const data = await ProductService.updateProduct(product?._id, product, config)

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })

  } catch (error) {
    dispatch({ type: PRODUCT_UPDATE_FAIL,
      payload: error.response && error.response.data.message ?
        error.data.message :
        error.message })
  }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}` }
    }
    const data = await ProductService.createProductReview(productId, review, config)

    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS, payload: data })

  } catch (error) {
    dispatch({ type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: error.response && error.response.data.message ?
        error.data.message :
        error.message })
  }
}