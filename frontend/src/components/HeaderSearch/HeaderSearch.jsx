import { Input } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Search } = Input

export const HeaderSearch = () => {
  const navigate = useNavigate()
  const onSearch = (searhQuery) => {
    if(searhQuery.trim()){
      navigate(`/?${searhQuery}`)
    } else {
      navigate('/')
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
