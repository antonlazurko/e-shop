import { Layout } from 'antd'
import { AppFooter } from 'components/AppFooter'
import { AppHeader } from 'components/AppHeader'
import { useRoutes } from 'react-router-dom'
import  routes  from 'router'

const { Content } = Layout

export const App = () => {
  const routesList = useRoutes(routes)
  return(
    <Layout>
      <AppHeader/>
      <Content>
        { routesList }
      </Content>
      <AppFooter/>
    </Layout>
  )}