import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

export const LoaderSpin = (props) => {
  return (
    <Spin indicator={ <LoadingOutlined spin /> } { ...props } />
  )
}