import { Card,Image,Rate,Typography } from 'antd'
import { Link } from 'react-router-dom'
const { Meta } = Card


export const Product = ({ product }) => {
  const { name, image, _id, description, rating, numReviews, price } = product
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
        <Meta
          style={ {
            width: 300,
            textAlign:'center',
            padding: 5,
          } } title={ name } description={ <>
            <Typography style={ { textAlign:'start' } }>{ description }</Typography>
            <Rate allowHalf disabled value={ rating } /> from { numReviews } reviews
          </> }/>
        <Typography style={ { textAlign:'center' } }>${ price }</Typography>
      </Link>
    </Card>

  )
}