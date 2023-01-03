import { Alert, Button, Form, Input,Switch } from 'antd'
import { Loader } from 'components/Loader'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link,useNavigate, useParams } from 'react-router-dom'
import { getUserDetails } from 'redux/actions'

const { Item } = Form

export const UserEditScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const { loading, error, user } = useSelector(state => state.userDetails)

  const formSubmitHandler = (formData) => {
    // dispatch(getUserDetails(formData))
  }

  useEffect(() => {
    if(!user?.name || user?._id !== id){
      dispatch(getUserDetails(id))
    }else{
      form.setFieldsValue(user)
    }
  }, [user, navigate, id, dispatch, form])


  return loading ? <Loader/> : <>
    <Link to='/admin/userlist'>GO BACK</Link>
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
  </>
}
