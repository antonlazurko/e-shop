import { HomeTwoTone, ShoppingTwoTone, ThunderboltTwoTone } from '@ant-design/icons'
import { Col,Dropdown,Layout, Row } from 'antd'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from 'redux/actions/userActions'

const { Header } = Layout


export const AppHeader = () => {
  const dispatch = useDispatch()
  const { userLogin: { userInfo }, cart: { cartItems } } = useSelector(state => state)

  const logoutHandler = (e) => {
    dispatch(logout())
  }

  const items = [
    { label: <Link to='/profile'>Profile</Link>, key: 'profile' },
    { label: <Link onClick={ logoutHandler }>Logout</Link>, key: 'Logout' },
  ]
  return (<Header>
    <Row>
      <Col span={ 18 }>
        <Link to='/'><HomeTwoTone />E-Shop</Link>
      </Col>
      <Col span={ 6 }>
        { userInfo ? (
          <>
            <Link to='/cart'><ShoppingTwoTone />Cart({ cartItems?.length || '0' })</Link>
            <Dropdown menu={ { items } }>
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