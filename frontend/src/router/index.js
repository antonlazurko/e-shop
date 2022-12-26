import { lazy } from 'react'
import { CartScreen } from 'screens/CartScreen'
import { HomeScreen } from 'screens/HomeScreen'
import { PaymentScreen } from 'screens/PaymentScreen'
import { ProductScreen } from 'screens/ProductScreen'
import { ProfileScreen } from 'screens/ProfileScreen'
import { ShippingScreen } from 'screens/ShippingScreen'
import { UserLoginScreen } from 'screens/UserLoginScreen'
import { UserRegisterScreen } from 'screens/UserRegisterScreen'
const NotFoundScreen = lazy(() =>import('screens/NotFoundScreen'))
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
  children: [{ path: '/shipping',
    element: <ShippingScreen/> }
  ] },
{
  path: '/',
  children: [{ path: '/payment',
    element: <PaymentScreen/> }
  ] },
{
  path: '/',
  children: [{ path: '*',
    element: <NotFoundScreen/> }
  ] },
]
export default routes
