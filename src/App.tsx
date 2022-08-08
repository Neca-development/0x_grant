import ReactGA from 'react-ga';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom';


const TRACKING_ID = 'UA-231929759-1 '; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);
function App() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname);
  }, [location]);

  return (
    <div className="">
      <Header></Header>
      {/* <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav> */}
      <Outlet />
      <Footer></Footer>
    </div>
  );
}

export default App;
