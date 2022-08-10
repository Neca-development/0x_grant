import { BigNumberish, ContractReceipt } from 'ethers'
import { useContext } from 'react'

import { SwapSdkContext } from '../providers/swapSdkProvider'

/**
 * Get a function to cancel an order by nonce and type
 * @param nonce nonce of the order to be cancel
 * @param orderType type of token being sold in the order (ERC721 or ERC1155)
 * @returns a function to cancel an order that returns a transaction receipt if successful
 */
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
