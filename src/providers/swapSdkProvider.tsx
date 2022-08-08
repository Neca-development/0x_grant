import type { JsonRpcSigner } from '@ethersproject/providers'
import { NftSwapV4 } from '@traderxyz/nft-swap-sdk'
import { useEthers } from '@usedapp/core'
import type { ReactNode } from 'react'
import { createContext, useEffect, useState } from 'react'

interface ISwapSdkContext {
  signer: JsonRpcSigner | undefined
  nftSwap: NftSwapV4 | undefined
}

const INITIAL_VALUE = {
  signer: undefined,
  nftSwap: undefined,
}

export const SwapSdkContext = createContext<ISwapSdkContext>(INITIAL_VALUE)

interface ISwapSdkProviderProps {
  children?: ReactNode
}

export const SwapSdkProvider = (props: ISwapSdkProviderProps) => {
  const { children } = props

  const { library, account } = useEthers()

  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(INITIAL_VALUE.signer)
  const [nftSwap, setNftSwap] = useState<NftSwapV4 | undefined>(INITIAL_VALUE.nftSwap)

  useEffect(() => {
    if (!library) return
    if (!account) return

    const signerFromUsedapp = library.getSigner()
    const nftSwapInstance = new NftSwapV4(library, signerFromUsedapp)

    setSigner(signerFromUsedapp)
    setNftSwap(nftSwapInstance)
  }, [])

  const swapSdkProviderValue = {
    signer,
    nftSwap,
  }

  return (
    <SwapSdkContext.Provider value={swapSdkProviderValue}>
      {children}
    </SwapSdkContext.Provider>
  )
}
