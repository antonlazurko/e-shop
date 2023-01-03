import { Alert,Button, Table, Tag } from 'antd'
import { Loader } from 'components/Loader'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { usersList } from 'redux/actions'
export const UserScreen = () => {
  const { users, loading, error } = useSelector(state => state.userList)

  const dispatch = useDispatch()

  const userDeleteHandler = (id)=> {
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
      dataIndex: 'email'

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
        <Link to={ `/user/${_id}/edit` }>EDIT</Link>
        <Button onClick={ () => userDeleteHandler(_id) }>DELETE</Button>
      </>)
    },
  ]

  useEffect(() => {
    dispatch(usersList())
  },[dispatch])
  return (
    <>
      <div>UserScreen</div>
      { loading ?
        <Loader/> :
        error ?
          <Alert banner={ true } message={ error } type='error'/> :
          (
            <Table columns={ columns } dataSource={ users } rowKey={ ({ _id }) => _id }></Table>
          ) }
    </>
  )
}
