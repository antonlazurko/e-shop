import {
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons'
import { Alert,Button, Col,Form, Input, Row,Table,Tag,Typography,notification  } from 'antd'
import { Loader } from 'components/Loader'
import { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserDetails, myOrdersList,updateUserProfile } from 'redux/actions'
import { USER_UPDATE_PROFILE_RESET } from 'redux/reduxConstatns'


const { Item } = Form

export const ProfileScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [password, setPassword] = useState('')

  const { userLogin: { userInfo },
    userDetails: { loading, error, user },
    userUpdateProfile : { success },
    myOrdersList: { orders, error: ordersError, loading: ordersLoading }
  } = useSelector(state => state)

  const formSubmitHandler = () => {
    const { name, email, password } = form.getFieldsValue()
    if(name === user.name && email === user.email && !password){
      notification.info({
        message: 'Nothing changed!'
      })
      return
    }
    dispatch(updateUserProfile({
      id: user._id,
      name,
      email,
      password
    }))
  }
  const orderDetailsHandler = (id) => {
    console.log(id)
  }
  const myOrdersTableColumns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'DATE',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, { createdAt }) => createdAt.substring(0, 10)
    },
    {
      title: 'TOTAL',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (_, { totalPrice }) => `$${totalPrice}`,
      sorter: (a, b) => a - b,
    },
    {
      title: 'PAID',
      dataIndex: 'isPaid',
      key: 'isPaid',
      render: (_, { paidAt }) => paidAt ? (
        <Tag
          icon={ <CheckCircleOutlined /> }
          color='success'>
          { paidAt.substring(0, 10) }
        </Tag>
      )
        :
        (
          <Tag
            icon={ <CloseCircleOutlined /> }
            color='error'>
            NOT PAID
          </Tag>
        )
    },
    {
      title: 'DELIVERED',
      dataIndex: 'isDelivered',
      key: 'isDelivered',
      render: (_, { deliveredAt }) => deliveredAt ? (
        <Tag
          icon={ <CheckCircleOutlined /> }
          color='success'>
          { deliveredAt.substring(0, 10) }
        </Tag>
      )
        :
        (
          <Tag
            icon={ <CloseCircleOutlined /> }
            color='error'>
            NOT DELIVERED
          </Tag>
        )
    },
    {
      title: '',
      dataIndex: 'Details',
      key: 'Details',
      render: (_, { _id }) => <Button onClick={ () => orderDetailsHandler(_id) }>DETAILS</Button>
    },
  ]
  useEffect(() => {
    if(!userInfo){
      navigate('/login')
    } else {
      if (!user?.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(myOrdersList())
      }else{
        form.setFieldsValue({
          name: user.name,
          email: user.email
        })
      }
    }
  }, [userInfo, navigate, dispatch, user, form, success])


  return loading ?
    <Loader/>
    :
    (
      <>
        <Typography>User Profile</Typography>
        <Row>
          <Col span={ 9 }>
            <Typography>Update details</Typography>
            { success && <Alert closable={ true } banner={ true } message='Profile Updated' type='success' /> }
            { error && <Alert closable={ true } banner={ true } message={ error } type='error' /> }
            <Form form={ form }
              name='update-form'
              onFinish={ formSubmitHandler }>
              <Item name= { 'name' } label='Name:'>
                <Input/>
              </Item>
              <Item name= { 'email' } label='Name:' rules={ [
                {
                  type: 'email',
                  message: 'Please input correct email!'
                },
              ] }>
                <Input/>
              </Item>
              <Item
                label='Password:' name='password'>
                <Input placeholder='Password' onChange={ e => setPassword(e.target.value) }/>
              </Item>
              { !!password && <Item
                label='Confirm password:'
                name='confirmPassword'
                rules={ [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'))
                    },
                  }),
                ] }>
                <Input.Password placeholder='Confirm password'/>
              </Item> }
              <Item>
                <Button htmlType='submit'>
                  Update
                </Button>
              </Item>
            </Form>
          </Col>
          <Col span={ 9 }>
            <Typography>My Orders</Typography>
            { ordersLoading ? <Loader/> : ordersError ? <Alert closable={ true } banner={ true } message={ error } type='error' /> : (
              <Table
                columns={ myOrdersTableColumns } dataSource={ orders }></Table>
            ) }
          </Col>
        </Row>
      </>
    )
}
