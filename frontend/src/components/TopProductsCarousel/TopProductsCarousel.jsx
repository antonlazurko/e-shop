import { Alert,Carousel, Image, Space, Typography } from 'antd'
import { Loader } from 'components/Loader'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listTopProducts } from 'redux/actions'
const contentStyle = {
  margin: 0,
  color: '#fff',
  height: 500,
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
}

export const TopProductsCarousel = () => {
  const dispatch = useDispatch()
  const { topProducts, loading : topProductsLoading, error: topProductsError } = useSelector(state => state.productTopRating)

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return (
    <>
      {
        topProductsLoading ? <Loader/> : topProductsError ? <Alert banner={ true } message={ topProductsError } type='error'/> : (
          <Carousel autoplay={ true } style={ contentStyle }>
            { topProducts.map(({ image, _id, name }) => (
              <Space key={ _id } >
                <Link to={ `/products/${_id}` }>
                  <Image
                    alt={ name }
                    placeholder={ name }
                    preview={ false }
                    width={ 400 }
                    height={ 350 }
                    src={ image ? image : '/images/default.jpg' }
                  />
                  <Typography>{ name }</Typography>
                </Link>
              </Space>
            ))
            }
          </Carousel>)
      }
    </>
  )
}
