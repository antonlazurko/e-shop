import { Alert, Button, Col,Form, Input,Row } from 'antd'
import { Loader } from 'components/Loader'
import { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from 'redux/actions/userActions'

const { Item } = Form

export const UserLoginScreen = () => {
  const [form] = Form.useForm()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const redirect = '/'

  const dispatch = useDispatch()

  const { loading, error, userInfo } = useSelector(state => state.userLogin)

  const onFormSubmit = (value) => {
    dispatch(login(email, password))
  }

  useEffect(() => {
    if(userInfo){
      navigate(redirect)
    }
  }, [userInfo, navigate])


  return loading ? <Loader/> : <Form form={ form }
    onFinish={ onFormSubmit }>
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
}