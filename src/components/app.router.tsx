import ROUTES from '@constants/routes.constant'
import MainLayout from '@layouts/main.layout'
import ErrorPage from '@pages/404/index.page'
import { Route, Routes } from 'react-router-dom'

export interface IRoutesProps {}

export default function AppRouter(props: IRoutesProps): JSX.Element {
  const {} = props
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {ROUTES.map(({ path, component: Component }, index) => {
          return <Route path={path} key={`${path}${index}`} element={<Component />} />
        })}

        {/* <React.Suspense fallback={<div>Loading...</div>}>
        {ROUTES.map(({ Component, path, exact }, index) => (
          <Route path={path} key={path + index} element={<Component />} />
        ))}
      </React.Suspense> */}

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  )
}
