import { Alert, Button, Col,Form, Input,Row } from 'antd'
import { Loader } from 'components/Loader'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from 'redux/actions/userActions'
import { useQuery } from 'utils'


const { Item } = Form

export const UserLoginScreen = () => {
  const [form] = Form.useForm()
  const query = useQuery()
  const navigate = useNavigate()

  const redirect = query.get('redirect') ? query.get('redirect')  : '/'

  const dispatch = useDispatch()

  const { loading, error, userInfo } = useSelector(state => state.userLogin)

  const formSubmitHandler = (value) => {
    dispatch(login(value))
  }

  useEffect(() => {
    if(userInfo){
      navigate(redirect)
    }
  }, [userInfo, navigate, redirect])


  return loading ? <Loader/> : (
    <Form form={ form }
      onFinish={ formSubmitHandler }>
      <Item name='email' label='Email:' rules={ [
        {
          required: true,
          type: 'email',
          message: 'Please input your email!',

        },
      ] }>
        <Input placeholder='Email'/>
      </Item>
      <Item
        label='Password:'
        name='password'
        rules={ [
          {
            required: true,
            message: 'Please input your password!',
          }
        ] }>
        <Input.Password placeholder='Password'/>
      </Item>
      <Item >
        <Button htmlType='submit'>Submit</Button>
      </Item>
      { error && <Alert closable={ true } banner={ true } message={ error } type='error' /> }
      <Row>
        <Col>
          New Customer?
          <Link to={ redirect ? `/register?redirect=${redirect}` : '/register' }>Register</Link>
        </Col>
      </Row>
    </Form>
  )
}