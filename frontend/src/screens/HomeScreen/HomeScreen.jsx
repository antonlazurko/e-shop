import { Col, Row } from 'antd'
import { Product } from 'components/Product'
import { mediaQueryies } from 'constants'
import products from 'products'
import { useMediaQuery } from 'react-responsive'

const { largedesktopOrLaptop, smallDesktopOrLaptop, tablet, mobile } = mediaQueryies

export const HomeScreen = () => {
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

  return(
    <>
      <h1>Latest products</h1>
      <Row>
        { products?.map((product) => (
          <Col span={ mediaQueryChecker() }  key={ product._id }>
            <Product product={ product }/>
          </Col>
        )) }
      </Row>
    </>
  )
}