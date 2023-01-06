import { QuestionCircleOutlined } from '@ant-design/icons'
import { Alert,Button, Popconfirm,Table, Tag } from 'antd'
import { Loader } from 'components/Loader'
import { Meta } from 'components/Meta'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteUser,usersList } from 'redux/actions'

export const UserListScreen = () => {
  const { userList:{ users, loading, error }, userLogin:{ userInfo }, userDelete: { success: deleteSuccess } } = useSelector(state => state)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDeleteHandler = (id)=> {
    dispatch(deleteUser(id))
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
      title: 'EMAIL',
      key: 'email',
      dataIndex: 'email',
      render: (_, { email }) => (<a href={ `mailto:${email}` }>{ email }</a>)
    },
    {
      title: 'ADMIN',
      key: 'isAdmin',
      dataIndex: 'isAdmin',
      render: (_, { isAdmin }) => isAdmin ? (
        <Tag
          color='success'>
          ADMIN
        </Tag>
      )
        :
        (
          <Tag
            color='warning'>
            NOT AN ADMIN
          </Tag>
        )
    },
    {
      title: '',
      key: 'linkToUser',
      dataIndex: 'linkToUser',
      render: (_, { _id }) => (<>
        <Link to={ `/admin/user/${_id}/edit` }>EDIT</Link>
        <Popconfirm
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
        </Popconfirm>
      </>)
    },
  ]

  useEffect(() => {
    if (userInfo?.isAdmin) {
      dispatch(usersList())
    }else {
      navigate('/login')
    }
  },[dispatch, navigate, deleteSuccess, userInfo?.isAdmin])
  return (
    <>
      <Meta screen='User List'/>
      <div>Users</div>
      { loading ?
        <Loader/> :
        error ?
          <Alert banner={ true } message={ error } type='error'/> :
          (
            <Table
              columns={ columns }
              dataSource={ users }
              rowKey={ ({ _id }) => _id }></Table>
          ) }
    </>
  )
}
