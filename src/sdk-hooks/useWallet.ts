import { useContext } from 'react'
import { SwapSdkContext } from '../providers/swapSdkProvider'

export const useWallet = () => {
  const { provider, signer, chainId, walletAddress, connectWallet } =
    useContext(SwapSdkContext)

  return { provider, signer, chainId, walletAddress, connectWallet }
}
