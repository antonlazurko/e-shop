import { Helmet } from 'react-helmet'

export const Meta = ({ title, description, keywords, screen }) => {
  return (
    <Helmet>
      <title>{ `${ title }|${ screen }` }</title>
      <meta name='description' content={ description }/>
      <meta name='keywords' content={ keywords }/>
    </Helmet>
  )
}
Meta.defaultProps = {
  title: 'Welcome to E-Shop',
  screen: 'Home',
  description: 'We sell best products',
  keywords: 'products'
}
