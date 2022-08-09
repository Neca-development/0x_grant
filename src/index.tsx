import './index.css'

import type { Config } from '@usedapp/core'
import { DAppProvider, Mainnet } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './App'
import CreateOrder from './pages/CreateOrder'
import FreeNft from './pages/FreeNft'
import Home from './pages/Home'
import MyOrders from './pages/MyOrders'
import Swap from './pages/Swap'
import { SwapSdkProvider } from './providers/swapSdkProvider'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
  },
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <DAppProvider config={config}>
    <SwapSdkProvider>
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
    </SwapSdkProvider>
  </DAppProvider>
)
