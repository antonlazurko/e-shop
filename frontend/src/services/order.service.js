import { axios } from 'utils/axiosApi'

export const OrderService = {
  async createdOrder(order, config){
    return axios.post('orders', order, config)
  },
  async getOrderDetails(id, config){
    return axios.get(`orders/:${id}`, config)
  }
}