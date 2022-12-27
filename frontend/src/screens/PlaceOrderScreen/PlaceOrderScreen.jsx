import {  Alert,Button, Card,Col, Image, List, Row, Space,Typography } from 'antd'
import { CheckoutSteps } from 'components/CheckoutSteps'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const { Item : ListItem } = List

export const PlaceOrderScreen = () => {
  const { shippingAddress, paymentMethod, cartItems } = useSelector(state => state.cart)
  const { address, postalCode, city, country } = shippingAddress
  const tax = +0.15

  const itemsPrice = cartItems?.reduce((acc, { price, qty }) => acc + price * qty,0)
  const shippingPrice = itemsPrice > 100 ? 0 : 100
  const taxPrice = (tax * itemsPrice).toFixed(2)
  const totalPrice = (+itemsPrice + +taxPrice + +shippingPrice).toFixed(2)

  const placeOrderHandler = () => {
  }

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
                    renderItem={ ({ name, product, image, qty, price }) =>  (
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
                            <Typography>{ price } * { qty } = ${ price * qty }</Typography>
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
                <Col>{ shippingPrice ? `$${shippingPrice}` : 'FREE' }</Col>
              </ListItem>
              <ListItem>
                <Col>Tax</Col>
                <Col>{ taxPrice ? `$${taxPrice}` : 'FREE' }</Col>
              </ListItem>
              <ListItem>
                <Col>Total</Col>
                <Col>{ totalPrice ? `$${totalPrice}` : 'FREE'   }</Col>
              </ListItem>
            </List>
            <Button onClick={ placeOrderHandler }>Place Order</Button>
          </Card>
        </Col>

      </Row>
    </>
  )
}
