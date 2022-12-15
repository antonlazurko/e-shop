import { HomeTwoTone, ShoppingTwoTone, ThunderboltTwoTone } from '@ant-design/icons'
import { Col,Layout, Row } from 'antd'
import { Link } from 'react-router-dom'

const { Header } = Layout


export const AppHeader = () => {
  return (<Header>
    <Row>
      <Col span={ 18 }>
        <Link to='/'><HomeTwoTone />E-Shop</Link>
      </Col>
      <Col span={ 6 }>
        <Link to='/cart'><ShoppingTwoTone />Cart</Link>
        <Link to='/login'><ThunderboltTwoTone />Sign-in</Link>
      </Col>
    </Row>
  </Header>)
}