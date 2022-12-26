import { CartScreen } from 'screens/CartScreen'
import { HomeScreen } from 'screens/HomeScreen'
import { NotFoundScreen } from 'screens/NotFoundScreen'
import { ProductScreen } from 'screens/ProductScreen'
import { ProfileScreen } from 'screens/ProfileScreen'
import { UserLoginScreen } from 'screens/UserLoginScreen'
import { UserRegisterScreen } from 'screens/UserRegisterScreen'
const routes = [{
  path: '/',
  children: [{ path: '/',
    element: <HomeScreen/> }
  ] },
{
  path: '/',
  children: [{ path: '/login',
    element: <UserLoginScreen/> }
  ] },
{
  path: '/',
  children: [{ path: '/register',
    element: <UserRegisterScreen/> }
  ] },
{
  path: '/',
  children: [{ path: '/profile',
    element: <ProfileScreen/> }
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
  children: [{ path: '/cart',
    element: <CartScreen/> }
  ] },
{
  path: '/',
  children: [{ path: '/cart/:id',
    element: <CartScreen/> }
  ] },
{
  path: '/',
  children: [{ path: '*',
    element: <NotFoundScreen/> }
  ] },
]
export default routes
