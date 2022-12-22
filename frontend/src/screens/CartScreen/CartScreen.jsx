import { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const useQuery = () => {
  const { id } = useParams()
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}
export const CartScreen = () => {
  const query = useQuery()
  const location = useLocation()
  return <div>CartScreen</div>
}