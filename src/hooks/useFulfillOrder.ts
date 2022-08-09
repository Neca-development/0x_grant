import type { SwappableAssetV4 } from '@traderxyz/nft-swap-sdk'
import type { PostOrderResponsePayload } from '@traderxyz/nft-swap-sdk/dist/sdk/v4/orderbook'
import { useContext } from 'react'

import { SwapSdkContext } from '../providers/swapSdkProvider'

export function useFulfillOrder(
  order: PostOrderResponsePayload | undefined,
  takerAddress: string | undefined
) {
  const { nftSwap } = useContext(SwapSdkContext)

  const fulfillOrder = async () => {
    if (!nftSwap) return
    if (!order) return
    if (!takerAddress) return

    let takerAsset: SwappableAssetV4 | null = null

    switch (order.nftType) {
      case 'ERC20':
        takerAsset = {
          tokenAddress: order.erc20Token,
          amount: order.erc20TokenAmount,
          type: 'ERC20',
        }
        break
      case 'ERC721':
        takerAsset = {
          tokenAddress: order.nftToken,
          tokenId: order.nftTokenId,
          type: 'ERC721',
        }
        break
      case 'ERC1155':
        takerAsset = {
          tokenAddress: order.nftToken,
          tokenId: order.nftTokenId,
          amount: order.erc20TokenAmount,
          type: 'ERC1155',
        }
        break
      default:
        takerAsset = null
        break
    }

    if (!takerAsset) return

    const approvalStatus = await nftSwap.loadApprovalStatus(takerAsset, takerAddress)
    if (!approvalStatus.contractApproved) {
      const approvalTx = await nftSwap.approveTokenOrNftByAsset(takerAsset, takerAddress)
      await approvalTx.wait()
    }

    const fillTx = await nftSwap.fillSignedOrder(order.order)
    const fillTxReceipt = await fillTx.wait()

    return fillTxReceipt
  }

  return fulfillOrder
}
