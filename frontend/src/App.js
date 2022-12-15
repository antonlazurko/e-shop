import { Layout } from 'antd'
import React from 'react'

import { AppFooter } from './components/AppFooter'
import { AppHeader } from './components/AppHeader'
const { Content } = Layout

export const App = () => (
  <>
    <Layout>
      <AppHeader/>
      <main>
        <Content>Hello</Content>
      </main>
      <AppFooter/>
    </Layout>
  </>
)