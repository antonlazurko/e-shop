import { Alert, Form, Input,InputNumber } from 'antd'
import { Loader, LoaderSpin } from 'components/Loader'
import { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { listProductDetails, updateProduct } from 'redux/actions'
import { PRODUCT_UPDATE_RESET } from 'redux/reduxConstatns'
import { ProductService } from 'services/products.service'
import { allowOnlyNumbers } from 'utils'

const { Item } = Form

export const ProductUpdateScreen = ({ id, setIsModalOpen }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const {
    productDetails: { loading, error, product },
    productUpdate: { loading: updateLoading, error: updateError, success: successUpdate } } = useSelector(state => state)

  const [uploading, setUploading] = useState(false)


  const formSubmitHandler = (formData) => {
    dispatch(updateProduct({ ...formData, _id: id }))
    if(!updateError){
      setIsModalOpen(false)
    }
  }
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const data = await ProductService.uploadProductImage(formData, config)

      form.setFieldValue('image', data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
    }else {
      if(!product?._id || product?._id !== id){
        dispatch(listProductDetails(id))
      }else{
        form.setFieldsValue(product)
      }
    }
  }, [product, navigate, id, dispatch, form, successUpdate])


  return <>
    { updateError && <Alert banner={ true } message={ updateError } type='error' /> }
    { loading || updateLoading?
      <Loader/>
      : error ? (
        <Alert banner={ true } message={ error } type='error' />
      ) : (
        <Form form={ form } name='productEdit'
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
                message: 'Please input your price',
              }
            ] }>
            <InputNumber type='number' placeholder='Price' min={ 0 }/>
          </Item>
          <Item name='description' label='Description:'
            rules={ [
              {
                required: true,
                message: 'Please input your description',
              },
              { min: 10, message: 'Description must be minimum 10 characters.' },
            ] }>
            <Input.TextArea placeholder='Description' rows={ 4 }/>
          </Item>
          <Item name='image' label='Image:'
            rules={ [
              {
                required: true,
                message: 'Please upload an image',
              },
            ] }>
            <Input type='text' disabled/>
          </Item>
          { uploading ? <LoaderSpin/> : <Input type='file' onChange={ uploadFileHandler }accept='image/png, image/jpg, image/jpeg'/> }
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
              }
            ] }>
            <InputNumber placeholder='Count In Stock' min={ 0 } onKeyPress={ (event) => allowOnlyNumbers(event) } />
          </Item>
        </Form>
      ) }
  </>
}
