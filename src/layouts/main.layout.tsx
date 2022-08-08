import Footer from '@components/shared/footer/footer.component'
import Header from '@components/shared/header/header.component'
import { Outlet } from 'react-router-dom'

export interface ILayoutProps {}

export default function MainLayout(props: ILayoutProps): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
