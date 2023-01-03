import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

export const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        { step1 ? <Link to='/login'>Sign-In</Link> : 'Sign-In' }
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        { step2 ? <Link to='/shipping'>Shipping</Link> : 'Shipping' }
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        { step3 ? <Link to='/payment'>Payment</Link> : 'Payment' }
      </Breadcrumb.Item>
      <Breadcrumb.Item disabled>
        { step4 ? <Link to='/placeorder'>Place Order</Link> : 'Place Order' }
      </Breadcrumb.Item>
    </Breadcrumb>
  )
}