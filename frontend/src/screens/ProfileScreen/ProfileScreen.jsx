import { Alert,Button, Col,Form, Input, notification,Row,Typography  } from 'antd'
import { Loader } from 'components/Loader'
import { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserDetails, updateUserProfile } from 'redux/actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from 'redux/reduxConstatns'


const { Item } = Form

export const ProfileScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [password, setPassword] = useState('')

  const { userInfo } = useSelector(state => state.userLogin)
  const { loading, error, user } = useSelector(state => state.userDetails)
  const { success } = useSelector(state => state.userUpdateProfile)

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

  useEffect(() => {
    if(!userInfo){
      navigate('/login')
    } else {
      if (!user?.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
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
          </Col>
        </Row>
      </>
    )
}
