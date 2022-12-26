import { Button, Col,Form, Input,Row } from 'antd'
import { Loader } from 'components/Loader'
import { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { register } from 'redux/actions/userActions'

const { Item } = Form

export const UserRegisterScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const redirect = '/'
  const { loading, error, userInfo } = useSelector(state => state.userRegister)

  const onFormSubmit = (value) => {
    dispatch(register(name, email, password))
  }

  useEffect(() => {
    if(userInfo){
      navigate(redirect)
    }
  }, [userInfo, navigate])
  return loading ? <Loader/> : <Form form={ form }
    onFinish={ onFormSubmit }>
    <Item name='name' label='Name:' rules={ [
      {
        required: true,
        type: 'name',
        message: 'Please input your name!',

      },
    ] }>
      <Input placeholder='Name' value={ name } onChange={ (e) => setName(e.target.value) }/>
    </Item>
    <Item name='email' label='Email:' rules={ [
      {
        required: true,
        type: 'email',
        message: 'Please input your email!',

      },
    ] }>
      <Input placeholder='Email' value={ email } onChange={ (e) => setEmail(e.target.value) }/>
    </Item>
    <Item
      label='Password:'
      name='password'
      rules={ [
        {
          required: true,
          message: 'Please input your password!',
        },
      ] }>
      <Input.Password placeholder='Password' value={ password } onChange={ (e) => setPassword(e.target.value) }/>
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
      <Input.Password placeholder='Confirm password' value={ confirmPassword } onChange={ (e) => setConfirmPassword(e.target.value) }/>
    </Item>
    <Item >
      <Button htmlType='submit'>Register</Button>
    </Item>
    <Row>
      <Col>
        Have an Account?
        <Link to={ redirect ? `/login?redirect=${redirect}` : '/login' }>Login</Link>
      </Col>
    </Row>
  </Form>
}