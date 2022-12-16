import { Card,Image,Rate,Typography } from 'antd'
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
        minHeight: 500
      } }
    >
      <Link to={ `/product/${_id}` }>
        <Typography.Title disabled={ !price } level={ 3 } style={ { textAlign:'center' } }>{ price ? `${ price }` : 'No Data' }</Typography.Title>
        <Typography.Title level={ 4 } style={ { textAlign:'center' } }>{ name }</Typography.Title>
        <Typography style={ { textAlign:'center' } }>
          <Rate allowHalf disabled value={ rating } style={ { fontSize: 10 } } />
        </Typography>
      </Link>
    </Card>

  )
}