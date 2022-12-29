import {  Alert,Button, Card,Col, Image, List, Row, Space,Typography } from 'antd'
import { CheckoutSteps } from 'components/CheckoutSteps'
import { NO_DATA } from 'constants'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createdOrder } from 'redux/actions'

const { Item : ListItem } = List

export const PlaceOrderScreen = () => {
  const { shippingAddress, paymentMethod, cartItems } = useSelector(state => state.cart)
  const { order, success, error } = useSelector(state => state.orderCreate)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { address, postalCode, city, country } = shippingAddress
  const tax = +0.15
  const itemsPrice = cartItems?.reduce((acc, { price, quantity }) => acc + price * quantity, 0).toFixed(2)
  const shippingPrice = itemsPrice > 100 ? 0 : 100
  const taxPrice = (tax * itemsPrice).toFixed(2)
  const totalPrice = (+itemsPrice + +taxPrice + +shippingPrice).toFixed(2)

  const placeOrderHandler = () => {
    dispatch(createdOrder({
      itemsPrice,
      orderItems: cartItems,
      paymentMethod,
      shippingAddress,
      shippingPrice,
      taxPrice,
      totalPrice
    }))
  }

  useEffect(() => {
    if(success){
      navigate(`/orders/${order._id}`)
    }
  }, [navigate, success])


  return (
    <>
      <CheckoutSteps step1 step2 step3 step4/>
      <Row>
        <Col span={ 10 }>
          <List>
            <ListItem>
              <Space direction='vertical'>
                <Typography.Title level={ 4 }>
                  Shipping
                </Typography.Title>
                <Typography.Text>
                  { address }
                </Typography.Text>
                <Typography.Text>
                  { postalCode }
                </Typography.Text>
                <Typography.Text>
                  { city }
                </Typography.Text>
                <Typography.Text>
                  { country }
                </Typography.Text>
              </Space>
            </ListItem>
            <ListItem>
              <Space direction='vertical'>
                <Typography.Title level={ 5 }>
                  Payment Method
                </Typography.Title>
                <Typography.Text>
                  Method: { paymentMethod?.toUpperCase() }
                </Typography.Text>
              </Space>
            </ListItem>
            <ListItem>
              <Space direction='vertical'>
                <Typography.Title level={ 5 }>
                  Order Items
                </Typography.Title>
                { cartItems?.length ?
                  <List
                    dataSource={ cartItems }
                    renderItem={ ({ name, product, image, quantity, price }) =>  (
                      <ListItem key={ product }>
                        <Row style={ { alignItems: 'baseline' } }>
                          <Col>
                            <Image width={ 50 }
                              alt={ name }
                              src={ image }/>
                          </Col>
                          <Col>
                            <Link to={ `/products/${product}` }>
                              { name }
                            </Link>
                          </Col>
                          <Col>
                            <Typography>{ price } * { quantity } = ${ price * quantity }</Typography>
                          </Col>
                        </Row>
                      </ListItem>
                    ) }>
                  </List> :
                  <Alert banner={ true } message={ 'Your cart is empty' } type='info' />
                }
              </Space>
            </ListItem>
          </List>
        </Col>
        <Col span={ 4 }>
          <Card title='Order Summary' type='inner'>
            <List>
              <ListItem>
                <Col>Items Price</Col>
                <Col>${ itemsPrice }</Col>
              </ListItem>
              <ListItem>
                <Col>Shipping</Col>
                <Col>{ shippingPrice >= 0 ? `$${shippingPrice}` : NO_DATA }</Col>
              </ListItem>
              <ListItem>
                <Col>Tax</Col>
                <Col>{ taxPrice ? `$${taxPrice}` : NO_DATA }</Col>
              </ListItem>
              <ListItem>
                <Col>Total</Col>
                <Col>{ totalPrice ? `$${totalPrice}` : NO_DATA }</Col>
              </ListItem>
              { error && <ListItem>
                <Alert message={ error } type='error'/>
              </ListItem> }
            </List>
            <Button onClick={ placeOrderHandler }>Place Order</Button>
          </Card>
        </Col>

      </Row>
    </>
  )
}
