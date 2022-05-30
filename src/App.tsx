import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
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
		</div>
	);
}

export default App;
