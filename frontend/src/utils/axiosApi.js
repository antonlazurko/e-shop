import { notification } from 'antd'
import Axios from 'axios'

export const axios = Axios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})
// axios.interceptors.request.use((config) => {
//   const { headers } = config

//   const token = localStorage.getItem('_token')

//   if (token) {
//     headers.Authorization = `Bearer ${token}`
//   }

//   return config
// })

axios.interceptors.response.use(
  (response) => response?.data,
  (err) => {
    if (!err || !err?.response) return err
    const error = err?.response

    let errorObj={
      title: 'Error',
      status: '',
      message: 'Sorry, something went wrong.'
    }
    if (error?.data) {
      errorObj = {
        ...errorObj,
        status: error?.data?.status,
        title: error?.data?.title,
      }
      if (error?.data?.message) {
        errorObj.message = error?.data?.message
      }
    }

    notification.error({
      message: `${errorObj.status} ${errorObj.title}`,
      description: `${errorObj.message}`,
    })

    if (error.status === 401) {
    }

    if (error.status === 403) {
      window.location.href = '/404'
    }

    if (error.status === 404) {
      window.location.href = '/404'
    }

    return Promise.reject(error.data)
  }
)
