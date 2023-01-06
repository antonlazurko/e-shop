import { Pagination } from 'antd'
import { createSearchParams,useLocation,useNavigate } from 'react-router-dom'


export const Paginate = ({ pages, search ='', pageNumber = 1, count, pageSize }) => {

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onChange = (page) => {
    navigate({
      pathname: pathname,
      search: createSearchParams({
        search: `${search}`,
        pageNumber: `${page}`,
      }).toString()
    })
  }

  return pages > 1 && <Pagination current={ +pageNumber } onChange={ onChange } pageSize={ pageSize } total={ count } />
}