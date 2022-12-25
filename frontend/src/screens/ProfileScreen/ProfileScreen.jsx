import { Button, Col,Form, Input, Row,Typography  } from 'antd'
import { Loader } from 'components/Loader'
import { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserDetails } from 'redux/actions/userActions'

const { Item } = Form

export const ProfileScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { userInfo } = useSelector(state => state.userLogin)
  const { loading, error, user } = useSelector(state => state.userDetails)

  const onFormSubmit = () => {
    // dispatch(getUserDetails(id))
  }

  useEffect(() => {
    if(!userInfo){
      navigate('/login')
    } else {
      if (!user?.name) {
        dispatch(getUserDetails('profile'))
      }else{
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [userInfo, navigate, dispatch, user])


  return loading ?
    <Loader/>
    :
    (
      <>
        <Typography>User Profile</Typography>
        <Row>
          <Col span={ 9 }>
            <Typography>Update details</Typography>
            <Form form={ form }
              onFinish={ onFormSubmit }>
              <Item label='Name:'>
                <Input placeholder='Name' value={ name } onChange={ (e) => setName(e.target.value) }/>
              </Item>
              <Item label='Email:'>
                <Input placeholder='Email' value={ email } onChange={ (e) => setEmail(e.target.value) }/>
              </Item>
              <Item
                label='Password:' name='password'>
                <Input.Password placeholder='Password' value={ password } onChange={ (e) => setPassword(e.target.value) }/>
              </Item>
              { password && <Item
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
          </Col>
        </Row>
      </>
    )
}
