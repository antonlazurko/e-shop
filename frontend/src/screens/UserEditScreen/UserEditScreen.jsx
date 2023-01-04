import { Alert, Button, Form, Input,Switch } from 'antd'
import { Loader } from 'components/Loader'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link,useNavigate, useParams } from 'react-router-dom'
import { getUserDetails, updateUser } from 'redux/actions'
import { USER_UPDATE_RESET } from 'redux/reduxConstatns'

const { Item } = Form

export const UserEditScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const { loading, error, user } = useSelector(state => state.userDetails)
  const { loading: updateLoading, error: updateError, success } = useSelector(state => state.userUpdate)

  const formSubmitHandler = (formData) => {
    dispatch(updateUser(id, formData))
  }

  useEffect(() => {
    if(success){
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/userlist')
    } else {
      if(!user?.name || user?._id !== id){
        dispatch(getUserDetails(id))
      }else{
        form.setFieldsValue(user)
      }
    }
  }, [user, navigate, id, dispatch, form, success])


  return loading ? <Loader/> : <>
    <Link to='/admin/userlist'>GO BACK</Link>
    { updateLoading ?
      <Loader/>
      : updateError ? (
        <Alert banner={ true } message={ updateError } type='error' />
      ) : (
        <Form form={ form }
          onFinish={ formSubmitHandler } initialValues={ user }>
          <Item name='name' label='Name:'>
            <Input placeholder='Name'/>
          </Item>
          <Item name='email' label='Email:'>
            <Input placeholder='Email'/>
          </Item>
          <Item name='isAdmin' label='Is Admin:' valuePropName='checked'>
            <Switch/>
          </Item>
          <Item>
            <Button htmlType='submit'>Update</Button>
          </Item>
          { error && <Alert closable={ true } banner={ true } message={ error } type='error' /> }
        </Form>
      ) }
  </>
}
