import { axios } from 'utils/axiosApi'

export const OrderService = {
  async createdOrder(order, config){
    return axios.post('orders', order, config)
  },
  async getOrderDetails(id, config){
    return axios.get(`orders/${id}`, config)
  },
  async putPayOrder(id, paymentResult, config){
    return axios.put(`orders/${id}/pay`, paymentResult, config)
  },
  async getMyOrdersList(config){
    return axios.get('orders/myorders', config)
  },
  async getAllOrdersList(config){
    return axios.get('orders', config)
  },
  async putDeliverOrder(id, config){
    return axios.put(`orders/${id}/deliver`, {}, config)
  },
  async deleteOrder(id, config){
    return axios.delete(`orders/${id}`, config)
  },
}