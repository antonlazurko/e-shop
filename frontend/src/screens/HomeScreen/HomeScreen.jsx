import { Col, Row } from 'antd'

import products from '../../products'
export const HomeScreen = () => (
  <>
    <h1>Latest products</h1>
    <Row>
      { products?.map(product => (
        <Col>
          { product?.name }
        </Col>
      )) }
    </Row>
  </>
)
