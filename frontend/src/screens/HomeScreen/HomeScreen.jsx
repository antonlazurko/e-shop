import { Col, Row,  } from 'antd'
import { Loader } from 'components/Loader'
import { Meta } from 'components/Meta'
import { Paginate } from 'components/Paginate'
import { Product } from 'components/Product'
import { TopProductsCarousel } from 'components/TopProductsCarousel'
import { mediaQueryies } from 'constants'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { listProducts } from 'redux/actions'
import { useQuery } from 'utils'

const { largedesktopOrLaptop, smallDesktopOrLaptop, tablet, mobile } = mediaQueryies

export const HomeScreen = () => {
  const query = useQuery()

  const search = query.get('search') ? query.get('search')  : ''
  const pageNumber = query.get('pageNumber') ? query.get('pageNumber')  : 1

  const dispatch = useDispatch()
  const {
    productList: { loading, error, products, pages, count, pageSize } } = useSelector(state => state)

  const isLargeDesktopOrLaptop = useMediaQuery({
    query: largedesktopOrLaptop
  })
  const isSmallDesktopOrLaptop = useMediaQuery({
    query: smallDesktopOrLaptop
  })
  const isTablet = useMediaQuery({
    query: tablet
  })
  const isMobile = useMediaQuery({
    query: mobile
  })

  const mediaQueryChecker = () => {
    if (isLargeDesktopOrLaptop) {
      return 6
    }
    if (isSmallDesktopOrLaptop) {
      return 8
    }
    if (isTablet) {
      return 12
    }
    if (isMobile) {
      return 24
    }
  }
  useEffect(() => {
    dispatch(listProducts(search, pageNumber))
  }, [dispatch,search, pageNumber])

  return <>
    <Meta screen='Home'/>
    <h1>Latest products</h1>
    { ! search ? <TopProductsCarousel/> : <Link to='/'>Back</Link> }
    { loading ?
      <Loader/>
      :
      error
        ? <div>{ error }</div>
        : (
          <Row>
            { products?.map((product) => (
              <Col span={ mediaQueryChecker() }  key={ product._id }>
                <Product product={ product } />
              </Col>
            )) }
          </Row>
        ) }
    <Paginate pages={ pages } pageNumber={ pageNumber } search={ search } pageSize={ pageSize } count={ count }/>
  </>
}