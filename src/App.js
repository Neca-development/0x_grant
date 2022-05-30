import './App.css';
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="bg-sky-500 h-screen">
      <h1 className='text-8xl font-bold text-white text-center'>HA-HA-thon</h1>
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
    </div>
  );
}

export default App;
