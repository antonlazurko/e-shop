import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {
  Outlet,
  useNavigate
} from 'react-router-dom'
import { logout } from 'redux/actions'

export const ProtectedRoute = ({ redirectPath = '/login', children }) => {
  const { userInfo } = useSelector(state => state.userLogin)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) {
      navigate(redirectPath)
      dispatch(logout())
    }
  }, [dispatch, navigate, redirectPath, userInfo])


  return children ? children : <Outlet />
}
