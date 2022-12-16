import { HomeScreen } from 'screens/HomeScreen'
import { ProductScreen } from 'screens/ProductScreen'
const routes = [{
  path: '/',
  children: [{ path: '/',
    element: <HomeScreen/> }
  ] },
{
  path: '/',
  children: [{ path: '/product/:id',
    element: <ProductScreen/> }
  ] }]
export default routes
