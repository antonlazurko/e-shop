import { UserService } from 'services/user.services'

import { USER_LOGIN_FAIL,USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from '../reduxConstatns'

export const login = (email, password) => async(dispatch) => {
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
      payload: error.response && error.response.data.message ?
        error.data.message :
        error.message
    })
  }
}