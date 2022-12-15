import { Card,Image } from 'antd'
export const Product = ({ product }) => {
  const { name, image } = product
  return (
    <Card
      title={ name }
      style={ {
        width: 300,
      } }
    >
      <Image
        width={ 200 }
        src={ image }
      />
    </Card>

  )
}