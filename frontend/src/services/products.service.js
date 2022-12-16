import { axios } from 'utils/axiosApi'


export const ProductService = {
  async getProducts(){
    return axios.get('products')
  },
  async getProductById(id){
    return axios.get(`products/${id}`)
  }
}