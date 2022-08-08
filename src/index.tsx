import '@styles/global.scss'
import 'normalize.css'

import { setupStore } from '@store/store'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

// const PROVIDER_ID = ''

// const alchemyProvider = new ethers.providers.JsonRpcProvider(
//   `https://polygon-mumbai.g.alchemy.com/v2/${PROVIDER_ID}`
// )

// alchemyProvider.pollingInterval = 20000
// const config: Config = {
//   readOnlyChainId: ChainId.Mumbai,
//   readOnlyUrls: {
//     [ChainId.Mumbai]: alchemyProvider,
//   },
//   notifications: {
//     expirationPeriod: 1000,
//     checkInterval: 200000,
//   },
//   // autoConnect: true,
// }

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const store = setupStore()

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <DAppProvider config={config}> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </DAppProvider> */}
    </BrowserRouter>
  </React.StrictMode>
)
