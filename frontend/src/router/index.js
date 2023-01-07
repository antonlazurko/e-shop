import { lazy } from 'react'

import { ProtectedRoute } from './ProtectedRoute'

const NotFoundScreen = lazy(() =>import('screens/NotFoundScreen'))
const CartScreen = lazy(() =>import('screens/CartScreen'))
const HomeScreen = lazy(() =>import('screens/HomeScreen'))
const OrderListScreen = lazy(() =>import('screens/OrderListScreen'))
const OrderScreen = lazy(() =>import('screens/OrderScreen'))
const ProductListScreen = lazy(() =>import('screens/ProductListScreen'))
const ProductScreen = lazy(() =>import('screens/ProductScreen'))
const ProfileScreen = lazy(() =>import('screens/ProfileScreen'))
const UserEditScreen = lazy(() =>import('screens/UserEditScreen'))
const UserListScreen = lazy(() =>import('screens/UserListScreen'))
const UserLoginScreen = lazy(() =>import('screens/UserLoginScreen'))
const UserRegisterScreen = lazy(() =>import('screens/UserRegisterScreen'))
const PaymentScreen = lazy(() =>import('screens/PaymentScreen'))
const ShippingScreen = lazy(() =>import('screens/ShippingScreen'))
const PlaceOrderScreen = lazy(() =>import('screens/PlaceOrderScreen'))

const routes = [{
  path: '/',
  children: [{ path: '/',
    element: <HomeScreen/> }
  ] },
{
  path: '/',
  children: [{ path: '/admin/userlist',
    element: <ProtectedRoute><UserListScreen/></ProtectedRoute> }
  ] },
{
  path: '/',
  children: [{ path: '/admin/user/:id/edit',
    element: <ProtectedRoute><UserEditScreen/></ProtectedRoute> }
  ] },
{
  path: '/',
  children: [{ path: '/admin/productlist',
    element: <ProtectedRoute><ProductListScreen/></ProtectedRoute> }
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
  children: [{ path: '/admin/orderlist',
    element: <ProtectedRoute><OrderListScreen/></ProtectedRoute> }
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
