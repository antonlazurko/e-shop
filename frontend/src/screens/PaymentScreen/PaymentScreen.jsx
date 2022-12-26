import {  Button, Form, Radio,Typography } from 'antd'
import { CheckoutSteps } from 'components/CheckoutSteps'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from 'redux/actions/cartActions'

const { Item } = Form

export const PaymentScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { shippingAddress } = useSelector(state => state?.cart)


  const [form] = Form.useForm()

  const onFormSubmit = (value) => {
    dispatch(savePaymentMethod(value))
    navigate('/placeorder')
  }
  useEffect(() => {
    if(!shippingAddress?.address)navigate('/shipping')
  }, [])

  return (<>
    <CheckoutSteps step2 step3/>
    <Typography></Typography>
    <Form form={ form } name='method-form' onFinish={ onFormSubmit } initialValues={ { paymentMethod:'paypal' } }>
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
