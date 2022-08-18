import type { JsonRpcSigner } from '@ethersproject/providers'
import { NftSwapV4 } from '@traderxyz/nft-swap-sdk'
import { ethers } from 'ethers'
import { ReactNode, useEffect, createContext, useState } from 'react'

export interface ISwapSdkConfig {
  reloadOnNetworkChange?: boolean
  rerenderOnNetworkChange?: boolean
}

interface ISwapSdkContext {
  nftSwap?: NftSwapV4

  provider?: ethers.providers.Web3Provider
  signer?: JsonRpcSigner
  network?: ethers.providers.Network
  chainId?: number
  walletAddress?: string
  walletBalance?: ethers.BigNumber

  connectWallet?: () => Promise<void>
  disconnectWallet?: () => void
}

const INITIAL_VALUE = {
  nftSwap: undefined,

  provider: undefined,
  signer: undefined,
  network: undefined,
  chainId: undefined,
  walletAddress: undefined,
  walletBalance: undefined,

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
  const [walletAddress, setWalletAddress] = useState<string | undefined>(
    INITIAL_VALUE.walletAddress
  )
  const [walletBalance, setWalletBalance] = useState<ethers.BigNumber | undefined>(
    INITIAL_VALUE.walletBalance
  )

  const [rerender, setRerender] = useState(false)

  /** Connect browser wallet to dapp */
  const connectWallet = async () => {
    console.log('===================')
    console.group('Wallet connection')

    console.log('connection start')
    if (!window) throw new Error('Window is undefined')
    console.log('window defined')

    const web3Provider = new ethers.providers.Web3Provider(
      (window as any).ethereum,
      'any'
    )
    console.log('provider created')
    console.log('provider: ', web3Provider)
    await web3Provider.send('eth_requestAccounts', [])
    console.log('successfully requested accounts')
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
    setWalletAddress(web3WalletAddress)
    console.log('wallet address have been set')

    const web3WalletBalance = await web3Signer.getBalance()
    console.log('wallet balance requested')
    console.log('wallet balance: ', +web3WalletBalance)
    setWalletBalance(web3WalletBalance)
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

    setWalletAddress(undefined)
    console.log('wallet address have been unset')

    setWalletBalance(undefined)
    console.log('wallet balance have been unset')

    setNetwork(undefined)
    console.log('network have been unset')

    setChainId(undefined)
    console.log('chain id have been unset')

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
    if (!walletAddress) {
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
  }, [provider, signer, chainId, walletAddress, rerender])

  /* Subscribe on network change event */
  useEffect(() => {
    console.log('provider changed')
    if (!provider) {
      console.error('Provider is undefined')
      return
    }
    console.log('provider is defined')

    provider.on('network', (newNetwork: any, oldNetwork: any) => {
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

  /** Defined values for context provider */
  const swapSdkProviderValue = {
    nftSwap,

    provider,
    signer,
    network,
    chainId,
    walletAddress,
    walletBalance,

    connectWallet,
    disconnectWallet,
  }

  return (
    <SwapSdkContext.Provider value={swapSdkProviderValue}>
      {children}
    </SwapSdkContext.Provider>
  )
}
