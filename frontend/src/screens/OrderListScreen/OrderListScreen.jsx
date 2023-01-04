import { QuestionCircleOutlined } from '@ant-design/icons'
import { Alert,Button, Popconfirm,Table, Tag } from 'antd'
import { Loader } from 'components/Loader'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { allOrdersList } from 'redux/actions'

export const OrderListScreen = () => {
  const { allOrdersList:{ orders, loading, error }, userLogin:{ userInfo } } = useSelector(state => state)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id'
    },
    {
      title: 'USER',
      key: 'user',
      dataIndex: 'user',
      render: (_, { user }) => user?.name
    }
    ,
    {
      title: 'DATE',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (_, { createdAt }) => createdAt?.substring(0, 10)
    },
    {
      title: 'TOTAL PRICE',
      key: 'totalPrice',
      dataIndex: 'totalPrice',
    },
    {
      title: 'PAID',
      key: 'isPaid',
      dataIndex: 'isPaid',
      render: (_, { isPaid, paidAt }) => isPaid ? (
        <Tag
          color='success'>
          { paidAt?.substring(0, 10) }
        </Tag>
      )
        :
        (
          <Tag
            color='warning'>
            NOT PAID
          </Tag>
        )
    },
    {
      title: 'DELIVERED',
      key: 'isDelivered',
      dataIndex: 'isDelivered',
      render: (_, { isDelivered, deliveredAt }) => isDelivered ? (
        <Tag
          color='success'>
          { deliveredAt?.substring(0, 10) }
        </Tag>
      )
        :
        (
          <Tag
            color='warning'>
            NOT DELIVERED
          </Tag>
        )
    },
    {
      title: '',
      key: 'linkToUser',
      dataIndex: 'linkToUser',
      render: (_, { _id }) => (<>
        <Link to={ `/orders/${_id}/` }>DETEILS</Link>
        { /* <Popconfirm
          placement='top'
          title='Are you shure you want to delete this user?'
          onConfirm={ () => userDeleteHandler(_id) }
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
        </Popconfirm> */ }
      </>)
    },
  ]

  useEffect(() => {
    if (userInfo?.isAdmin) {
      dispatch(allOrdersList())
    }else {
      navigate('/login')
    }
  },[dispatch, navigate, userInfo?.isAdmin])
  return (
    <>
      <div>Users</div>
      { loading ?
        <Loader/> :
        error ?
          <Alert banner={ true } message={ error } type='error'/> :
          (
            <Table
              columns={ columns }
              dataSource={ orders }
              rowKey={ ({ _id }) => _id }></Table>
          ) }
    </>
  )
}
