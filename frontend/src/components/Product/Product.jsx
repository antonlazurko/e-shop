import { Card,Image,Rate,Typography } from 'antd'
import { NO_DATA } from 'constants'
import { Link } from 'react-router-dom'

export const Product = ({ product }) => {
  const { name, image, _id, rating,  price } = product
  return (
    <Card
      hoverable
      cover={ <Image
        alt={ name }
        src={ image }
      /> }
      style={ {
        display:'flex',
        flexDirection: 'column',
        margin: 5,
        padding: 5,
        minHeight: 600
      } }
    >
      <Link to={ `/product/${_id}` }>
        <Typography.Title disabled={ !price } level={ 3 } style={ { textAlign:'center' } }>
          { price ? `$${ price }` : NO_DATA }
        </Typography.Title>
        <Typography.Title level={ 4 } style={ { textAlign:'center' } }>{ name }</Typography.Title>
        <Typography style={ { textAlign:'center' } }>
          <Rate allowHalf disabled value={ rating } style={ { fontSize: 10 } } />
        </Typography>
      </Link>
    </Card>

  )
}