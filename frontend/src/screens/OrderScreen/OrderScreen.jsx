import {  Alert,Button, Card,Col, Image, List, Row, Space,Typography } from 'antd'
import { Loader } from 'components/Loader'
import { NO_DATA } from 'constants'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link,  useParams } from 'react-router-dom'
import { getOrderDetails } from 'redux/actions/orderActions'

const { Item : ListItem } = List

export const OrderScreen = () => {
  const { id } = useParams()
  const { order = {}, loading, error } = useSelector(state => state.orderDetails)
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    user,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
    _id } = order

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrderDetails(id))
  }, [])


  return (
    loading ?
      <Loader/>
      : error ?
        <Alert closable={ true } banner={ true } message={ error } type='error'/>
        :(
          <List>
            <Typography>Order { _id }</Typography>
            <ListItem>
              <Space direction='vertical'>
                <Typography.Title level={ 4 }>
                  Shipping
                </Typography.Title>
                <Typography.Text>Name: { user?.name }</Typography.Text>
                <Typography.Text>Email: <a  href={ `mailto:${ user?.email }` }>{ user?.email }</a></Typography.Text>
                <Typography.Text>
                  { shippingAddress?.address }
                </Typography.Text>
                <Typography.Text>
                  { shippingAddress?.postalCode }
                </Typography.Text>
                <Typography.Text>
                  { shippingAddress?.city }
                </Typography.Text>
                <Typography.Text>
                  { shippingAddress?.country }
                </Typography.Text>
                { isDelivered ?
                  <Alert banner={ true } message={ `Delivered at ${deliveredAt}` } type='success' />
                  : <Alert banner={ true } message={ 'Your order is not delivered' } type='warning' /> }
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
                { isPaid ?
                  <Alert banner={ true } message={ `Paid at ${paidAt}` } type='success' />
                  : <Alert banner={ true } message={ 'Your order is not paid' } type='warning' /> }
              </Space>
            </ListItem>
            <ListItem>
              <Space direction='vertical'>
                <Typography.Title level={ 5 }>
                  Order Items
                </Typography.Title>
                { orderItems?.length ?
                  <List
                    dataSource={ orderItems }
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
                  <Alert banner={ true } message={ 'Your order is empty' } type='info' />
                }
              </Space>
            </ListItem>
            <ListItem>
              <Card title='Order Summary' type='inner'>
                <Row>
                  <Col>Items Price</Col>
                  <Col>${ itemsPrice }</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{ shippingPrice >= 0 ? `$${shippingPrice}` : NO_DATA }</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>{ taxPrice ? `$${taxPrice}` : NO_DATA }</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>{ totalPrice ? `$${totalPrice}` : NO_DATA }</Col>
                </Row>
                { error && <Row>
                  <Alert message={ error } type='error'/>
                </Row> }
              </Card>
            </ListItem>
          </List>
        )
  )
}
