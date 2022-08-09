import type { SignedNftOrderV4, SwappableAssetV4 } from '@traderxyz/nft-swap-sdk'
import { useContext } from 'react'

import { SwapSdkContext } from '../providers/swapSdkProvider'

export function useFulfillOrder(
  signedOrder: SignedNftOrderV4,
  takerAsset: SwappableAssetV4,
  takerAddress: string
) {
  const { nftSwap } = useContext(SwapSdkContext)

  const fulfillOrder = async () => {
    if (!nftSwap) return

    const approvalStatus = await nftSwap.loadApprovalStatus(takerAsset, takerAddress)
    if (!approvalStatus.contractApproved) {
      const approvalTx = await nftSwap.approveTokenOrNftByAsset(takerAsset, takerAddress)
      await approvalTx.wait()
    }

    const fillTx = await nftSwap.fillSignedOrder(signedOrder)
    const fillTxReceipt = await nftSwap.awaitTransactionHash(String(fillTx))

    return fillTxReceipt
  }

  return fulfillOrder
}
