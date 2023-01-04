import { PlusOutlined,QuestionCircleOutlined } from '@ant-design/icons'
import { Alert,Button, Popconfirm,Table, Typography } from 'antd'
import { Loader } from 'components/Loader'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { listProducts } from 'redux/actions'

export const ProductListScreen = () => {

  const { productList:{ products, loading, error }, userLogin:{ userInfo } } = useSelector(state => state)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteProductHandler = (id) => {}

  const createProductHandler = () => {

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
    if (userInfo?.isAdmin) {
      dispatch(listProducts())
    }else {
      navigate('/login')
    }
  },[dispatch, navigate, userInfo?.isAdmin])

  return (
    <>
      <Typography>Products</Typography>
      <Button icon={ <PlusOutlined /> } onClick={ createProductHandler }>Create Product</Button>
      { loading ?
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
