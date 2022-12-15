import { Card,Image,Typography } from 'antd'
import { Link } from 'react-router-dom'
const { Meta } = Card


export const Product = ({ product }) => {
  const { name, image, _id, description } = product
  return (
    <Card
      hoverable
      cover={ <Image
        alt=''
        width={ 200 }
        src={ image }
      /> }
      style={ {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 300,
        margin: 5,
        padding: 5,
        minHeight: 350
      } }
    >
      <Link to={ `/product/${_id}` }>
        <Meta
          style={ {
            width: 300,
            textAlign:'center',
            padding: 5,
          } } title={ name } description={ <Typography style={ { textAlign:'start' } }>{ description }</Typography> }/>
      </Link>
    </Card>

  )
}