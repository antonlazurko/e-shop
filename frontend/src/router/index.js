import { HomeScreen } from 'screens/HomeScreen'
import { NotFoundScreen } from 'screens/NotFoundScreen'
import { ProductScreen } from 'screens/ProductScreen'
const routes = [{
  path: '/',
  children: [{ path: '/',
    element: <HomeScreen/> }
  ] },
{
  path: '/',
  children: [{ path: '/products/:id',
    element: <ProductScreen/> }
  ] },
{
  path: '/',
  children: [{ path: '/404',
    element: <NotFoundScreen/> }
  ] },
{
  path: '/',
  children: [{ path: '*',
    element: <NotFoundScreen/> }
  ] },
]
export default routes
