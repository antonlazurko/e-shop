import { Layout, Menu,Row } from 'antd'
const { Header } = Layout


export const AppHeader = () => (<Header>
  <Row>
    <Menu
      theme='dark'
      mode='horizontal'
      defaultSelectedKeys={ ['2'] }
      items={ new Array(3).fill(null).map((_, index) => ({
        key: String(index + 1),
        label: `nav ${index + 1}`,
      })) }
    />
  </Row>
</Header>)