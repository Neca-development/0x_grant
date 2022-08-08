import './index.css'

import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './App'
import CreateOrder from './pages/CreateOrder'
import FreeNft from './pages/FreeNft'
import Home from './pages/Home'
import MyOrders from './pages/MyOrders'
import Swap from './pages/Swap'
import { Config, DAppProvider, Rinkeby } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const config: Config = {
  readOnlyChainId: Rinkeby.chainId,
  readOnlyUrls: {
    [Rinkeby.chainId]: getDefaultProvider('rinkeby'),
  },
}


root.render(
  <DAppProvider config={config}>
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
)
