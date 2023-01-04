import { UploadOutlined } from '@ant-design/icons'
import { Alert, Button, Form, Input,InputNumber,Upload } from 'antd'
import { Loader } from 'components/Loader'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link,useNavigate, useParams } from 'react-router-dom'
import { listProductDetails, updateProduct } from 'redux/actions'
import { PRODUCT_UPDATE_RESET } from 'redux/reduxConstatns'

const { Item } = Form

export const ProductUpdateScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const { loading, error, product } = useSelector(state => state.productDetails)
  const { loading: updateLoading, error: updateError, success: successUpdate } = useSelector(state => state.productUpdate)


  const formSubmitHandler = (formData) => {
    dispatch(updateProduct({ ...formData, _id: id , image: '/images/default.jpg' }))
  }

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/admin/productlist')
    }else {
      if(!product?.name || product?._id !== id){
        dispatch(listProductDetails(id))
      }else{
        form.setFieldsValue(product)
      }
    }
  }, [product, navigate, id, dispatch, form, successUpdate])


  return <>
    <Link to='/admin/productlist'>GO BACK</Link>
    { updateError && <Alert banner={ true } message={ updateError } type='error' /> }
    { loading || updateLoading?
      <Loader/>
      : error ? (
        <Alert banner={ true } message={ error } type='error' />
      ) : (
        <Form form={ form }
          onFinish={ formSubmitHandler } initialValues={ product }>
          <Item name='name' label='Name:' rules={ [
            {
              required: true,
              message: 'Please input your name',
            },
          ] }>
            <Input placeholder='Name'/>
          </Item>
          <Item name='price' label='Price:'
            rules={ [
              {
                required: true,
                type: 'number',
                message: 'Please input your Price',
              },
            ] }>
            <InputNumber placeholder='Price'/>
          </Item>
          <Item name='description' label='Description:'
            rules={ [
              {
                required: true,
                message: 'Please input your description',
              },
              { min: 5, message: 'Description must be minimum 5 characters.' },
            ] }>
            <Input.TextArea placeholder='Description' rows={ 4 }/>
          </Item>
          { /* <Item name='image' label='Image:'
            rules={ [
              {
                required: true,
                message: 'Please upload an image',
              },
            ] }>
            <Upload>
              <Button icon={ <UploadOutlined /> }>Upload Image</Button>
            </Upload>
          </Item> */ }
          <Item name='brand' label='Brand:'
            rules={ [
              {
                required: true,
                message: 'Please input a brand',
              },
            ] }>
            <Input placeholder='Brand'/>
          </Item>
          <Item name='category' label='Category:'
            rules={ [
              {
                required: true,
                message: 'Please input a category',
              },
            ] }>
            <Input placeholder='Category'/>
          </Item>
          <Item name='countInStock' label='Count In Stock:'
            rules={ [
              {
                required: true,
                type: 'number',
                message: 'Please input your count',
              },
            ] }>
            <InputNumber placeholder='Count In Stock'/>
          </Item>
          <Item>
            <Button htmlType='submit'>Update</Button>
          </Item>
        </Form>
      ) }
  </>
}
