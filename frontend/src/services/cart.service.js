import { axios } from 'utils/axiosApi'

export const CartService = {
  async getCartItems(){
    return axios.get('cart')
  },
  async getCartItemById(id){
    return axios.get(`cart/${id}`)
  }
}