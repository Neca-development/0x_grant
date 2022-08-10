import { BigNumberish, ContractReceipt } from 'ethers'
import { useContext } from 'react'

import { SwapSdkContext } from '../providers/swapSdkProvider'

export function useCancelOrder(nonce: BigNumberish, orderType: 'ERC721' | 'ERC1155') {
  const { nftSwap } = useContext(SwapSdkContext)

  const cancelOrder = async (): Promise<ContractReceipt | undefined> => {
    if (!nftSwap) return

    try {
      const cancelTx = await nftSwap.cancelOrder(nonce, orderType)
      const cancelTxReceipt = await cancelTx.wait()
      return cancelTxReceipt
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  return cancelOrder
}
