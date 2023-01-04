import { axios } from 'utils/axiosApi'


export const ProductService = {
  async getProducts(){
    return axios.get('products')
  },
  async getProductById(id){
    return axios.get(`products/${id}`)
  },
  async deleteProduct(id, config){
    return axios.delete(`products/${id}`, config)
  },
  async createProduct(config){
    return axios.post('products/', {}, config)
  },
  async updateProduct(id, body, config){
    return axios.put(`products/${id}`, body, config)
  },
  async uploadProductImage(formData, config){
    return axios.post('/upload', formData, config)
  }
}