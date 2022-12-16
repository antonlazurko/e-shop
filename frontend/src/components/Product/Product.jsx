import { Card,Image,Rate,Typography } from 'antd'
import { Link } from 'react-router-dom'
const { Meta } = Card


export const Product = ({ product }) => {
  const { name, image, _id, rating,  price } = product
  return (
    <Card
      hoverable
      cover={ <Image
        alt=''
        width={ '100%' }
        src={ image }
      /> }
      style={ {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 300,
        margin: 5,
        padding: 5,
        minHeight: 400
      } }
    >
      <Link to={ `/product/${_id}` }>
        <Typography.Title level={ 3 } style={ { textAlign:'center' } }>${ price }</Typography.Title>
        <Meta
          style={ {
            width: 300,
            textAlign:'center',
            padding: 5,
          } }
          title={ name }
          description={ <Rate allowHalf disabled value={ rating } /> }/>
      </Link>
    </Card>

  )
}