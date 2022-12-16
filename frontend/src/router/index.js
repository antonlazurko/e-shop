import { HomeScreen } from 'screens/HomeScreen'
const routes = [{
  path: '/',
  children: [{ path: '/',
    element: <HomeScreen/> }
  ] }]
export default routes
