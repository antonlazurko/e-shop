import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { Button,Card, Col, Image,List,Rate,Row, Select,Tag,Typography } from 'antd'
import { Loader } from 'components/Loader'
import { NO_DATA } from 'constants'
import { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link ,useNavigate,useParams } from 'react-router-dom'
import { listProductDetails } from 'redux/actions/productActions'

const { Item: ListItem } = List

export const ProductScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, product } = useSelector(state => state.productDetails)

  const { name, image,rating, price , description, countInStock, numReviews } = product
  const [quantity, setQuantity] = useState(1)

  const addToCartHandler = () => {
    navigate(`/cart/${id}?quantity=${quantity}`)
  }

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch, id])

  return <>
    <Link to='/'>Back</Link>
    { loading ?
      <Loader/>
      :
      error
        ? <div>{ error }</div>
        : (
          <Row>
            <Col span={ 12 }>
              <Image
                preview={ false }
                alt={ name }
                width={ '100%' }
                src={ image }
              />
            </Col>
            <Col span={ 6 }>
              <List>
                <ListItem>
                  <Typography.Title level={ 3 }>
                    { name }
                  </Typography.Title>
                </ListItem>
                <ListItem>
                  <Rate
                    allowHalf disabled value={ rating } />
                  <Typography>
                    { numReviews } reviews
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography.Text>
                    Description: { description }
                  </Typography.Text>
                </ListItem>
              </List>
            </Col>
            <Col span={ 4 }>
              <Card>
                <List>
                  <ListItem>
                    <Typography>
                      Price:
                    </Typography>
                    <Typography.Text type={ price ? 'default' : 'secondary' }>
                      { price ? `$${ price }` : NO_DATA }
                    </Typography.Text>
                  </ListItem>
                  <ListItem>
                    { countInStock > 0 ? <Tag color='success' icon={ <CheckCircleOutlined /> }>
                      In Stock
                    </Tag> : <Tag color='default' icon={ <ClockCircleOutlined /> }>
                      Out of stock
                    </Tag> }
                  </ListItem>
                  { countInStock > 0 && <ListItem>
                    <Row>
                      <Col>
                        Quantity
                      </Col>
                      <Col>
                        <Select
                          defaultValue={ 1 }
                          onChange={ (value) => setQuantity(value) }
                          options={ [...Array(countInStock)?.keys()].map((key) => ({ label: key + 1, value: key + 1 })) }>
                        </Select>
                      </Col>
                    </Row>
                  </ListItem> }
                  <ListItem>
                    <Button
                      onClick={ addToCartHandler }
                      disabled={ !countInStock }>Add to Cart</Button>
                  </ListItem>
                </List>
              </Card>
            </Col>
          </Row>
        ) }
  </>
}