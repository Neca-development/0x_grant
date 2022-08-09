import type { Fee, SignedNftOrderV4, SwappableAssetV4 } from '@traderxyz/nft-swap-sdk'
import { useContext } from 'react'

import { SwapSdkContext } from '../providers/swapSdkProvider'

const CHAIN_ID = 3

export function useCreateOrder(
  makerAsset: SwappableAssetV4,
  takerAsset: SwappableAssetV4,
  makerAddress: string | undefined,
  fees?: Fee[]
) {
  const { nftSwap } = useContext(SwapSdkContext)

  const createOrder = async () => {
    if (!nftSwap) return
    if (!makerAddress) return

    const approvalStatus = await nftSwap.loadApprovalStatus(makerAsset, makerAddress)
    if (!approvalStatus.contractApproved) {
      const approvalTx = await nftSwap.approveTokenOrNftByAsset(makerAsset, makerAddress)
      await approvalTx.wait()
    }

    let signedOrder: SignedNftOrderV4 | null = null

    if (makerAsset.type === 'ERC20' && takerAsset.type === 'ERC721') {
      const ercToNftOrder = nftSwap.buildOrder(makerAsset, takerAsset, makerAddress, {
        fees,
      })
      signedOrder = await nftSwap.signOrder(ercToNftOrder)
    }
    if (makerAsset.type === 'ERC721' && takerAsset.type === 'ERC20') {
      const nftToErcOrder = nftSwap.buildOrder(makerAsset, takerAsset, makerAddress, {
        fees,
      })
      signedOrder = await nftSwap.signOrder(nftToErcOrder)
    }
    if (makerAsset.type === 'ERC20' && takerAsset.type === 'ERC1155') {
      const ercToMtOrder = nftSwap.buildOrder(makerAsset, takerAsset, makerAddress, {
        fees,
      })
      signedOrder = await nftSwap.signOrder(ercToMtOrder)
    }
    if (makerAsset.type === 'ERC1155' && takerAsset.type === 'ERC20') {
      const mtToErcOrder = nftSwap.buildOrder(makerAsset, takerAsset, makerAddress, {
        fees,
      })
      signedOrder = await nftSwap.signOrder(mtToErcOrder)
    }

    if (!signedOrder) return

    await nftSwap.postOrder(signedOrder, CHAIN_ID)
    return signedOrder
  }

  return createOrder
}
