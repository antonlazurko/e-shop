import { DeleteTwoTone } from '@ant-design/icons'
import { Button, Card,Col, Image,List,Row ,Select,Typography } from 'antd'
import { useEffect,useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate,useParams } from 'react-router-dom'
import { addToCart, removeFromCart } from 'redux/actions/cartActions'

const { Item } = List

const useQuery = () => {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}
export const CartScreen = () => {
  const navigate = useNavigate()
  const query = useQuery()
  const { id } = useParams()
  const qty = +query.get('qty')
  const dispatch = useDispatch()
  const { cartItems } = useSelector(({ cart }) => cart)
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const checkoutHendler = () => {
    navigate('/login?redirect=shipping')
  }

  useEffect(() => {
    if(id){
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])


  return <Row>
    <Col span={ 8 }>
      <Typography>Shopping Cart</Typography>
      { !cartItems?.length && <Typography>
        Your cart is empty
        <Link to='/'>Go back</Link></Typography> }
      { cartItems?.length && <List>
        { cartItems.map(({ product,name, image,price,countInStock, qty }) => (
          <Item key={ product }>
            <Row>
              <Col>
                <Image
                  width={ 150 }
                  alt={ name }
                  src={ image }
                />
              </Col>
              <Col><Link to={ `/products/${product}` }>{ name }</Link></Col>
              <Col><Typography>{ price }</Typography></Col>
              <Col>
                <Select
                  value={ qty }
                  onChange={ (value) => dispatch(addToCart(product,+value)) }
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
            <Typography>Subtotal ({ cartItems.reduce((acc, item) => acc + item.qty, 0) }) items</Typography>
            <Typography>Total price ${ cartItems.reduce((acc, item) => acc + item.price, 0)?.toFixed(2) }</Typography>
          </Item>
          <Item>
            <Button disabled={ !cartItems.length } onClick={ checkoutHendler }>Proceed to checkout</Button>
          </Item>
        </List>
      </Card>
    </Col>
  </Row>
}