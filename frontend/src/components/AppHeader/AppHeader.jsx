import { HomeTwoTone, ShoppingTwoTone, ThunderboltTwoTone } from '@ant-design/icons'
import { Button,Col,Dropdown,Layout, Row } from 'antd'
import { HeaderSearch } from 'components/HeaderSearch'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from 'redux/actions'

const { Header } = Layout


export const AppHeader = () => {
  const dispatch = useDispatch()
  const { userLogin: { userInfo }, cart: { cartItems } } = useSelector(state => state)

  const logoutHandler = (e) => {
    dispatch(logout())
  }

  const userItems = [
    { label: <Link to='/profile'>Profile</Link>, key: 'profile' },
    { label: <Button type='link' onClick={ logoutHandler }>Logout</Button>, key: 'logout' }
  ]
  const adminItems = [
    { label: <Link to='/profile'>Profile</Link>, key: 'profile' },
    { label: <Button type='text' onClick={ logoutHandler }>Logout</Button>, key: 'logout' },
    { label: <Link to='/admin/userlist'>Users</Link>, key: 'users' },
    { label: <Link to='/admin/productlist'>Products</Link>, key: 'products' },
    { label: <Link to='/admin/orderlist'>Orders</Link>, key: 'orders' }
  ]

  return (<Header>
    <Row>
      <Col span={ 14 }>
        <Link to='/'><HomeTwoTone />E-Shop</Link>
      </Col>
      <Col span={ 4 }>
        <HeaderSearch/>
      </Col>
      <Col span={ 6 }>
        { userInfo ? (
          <>
            <Link to='/cart'><ShoppingTwoTone />Cart({ cartItems?.length || '0' })</Link>
            <Dropdown menu={ { items: userInfo?.isAdmin ? adminItems : userItems } }>
              <span style={ { color:'#fff' } }>{ userInfo.name }</span>
            </Dropdown>
          </>
        ) : (
          <Link to='/login'><ThunderboltTwoTone />Sign-in</Link>
        )
        }
      </Col>
    </Row>
  </Header>)
}