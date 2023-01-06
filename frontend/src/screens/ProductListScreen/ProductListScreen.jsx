import { DeleteOutlined,EditOutlined,PlusOutlined,QuestionCircleOutlined } from '@ant-design/icons'
import { Alert,Button, Modal,Popconfirm,Row,Table, Typography } from 'antd'
import { Loader } from 'components/Loader'
import { Meta } from 'components/Meta'
import { Paginate } from 'components/Paginate'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createProduct,deleteProduct,listProducts } from 'redux/actions'
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET,PRODUCT_UPDATE_RESET } from 'redux/reduxConstatns'
import { ProductUpdateScreen } from 'screens/ProductUpdateScreen'
import { useQuery } from 'utils'


export const ProductListScreen = () => {
  const query = useQuery()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productEditId, setProductEditId] = useState(null)
  const pageNumber = query.get('pageNumber') ? query.get('pageNumber')  : 1
  const search = query.get('search') ? query.get('search')  : ''

  const {
    productList:{ products, loading, error, pages, pageSize, count },
    userLogin:{ userInfo },
    productDelete: { success: successDelete, error: errorDelete, loading: loadingDelete },
    productCreated: {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
      product: createdProduct,
    },
    productUpdate:{
      loading: updateLoading,
      error: updateError,
      success: successUpdate } } = useSelector(state => state)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id))
  }
  const createProductHandler = (value) => {
    dispatch(createProduct())
  }
  const productEditHandler = (id) =>{
    setProductEditId(id)
    setIsModalOpen(true)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id'
    },
    {
      title: 'NAME',
      key: 'name',
      dataIndex: 'name'

    },
    {
      title: 'PRICE',
      key: 'price',
      dataIndex: 'price'

    },
    {
      title: 'CATEGORY',
      key: 'category',
      dataIndex: 'category',
    },
    {
      title: 'BRAND',
      key: 'brand',
      dataIndex: 'brand',
    },
    {
      title: '',
      key: 'productActions',
      dataIndex: 'productActions',
      render: (_, { _id }) => (<Row justify='space-between'>
        <Button type='text' size='small' icon={ <EditOutlined /> } onClick={ () => productEditHandler(_id) }>EDIT</Button>
        <Popconfirm
          placement='top'
          title='Are you shure you want to delete this product?'
          onConfirm={ () => deleteProductHandler(_id) }
          okText='Delete anyway'
          cancelText='No'
          icon={
            <QuestionCircleOutlined
              style={ {
                color: 'red',
              } }
            />
          }
        >
          <Button size='small' danger icon={ <DeleteOutlined /> }>DELETE</Button>
        </Popconfirm>
      </Row>)
    },
  ]

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      navigate('/login')
      setIsModalOpen(false)
    }
    if (successUpdate) {
      dispatch(listProducts(search, pageNumber))
      dispatch({ type: PRODUCT_UPDATE_RESET })
    }
    if (successCreate) {
      setProductEditId(createdProduct?._id)
      setIsModalOpen(true)
      dispatch(listProducts(search, pageNumber))
      dispatch({ type: PRODUCT_CREATE_RESET })
    }
    if(successDelete) {
      dispatch(listProducts(search, pageNumber))
      dispatch({ type: PRODUCT_DELETE_RESET })
    }
  },[dispatch, navigate, userInfo?.isAdmin, successDelete, successCreate, successUpdate, pageNumber, search])

  useEffect(() => {
    dispatch(listProducts(search, pageNumber))
  }, [pageNumber, search])


  return (
    <>
      <Meta screen='Product List'/>
      <Typography>Products</Typography>
      <Button icon={ <PlusOutlined /> } onClick={ createProductHandler }>Create Product</Button>
      { errorDelete && <Alert banner={ true } message={ errorDelete } type='error'/> }
      { errorCreate && <Alert banner={ true } message={ errorCreate } type='error'/> }
      { updateError && <Alert banner={ true } message={ updateError } type='error'/> }
      { loading || loadingDelete || loadingCreate || updateLoading?
        <Loader/> :
        error ?
          <Alert banner={ true } message={ error } type='error'/> :
          (
            <Table
              columns={ columns }
              dataSource={ products }
              rowKey={ ({ _id }) => _id }>
            </Table>
          ) }
      <Modal
        width={ '60%' }
        destroyOnClose={ true }
        footer={ [
          <Button type='primary' form='productEdit' key='submit' htmlType='submit'>
            Update
          </Button>,
          <Button type='text' key='button' htmlType='button' onClick={ () => {
            setIsModalOpen(false)
            setProductEditId(null)} }>
            Cancel
          </Button>
        ] }
        title='Product Edit Modal' open={ isModalOpen } onCancel={ () => setIsModalOpen(false) }>
        <ProductUpdateScreen setIsModalOpen={ setIsModalOpen } id={ productEditId }/>
      </Modal>
      <Paginate pages={ pages } pageNumber={ pageNumber } search={ search } pageSize={ pageSize } count={ count }/>
    </>
  )
}
