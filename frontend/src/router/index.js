import { lazy } from 'react'
import { CartScreen } from 'screens/CartScreen'
import { HomeScreen } from 'screens/HomeScreen'
import { OrderScreen } from 'screens/OrderScreen'
import { PaymentScreen } from 'screens/PaymentScreen'
import { PlaceOrderScreen } from 'screens/PlaceOrderScreen'
import { ProductScreen } from 'screens/ProductScreen'
import { ProfileScreen } from 'screens/ProfileScreen'
import { ShippingScreen } from 'screens/ShippingScreen'
import { UserLoginScreen } from 'screens/UserLoginScreen'
import { UserRegisterScreen } from 'screens/UserRegisterScreen'

import { ProtectedRoute } from './ProtectedRoute'

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
    element: <ProtectedRoute><ProfileScreen/></ProtectedRoute> }
  ] },
{
  path: '/',
  children: [{ path: '/products/:id',
    element: <ProductScreen/> }
  ] },
{
  path: '/',
  children: [{ path: '/cart',
    element: <ProtectedRoute><CartScreen/></ProtectedRoute> }
  ] },
{
  path: '/',
  children: [{ path: '/cart/:id',
    element: <ProtectedRoute><CartScreen/></ProtectedRoute> }
  ] },
{
  path: '/',
  children: [{ path: '/shipping',
    element: <ProtectedRoute><ShippingScreen/></ProtectedRoute> }
  ] },
{
  path: '/',
  children: [{ path: '/payment',
    element: <ProtectedRoute><PaymentScreen/></ProtectedRoute> }
  ] },
{
  path: '/',
  children: [{ path: '/placeorder',
    element: <ProtectedRoute><PlaceOrderScreen/></ProtectedRoute> }
  ] },
{
  path: '/',
  children: [{ path: '/orders/:id',
    element: <ProtectedRoute><OrderScreen/></ProtectedRoute> }
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
