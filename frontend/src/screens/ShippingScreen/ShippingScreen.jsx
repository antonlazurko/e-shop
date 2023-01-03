import {  Button, Form, Input,InputNumber, Typography } from 'antd'
import { CheckoutSteps } from 'components/CheckoutSteps'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from 'redux/actions'

const { Item } = Form

export const ShippingScreen = () => {
  const navigate = useNavigate()
  const { shippingAddress } = useSelector(state => state?.cart)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const formSubmitHandler = (value) => {
    dispatch(saveShippingAddress({ ...value }))
    navigate('/payment')
  }

  return (<>
    <CheckoutSteps step1 step2/>
    <Typography>SHIPPING</Typography>
    <Form form={ form } onFinish={ formSubmitHandler }
      initialValues={ shippingAddress }>
      <Item name='country' label='Country:'rules={ [
        {
          required: true,
          message: 'Please input your country name',
        },
      ] }>
        <Input placeholder='Enter Country'/>
      </Item>
      <Item name='city' label='City:'rules={ [
        {
          required: true,
          message: 'Please input your city',
        },
      ] }>
        <Input placeholder='Enter City'/>
      </Item>
      <Item name='postalCode' label='Postal Code:'rules={ [
        {
          required: true,
          type: 'number',
          message: 'Please input your postal code',
        },
      ] }>
        <InputNumber type='number' controls={ false } placeholder='Postal Code'/>
      </Item>
      <Item name='address' label='Address:' rules={ [
        {
          required: true,
          message: 'Please input your address',
        },
      ] }>
        <Input placeholder='Enter Address'/>
      </Item>
      <Button htmlType='submit'>Submit Address</Button>
    </Form>
  </>
  )
}
