import { Layout } from 'antd'
import React from 'react'

import { Footer } from './components/Footer'
import { Header } from './components/Header'

export const App = () => (
  <>
    <Header/>
    <main>
      <Layout>
        <h1>Hello</h1>
      </Layout>
    </main>
    <Footer/>
  </>
)