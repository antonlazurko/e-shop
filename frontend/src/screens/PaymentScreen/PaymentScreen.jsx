import {  Button, Form, Radio,Typography } from 'antd'
import { CheckoutSteps } from 'components/CheckoutSteps'
import { Meta } from 'components/Meta'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from 'redux/actions'


const { Item } = Form

export const PaymentScreen = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { shippingAddress } = useSelector(state => state?.cart)

  const formSubmitHandler = (value) => {
    dispatch(savePaymentMethod(value))
    navigate('/placeorder')
  }
  useEffect(() => {
    if(!shippingAddress?.address)navigate('/shipping')
  }, [])

  return (<>
    <Meta screen='Payment'/>
    <CheckoutSteps step2 step3/>
    <Typography></Typography>
    <Form form={ form } name='method-form' onFinish={ formSubmitHandler } initialValues={ { paymentMethod:'paypal' } }>
      <Item name='paymentMethod' rules={ [
        {
          required: true,
          message: 'Please select a payment method',
        },
      ] }>
        <Radio.Group>
          <Radio value='paypal'>PayPal</Radio>
          <Radio value='creditCard' disabled={ true }>Credit Card</Radio>
        </Radio.Group>
      </Item>
      <Button htmlType='submit'>Submit payment method</Button>
    </Form>
  </>
  )
}
