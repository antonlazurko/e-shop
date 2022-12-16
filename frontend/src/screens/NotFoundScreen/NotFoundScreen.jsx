import { FrownOutlined } from '@ant-design/icons'
import { Typography } from 'antd'

export const NotFoundScreen = () => {
  return (
    <div style={ { display: 'flex', flexDirection: 'column', justifyContent: 'center' } }>
      <Typography.Title style={ { textAlign: 'center', marginBottom: '30px' } }>
        we are deeply sorry
      </Typography.Title>
      <Typography.Text style={ { textAlign: 'center', marginTop: '30px' } }>
        <FrownOutlined style={ { fontSize: 100 } }/>
      </Typography.Text>
      <Typography.Text style={ { textAlign: 'center', marginTop: '30px' } }>
        Unfortunately we do not find any way for your enjoy.
      </Typography.Text>
      <Typography.Text type='warning' style={ { textAlign: 'center', marginBottom: '30px' } }>
        Error 404
      </Typography.Text>
    </div>
  )
}