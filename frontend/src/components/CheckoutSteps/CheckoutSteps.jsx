import { Breadcrumb } from 'antd'

export const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        { step1 ? <a href='/login'>Sign-In</a> : 'Shipping' }
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        { step2 ? <a href='/shipping'>Shipping</a> : 'Shipping' }
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        { step3 ? <a href='/payment'>Payment</a> : 'Payment' }
      </Breadcrumb.Item>
      <Breadcrumb.Item disabled>
        { step4 ? <a href='/placeorder'>Place Order</a> : 'Place Order' }
      </Breadcrumb.Item>
    </Breadcrumb>
  )
}