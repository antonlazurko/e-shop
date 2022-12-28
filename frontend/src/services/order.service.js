import { axios } from 'utils/axiosApi'

export const OrderService = {
  async createdOrder(order, config){
    return axios.post('orders', order, config)
  }
}