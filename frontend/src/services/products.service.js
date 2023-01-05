import { axios } from 'utils/axiosApi'


export const ProductService = {
  async getProducts(searhQuery){
    return axios.get(`products?query=${searhQuery}`)
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
  },
  async createProductReview(id, review, config){
    return axios.post(`products/${id}/reviews`, review, config)
  }
}