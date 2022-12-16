import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { Button,Card,Col, Image,List,Rate,Row, Tag,Typography } from 'antd'
import { NO_DATA } from 'constants'
import products from 'products'
import { Link ,useParams } from 'react-router-dom'

const { Item: ListItem } = List

export const ProductScreen = (props) => {
  const { id } = useParams()
  const currentProduct = products?.find(product => product._id === id)
  const { name, image,rating, price , description, countInStock, numReviews } = currentProduct
  return (
    <>
      <Link to='/'>Back</Link>
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
              <ListItem>
                <Button disabled={ !countInStock }>Add to Cart</Button>
              </ListItem>
            </List>
          </Card>
        </Col>
      </Row>
    </>
  )
}