import type { JsonRpcSigner } from '@ethersproject/providers'
import { NftSwapV4 } from '@traderxyz/nft-swap-sdk'
import { ethers } from 'ethers'
import { ReactNode, useEffect, createContext, useState } from 'react'

declare global {
  interface Window {
    ethereum: any
  }
}

export interface ISwapSdkConfig {
  reloadOnNetworkChange?: boolean
  rerenderOnNetworkChange?: boolean
  reloadOnAccountChange?: boolean
  rerenderOnAccountChange?: boolean
}

interface ISwapSdkContext {
  nftSwap?: NftSwapV4

  provider?: ethers.providers.Web3Provider
  signer?: JsonRpcSigner
  network?: ethers.providers.Network
  chainId?: number
  account?: string
  balance?: ethers.BigNumber

  connectWallet?: () => Promise<void>
  disconnectWallet?: () => void
}

const INITIAL_VALUE = {
  nftSwap: undefined,

  provider: undefined,
  signer: undefined,
  network: undefined,
  chainId: undefined,
  account: undefined,
  balance: undefined,

  connectWallet: undefined,
  disconnectWallet: undefined,
}

export const SwapSdkContext = createContext<ISwapSdkContext>(INITIAL_VALUE)

interface ISwapSdkProviderProps {
  config?: ISwapSdkConfig
  children?: ReactNode
}

export const SwapSdkProvider = (props: ISwapSdkProviderProps) => {
  const { config, children } = props

  const [nftSwap, setNftSwap] = useState<NftSwapV4 | undefined>(INITIAL_VALUE.nftSwap)

  const [provider, setProvider] = useState<ethers.providers.Web3Provider | undefined>(
    INITIAL_VALUE.provider
  )
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(INITIAL_VALUE.signer)
  const [network, setNetwork] = useState<ethers.providers.Network | undefined>(
    INITIAL_VALUE.network
  )
  const [chainId, setChainId] = useState<number | undefined>(INITIAL_VALUE.chainId)
  const [account, setAccount] = useState<string | undefined>(INITIAL_VALUE.account)
  const [balance, setBalance] = useState<ethers.BigNumber | undefined>(
    INITIAL_VALUE.balance
  )

  const [rerender, setRerender] = useState(false)

  /** Connect browser wallet to dapp */
  const connectWallet = async () => {
    console.log('===================')
    console.group('Wallet connection')

    console.log('connection start')
    if (!window) throw new Error('Window is undefined')
    console.log('window defined')

    const web3Provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    console.log('provider created')
    console.log('provider: ', web3Provider)
    await web3Provider.send('eth_requestAccounts', [])
    console.log('successfully requested accounts')
    console.log('selected account: ', (window as any).ethereum.selectedAddress)
    setProvider(web3Provider)
    console.log('provider have been set')

    const web3Signer = web3Provider.getSigner()
    console.log('signer requested')
    console.log('signer: ', web3Signer)
    setSigner(web3Signer)
    console.log('signer have been set')

    const web3WalletAddress = await web3Signer.getAddress()
    console.log('wallet address requested')
    console.log('wallet address: ', web3WalletAddress)
    setAccount(web3WalletAddress)
    console.log('wallet address have been set')

    const web3WalletBalance = await web3Signer.getBalance()
    console.log('wallet balance requested')
    console.log('wallet balance: ', +web3WalletBalance)
    setBalance(web3WalletBalance)
    console.log('wallet balance have been set')

    const web3Network = web3Provider.network
    console.log('network requested')
    console.log('network: ', web3Network)
    setNetwork(web3Network)
    console.log('network have been set')

    const web3ChainId = await web3Signer.getChainId()
    console.log('chain id requested')
    console.log('chain id: ', web3ChainId)
    setChainId(web3ChainId)
    console.log('chain id have been set')

    console.groupEnd()
    console.log('===================')
  }

  /** Disconnect browser wallet from dapp */
  const disconnectWallet = () => {
    console.log('===================')
    console.group('Wallet disconnection')

    setProvider(undefined)
    console.log('provider have been unset')

    setSigner(undefined)
    console.log('signer have been unset')

    setAccount(undefined)
    console.log('wallet address have been unset')

    setBalance(undefined)
    console.log('wallet balance have been unset')

    setNetwork(undefined)
    console.log('network have been unset')

    setChainId(undefined)
    console.log('chain id have been unset')

    setNftSwap(undefined)
    console.log('swap sdk instance have been unset')

    console.groupEnd()
    console.log('===================')
  }

  /* Create Swap SDK instance */
  useEffect(() => {
    if (!provider) {
      console.error('Provider is undefined')
      return
    }
    if (!signer) {
      console.error('Signer is undefined')
      return
    }
    if (!account) {
      console.error('Wallet address is undefined')
      return
    }

    console.log('===================')
    console.group('Swap SDK instance creation')

    console.log('creation start')
    const nftSwapInstance = new NftSwapV4(provider, signer, chainId)
    console.log('instance created')
    console.log('instance: ', nftSwapInstance)
    setNftSwap(nftSwapInstance)
    console.log('instance have been set')

    console.groupEnd()
    console.log('===================')
  }, [provider, signer, chainId, account, rerender])

  /* Subscribe on network change event */
  useEffect(() => {
    console.log('network: provider changed')
    if (!provider) {
      console.error('Network: provider is undefined')
      return
    }
    console.log('network: provider is defined')

    window.ethereum.on('network', (newNetwork: any, oldNetwork: any) => {
      console.log('===================')
      console.group('Network change event handler')

      console.log('handler start')
      console.log('old network: ', oldNetwork)
      console.log('new network: ', newNetwork)

      if (!oldNetwork) {
        console.log('first connection is not processed')
        console.groupEnd()
        console.log('===================')
        return
      }

      setNetwork(newNetwork)
      console.log('network have been set')

      console.groupEnd()
      console.log('===================')

      if (!config) return

      if (config.reloadOnNetworkChange) {
        window.location.reload()
      }

      if (config.rerenderOnNetworkChange) {
        setRerender((prev) => !prev)
      }
    })
  }, [provider])

  /* Subscribe on account change event */
  useEffect(() => {
    console.log('account: provider changed')
    if (!provider) {
      console.error('Account: provider is undefined')
      return
    }
    console.log('account: provider is defined')

    window.ethereum.on('accountsChanged', (accounts: any) => {
      console.log('===================')
      console.group('Account change event handler')

      console.log('handler start')
      console.log('accounts: ', accounts)

      const newAccount = accounts[0]
      if (!newAccount) {
        console.error('Account: selected account is undefined')
        console.groupEnd()
        console.log('===================')
        return
      }

      if (newAccount === account) {
        console.log('new account is equal to old one')
        console.groupEnd()
        console.log('===================')
        return
      }

      setAccount(newAccount)
      console.log('account have been set')

      console.groupEnd()
      console.log('===================')

      if (!config) return

      if (config.reloadOnAccountChange) {
        window.location.reload()
      }

      if (config.rerenderOnNetworkChange) {
        setRerender((prev) => !prev)
      }
    })
  }, [provider])

  /** Defined values for context provider */
  const swapSdkProviderValue = {
    nftSwap,

    provider,
    signer,
    network,
    chainId,
    account,
    balance,

    connectWallet,
    disconnectWallet,
  }

  return (
    <SwapSdkContext.Provider value={swapSdkProviderValue}>
      {children}
    </SwapSdkContext.Provider>
  )
}
