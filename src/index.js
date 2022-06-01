import { DAppProvider } from "@usedapp/core";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import CreateOrder from "./pages/CreateOrder";
import FreeNft from "./pages/FreeNft";
import Home from "./pages/Home";
import MyOrders from "./pages/MyOrders";
import Swap from "./pages/Swap";
import reportWebVitals from "./reportWebVitals";

export const HPBChainConfig = {
  chainId: 269,
  chainName: "HPBChain",
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: "0x0000000000000000000000000000000000000000",
  getExplorerAddressLink: (address) => `https://hpbscan.org/address/${address}`,
  getExplorerTransactionLink: (transactionHash) =>
    `https://hpbscan.org/tx/${transactionHash}`,
  // Optional parameters:
  rpcUrl: "https://hpbnode.com",
  blockExplorerUrl: "https://hpbscan.org",
  nativeCurrency: {
    name: "HPBCoin",
    symbol: "HPB",
    decimals: 18,
  },
};
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <DAppProvider config={HPBChainConfig}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />}></Route>
            <Route path="swap" element={<Swap />}></Route>
            <Route path="create-order" element={<CreateOrder />}></Route>
            <Route path="my-orders" element={<MyOrders />}></Route>
            <Route path="nft" element={<FreeNft />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </DAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
