import { Col, Row } from 'antd'
import { Product } from 'components/Product'
import products from 'products'

export const HomeScreen = () => (
  <>
    <h1>Latest products</h1>
    <Row >
      { products?.map((product) => (
        <Col key={ product._id }>
          <Product product={ product }/>
        </Col>
      )) }
    </Row>
  </>
)