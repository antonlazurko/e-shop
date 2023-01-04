import { PlusOutlined,QuestionCircleOutlined } from '@ant-design/icons'
import { Alert,Button, Popconfirm,Table, Typography } from 'antd'
import { Loader } from 'components/Loader'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createProduct,deleteProduct,listProducts } from 'redux/actions'
import { PRODUCT_CREATE_RESET } from 'redux/reduxConstatns'

export const ProductListScreen = () => {

  const {
    productList:{ products, loading, error },
    userLogin:{ userInfo },
    productDelete: { success: successDelete, error: errorDelete, loading: loadingDelete },
    productCreated: {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
      product: createdProduct,
    } } = useSelector(state => state)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id))
  }
  const createProductHandler = (value) => {
    dispatch(createProduct())
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
      key: 'linkToUser',
      dataIndex: 'linkToUser',
      render: (_, { _id }) => (<>
        <Link to={ `/admin/product/${_id}/edit` }>EDIT</Link>
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
          <Button>DELETE</Button>
        </Popconfirm>
      </>)
    },
  ]

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo?.isAdmin) {
      navigate('/login')
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct?._id}/edit`)
    } else {
      dispatch(listProducts())
    }
  },[dispatch, navigate, userInfo?.isAdmin,successDelete, successCreate, createdProduct?._id])

  return (
    <>
      <Typography>Products</Typography>
      <Button icon={ <PlusOutlined /> } onClick={ createProductHandler }>Create Product</Button>
      { errorDelete && <Alert banner={ true } message={ errorDelete } type='error'/> }
      { errorCreate && <Alert banner={ true } message={ errorCreate } type='error'/> }
      { loading || loadingDelete || loadingCreate ?
        <Loader/> :
        error ?
          <Alert banner={ true } message={ error } type='error'/> :
          (
            <Table
              columns={ columns }
              dataSource={ products }
              rowKey={ ({ _id }) => _id }></Table>
          ) }
    </>
  )
}
