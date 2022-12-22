import { Button, Col, List,Row } from 'antd'
import { useEffect,useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'
import { addToCart } from 'redux/actions/cartActions'

const useQuery = () => {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}
export const CartScreen = () => {
  const query = useQuery()
  const { id } = useParams()
  const qty = +query.get('qty')
  const location = useLocation()
  const dispatch = useDispatch()
  const { cartItems } = useSelector(({ cart }) => cart)
  console.log(cartItems)
  useEffect(() => {
    if(id){
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])


  return <div>CartScreen</div>
}