import { Col, Row } from 'antd'
import { Loader } from 'components/Loader'
import { Product } from 'components/Product'
import { mediaQueryies } from 'constants'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { useLocation } from 'react-router-dom'
import { listProducts } from 'redux/actions'

const { largedesktopOrLaptop, smallDesktopOrLaptop, tablet, mobile } = mediaQueryies

export const HomeScreen = () => {
  const { search } = useLocation()
  const searhQuery = search?.substring(1) || ''
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector(state => state.productList)

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
    dispatch(listProducts(searhQuery))
  }, [dispatch,searhQuery])

  return <>
    <h1>Latest products</h1>
    { loading ?
      <Loader/>
      :
      error
        ? <div>{ error }</div>
        : (
          <Row>
            { products?.map((product) => (
              <Col span={ mediaQueryChecker() }  key={ product._id }>
                <Product product={ product }/>
              </Col>
            )) }
          </Row>
        ) }
  </>
}