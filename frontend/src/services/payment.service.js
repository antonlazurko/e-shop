import { axios } from 'utils/axiosApi'

export const PaymentService = {
  async getPayPalClientID(){
    return axios.get('config/paypal')
  }
}