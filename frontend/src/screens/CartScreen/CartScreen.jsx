import { DeleteTwoTone } from '@ant-design/icons'
import { Button, Card,Col, Image,List,Row ,Select,Typography } from 'antd'
import { Meta } from 'components/Meta'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addToCart, removeFromCart } from 'redux/actions'


const { Item } = List

export const CartScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector(({ cart }) => cart)

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = () => {
    navigate('/shipping')
  }

  return <>
    <Meta screen='Cart'/>
    <Row>
      <Col span={ 8 }>
        <Link to='/'>Go back</Link>
        <Typography>Shopping Cart</Typography>
        { !cartItems?.length && <Typography>
          Your cart is empty
        </Typography> }
        { cartItems?.length && <List>
          { cartItems.map(({ product, name, image, price, countInStock, quantity }) => (
            <Item key={ product }>
              <Row>
                <Col>
                  <Image
                    width={ 150 }
                    alt={ name }
                    src={ image }
                  />
                </Col>
                <Col>
                  <Link to={ `/products/${product}` }>{ name }</Link>
                </Col>
                <Col>
                  <Typography>{ price }</Typography>
                </Col>
                <Col>
                  <Select
                    defaultValue={ quantity }
                    onChange={ (value) => dispatch(addToCart(product, value)) }
                    options={ [...Array(countInStock)?.keys()].map((key) => ({ label: key + 1, value: key + 1 })) }>
                  </Select>
                </Col>
                <Col>
                  <Button icon={ <DeleteTwoTone /> } onClick={ () => removeFromCartHandler(product) }></Button>
                </Col>
              </Row>
            </Item>
          )) }
        </List> }
      </Col>
      <Col span={ 6 }>
        <Card>
          <List>
            <Item>
              <Typography>Subtotal ({ cartItems?.reduce((acc, item) => acc + item.quantity, 0) })</Typography>
              <Typography>Total price ${ cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0)?.toFixed(2) }</Typography>
            </Item>
            <Item>
              <Button disabled={ !cartItems?.length } onClick={ checkoutHandler }>Proceed to checkout</Button>
            </Item>
          </List>
        </Card>
      </Col>
    </Row>
  </>
}