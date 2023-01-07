import { Layout } from 'antd'
import { AppFooter } from 'components/AppFooter'
import { AppHeader } from 'components/AppHeader'
import { Loader } from 'components/Loader'
import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import  routes  from 'router'

const { Content } = Layout

export const App = () => {
  const routesList = useRoutes(routes)
  return(
    <Suspense fallback={ <Loader/> }>
      <Layout>
        <AppHeader/>
        <Content>
          { routesList }
        </Content>
        <AppFooter/>
      </Layout>
    </Suspense>
  )}