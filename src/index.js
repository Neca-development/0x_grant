import { DAppProvider, Mumbai } from "@usedapp/core";
import { getDefaultProvider } from "ethers";
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

// const config = {
//   readOnlyChainId: ChainId.Rinkeby,
//   readOnlyUrls: {
//     [ChainId.Rinkeby]: getDefaultProvider('https://rinkeby.infura.io/v3/522b462c9a1d45fb9b3b18b5fda51c05'),
//   },
// }

export const HPBChainConfig = {
  chainId: 80001,
  chainName: "Mumbai",
  // isTestChain: false,
  // isLocalChain: false,
  // readOnlyUrls: {
  //   [Mumbai.chainId]: getDefaultProvider('Mumbai'),
  // },
  multicallAddress: "0x0000000000000000000000000000000000000000",
  getExplorerAddressLink: (address) => `https://hpbscan.org/address/${address}`,
  getExplorerTransactionLink: (transactionHash) =>
    `https://hpbscan.org/tx/${transactionHash}`,
  // Optional parameters:
  // rpcUrl: "https://hpbnode.com",
  // blockExplorerUrl: "https://hpbscan.org",
  // nativeCurrency: {
  //   name: "HPBCoin",
  //   symbol: "HPB",
  //   decimals: 18,
  // },
};
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    /*     <MoralisProvider serverUrl="https://o77yntlxamoh.usemoralis.com:2053/server" appId="esMmHYJgsWYTb8xkxL32DiQ7JTh7AkbUGHOovo8t">
     <DAppProvider config={config}>
         <BrowserRouter>
           <Routes>
             <Route path="/" element={<App />}>
               <Route index element={<Home />}></Route>
               <Route path="swap" element={<Swap />}></Route>
               <Route path="create-order" element={<CreateOrder />}></Route>
               <Route path="free-nft" element={<FreeNft />}></Route>
             </Route>
           </Routes>
         </BrowserRouter>
       </DAppProvider>
     </MoralisProvider> */

    <DAppProvider config={HPBChainConfig}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />}></Route>
            <Route path="swap" element={<Swap />}></Route>
            <Route path="create-order" element={<CreateOrder />}></Route>
            <Route path="my-orders" element={<MyOrders />}></Route>
            <Route path="free-nft" element={<FreeNft />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </DAppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
