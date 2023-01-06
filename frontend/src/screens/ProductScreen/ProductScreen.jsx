import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { Alert, Button,Card, Col, Form,Image,Input,List,Rate,Row,Select,Tag,Typography } from 'antd'
import { Loader } from 'components/Loader'
import { Meta } from 'components/Meta'
import { NO_DATA } from 'constants'
import { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link ,useParams } from 'react-router-dom'
import { addToCart,createProductReview,listProductDetails } from 'redux/actions'
import { PRODUCT_CREATE_REVIEW_RESET } from 'redux/reduxConstatns'


const { Item } = Form
const { TextArea } = Input
const { Item: ListItem } = List


export const ProductScreen = () => {
  const [form] = Form.useForm()
  const { id } = useParams()
  const dispatch = useDispatch()
  const {
    productDetails:{ loading, error, product },
    productReviewCreate: { success, error: errorProductReview },
    userLogin: { userInfo }
  } = useSelector(state => state)

  const { name, image,rating, price , description, countInStock, numReviews } = product
  const [quantity, setQuantity] = useState(1)

  const addToCartHandler = () => {
    if (id && quantity) {
      dispatch(addToCart(id, quantity))
    }
  }
  const reviewFormSubmitHandler = (reviewFormData) => {
    dispatch(createProductReview(id, reviewFormData))
  }

  useEffect(() => {
    if(success){
      form.resetFields()
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(id))
  }, [dispatch, id, success])
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
  }, [])


  return <>
    <Link to='/'>Back</Link>
    { loading ?
      <Loader/>
      :
      error
        ? <div>{ error }</div>
        : (<>
          <Meta title={ name } screen=''/>
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
          <Row>
            <Col>
              <Typography>Reviews</Typography>
              { !product?.numReviews && <Alert banner={ true } message={ 'No reviews' } type='info' /> }
              <List>
                { product?.reviews?.map(({ _id, name, rating, comment, createdAt }) => (
                  <ListItem key={ _id }>
                    <Typography >{ name }</Typography>
                    <Rate disabled defaultValue={ rating }/>
                    <Typography >{ createdAt }</Typography>
                    <Typography >{ comment }</Typography>
                  </ListItem>
                )) }
              </List>
              <List>
                <Typography>Write a Customer Review</Typography>
                { errorProductReview && <Alert closable={ true } banner={ true } message={ errorProductReview } type='error' /> }
                { userInfo ? (
                  <Form form={ form } name='review-form' onFinish={ reviewFormSubmitHandler }>
                    <Item name='rating' label='rating:' rules={ [
                      {
                        required: true,
                        message: 'Please select product rating',
                      },
                    ] }>
                      <Rate/>
                    </Item>
                    <Item name='comment' label='Comment:' rules={ [
                      {
                        required: true,
                        message: 'Please input comment',
                      },
                      {
                        min: 3,
                        message: 'Comment must be minimum 3 characters.',
                      },
                    ] }>
                      <TextArea rows={ 3 } />
                    </Item>
                    <Item><Button htmlType='submit'>Give  a review</Button></Item>
                  </Form>
                ) : <Alert
                  banner={ true }
                  message={ <Typography>Please <Link to='/login'>sign in</Link> to write a review</Typography> }
                  type='info' /> }
              </List>
            </Col>
          </Row>
        </>
        ) }
  </>
}