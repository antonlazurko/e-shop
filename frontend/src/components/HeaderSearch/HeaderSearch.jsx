import { Input } from 'antd'
import { useLocation,useNavigate } from 'react-router-dom'

const { Search } = Input

export const HeaderSearch = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const onSearch = (searhQuery) => {
    if(searhQuery.trim()){
      navigate({
        pathname:pathname,
        search: `?search=${searhQuery}` })
    } else {
      navigate(pathname)
    }
  }
  return (
    <Search
      allowClear
      loading={ false }
      placeholder='Product search'
      onSearch={ onSearch }
    />
  )
}
