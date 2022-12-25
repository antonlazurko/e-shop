import { axios } from 'utils/axiosApi'

export const UserService = {
  async userLogin(email, password, config){
    return axios.post('users/login', { email, password }, config)
  },
  async userRegister(name, email, password, config){
    return axios.post('users', { name, email, password }, config)
  },
  async getUserDetails(id, config){
    return axios.get(`users/${id}`, config)
  }
}