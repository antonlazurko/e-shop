import { Alert, Button, Col,Form, Input,Row } from 'antd'
import { Loader } from 'components/Loader'
import { Meta } from 'components/Meta'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { register } from 'redux/actions'
import { useQuery } from 'utils'

const { Item } = Form

export const UserRegisterScreen = () => {
  const dispatch = useDispatch()
  const query = useQuery()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const redirect = query.get('redirect') ? query.get('redirect') : '/login'

  const { loading, error, userInfo } = useSelector(state => state.userRegister)

  const formSubmitHandler = ({ name, email, password }) => {
    dispatch(register(name, email, password))
  }

  useEffect(() => {
    if(userInfo){
      navigate(redirect)
    }
  }, [userInfo, navigate, redirect])
  return <>
    <Meta screen='Register'/>
    { loading ? <Loader/> : (
      <Form form={ form }
        onFinish={ formSubmitHandler }>
        <Item name='name' label='Name:' rules={ [
          {
            required: true,
            message: 'Please input your name!',
          },
        ] }>
          <Input placeholder='Name'/>
        </Item>
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
            },
            { min: 8, message: 'Password must be minimum 8 characters.' },
          ] }>
          <Input.Password placeholder='Password'/>
        </Item>
        <Item
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
        </Item>
        <Item >
          <Button htmlType='submit'>Register</Button>
        </Item>
        { error && <Alert closable={ true } banner={ true } message={ error } type='error' /> }
        <Row>
          <Col>
            Have an Account?
            <Link to={ `/login?redirect=${redirect}` }>Login</Link>
          </Col>
        </Row>
      </Form>
    ) }</>
}
