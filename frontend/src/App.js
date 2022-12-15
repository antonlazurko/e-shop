import { Layout } from 'antd'
import { AppFooter } from 'components/AppFooter'
import { AppHeader } from 'components/AppHeader'
import { HomeScreen } from 'screens/HomeScreen'
const { Content } = Layout
export const App = () => (
  <>
    <Layout>
      <AppHeader/>
      <Content>
        <HomeScreen/>
      </Content>
      <AppFooter/>
    </Layout>
  </>
)