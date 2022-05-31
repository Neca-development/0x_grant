import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import { getDefaultProvider } from 'ethers'
import Swap from './pages/Swap';
import { Mainnet, DAppProvider, ChainId } from '@usedapp/core'
import CreateOrder from './pages/CreateOrder';
import { MoralisProvider } from 'react-moralis';


const config = {
  readOnlyChainId: ChainId.Rinkeby,
  readOnlyUrls: {
    [ChainId.Rinkeby]: getDefaultProvider('https://rinkeby.infura.io/v3/522b462c9a1d45fb9b3b18b5fda51c05'),
  },
}

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <MoralisProvider serverUrl="https://o77yntlxamoh.usemoralis.com:2053/server" appId="esMmHYJgsWYTb8xkxL32DiQ7JTh7AkbUGHOovo8t">
      <DAppProvider config={config}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />}></Route>
              <Route path="swap" element={<Swap />}></Route>
              <Route path="create-order" element={<CreateOrder />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </DAppProvider>
    </MoralisProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
