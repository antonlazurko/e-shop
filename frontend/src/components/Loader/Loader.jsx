import { Spin } from 'antd'

// import s from './Loader.module.scss'

const Loader = ({ size = 'large', ...others }) => {
  return (
    <div { ...others }>
      <Spin size={ size } />
    </div>
  )
}

export default Loader