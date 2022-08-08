// import { lazy } from 'react'
import HomePage from '@pages/home/index.page'

const ROUTES = [
  {
    path: '/',
    component: HomePage,
    exact: true,
  },
]

// //If react suspense using
// const LAZY_ROUTES = [
//   {
//     path: "/",
//     component: lazy(() => import("../../pages/home/home.page")),
//     exact: true,
//   },
// ];

export default ROUTES
