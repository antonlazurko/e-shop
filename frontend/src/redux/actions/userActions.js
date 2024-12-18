import { UserService } from 'services/user.services'

import {
  CART_RESET,
  MY_ORDERS_LIST_RESET,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS } from '../reduxConstatns'

export const login = ({ email, password }) => async(dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    const data = await UserService.userLogin(email, password, config)
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data

    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error?.response?.data?.message ?
        error?.data?.message :
        error?.message
    })
  }
}
export const register = (name, email, password) => async(dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    const data = await UserService.userRegister(name, email, password, config)
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data

    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data

    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error?.response?.data?.message ?
        error?.data?.message :
        error?.message
    })
  }
}

export const logout = () => async(dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({
    type: USER_LOGOUT
  })
  dispatch({
    type: MY_ORDERS_LIST_RESET
  })
  dispatch({
    type: USER_DETAILS_RESET
  })
  dispatch({
    type: CART_RESET
  })
  dispatch({
    type: USER_LIST_RESET
  })

}

export const getUserDetails = (id) => async(dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}` }
    }
    const data = await UserService.getUserDetails(id, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data

    })
  } catch (error) {
    const message = error?.response?.data?.message ?
      error?.data?.message :
      error?.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message
    })
  }
}
export const updateUserProfile = (user) => async(dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}` }
    }
    const data = await UserService.updateUserProfile(user, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data

    })
    localStorage.setItem('userInfo', JSON.stringify(data))
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data

    })
  } catch (error) {
    const message = error?.response?.data?.message ?
      error?.data?.message :
      error?.message
    if (message === 'User not found!') {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message
    })
  }
}

export const usersList = () => async(dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}` }
    }
    const data = await UserService.getAllUsers(config)

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data

    })
  } catch (error) {
    const message = error?.response?.data?.message ?
      error?.data?.message :
      error?.message
    if (message === 'User not found!') {
      dispatch(logout())
    }
    dispatch({
      type: USER_LIST_FAIL,
      payload: message
    })
  }
}

export const deleteUser = (id) => async(dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}` }
    }
    await UserService.deleteUser(id, config)

    dispatch({
      type: USER_DELETE_SUCCESS,
    })
  } catch (error) {
    const message = error?.response?.data?.message ?
      error?.data?.message :
      error?.message
    if (message === 'User not found!') {
      dispatch(logout())
    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message
    })
  }
}

export const updateUser = (id, user) => async(dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}` }
    }
    const data = await UserService.updateUser(id, user, config)

    dispatch({
      type: USER_UPDATE_SUCCESS,
    })
    dispatch({
      type:USER_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message = error?.response?.data?.message ?
      error?.data?.message :
      error?.message
    if (message === 'User not found!') {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message
    })
  }
}