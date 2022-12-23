import { axios } from 'utils/axiosApi'

export const UserService = {
  async userLogin(email, password, config){
    return axios.post('users/login', { email, password }, config)
  }
}