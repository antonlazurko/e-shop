import { Spin } from 'antd'

import styles from './Loader.module.scss'

const Loader = ({ size = 'large', ...others }) => {
  return (
    <div className={ styles.spin } { ...others }>
      <Spin size={ size } />
    </div>
  )
}

export default Loader