import type {
  ApprovalOverrides,
  FillOrderOverrides,
  SwappableAssetV4,
} from '@traderxyz/nft-swap-sdk'
import {
  PayableOverrides,
  TransactionOverrides,
} from '@traderxyz/nft-swap-sdk/dist/sdk/common/types'
import type { PostOrderResponsePayload } from '@traderxyz/nft-swap-sdk/dist/sdk/v4/orderbook'
import { useContext } from 'react'

import { SwapSdkContext } from '../providers/swapSdkProvider'

/**
 * Get the order fulfillment function for the passed configuration
 * @param order order to fulfill
 * @param takerAddress buyer wallet address
 * @param approvalOverrides optional config for approval status load
 * @param approvalTransactionOverrides optional config for transaction approve
 * @param fillOrderOverrides optional config for order fulfillment
 * @param transactionOverrides optional config for swap transaction
 * @returns function to fulfill the order
 */
export function useFulfillOrder(
  order: PostOrderResponsePayload | undefined,
  takerAddress: string | undefined,
  approvalOverrides?: Partial<ApprovalOverrides>,
  approvalTransactionOverrides?: Partial<TransactionOverrides>,
  fillOrderOverrides?: Partial<FillOrderOverrides>,
  transactionOverrides?: Partial<PayableOverrides>
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

    const approvalStatus = await nftSwap.loadApprovalStatus(
      takerAsset,
      takerAddress,
      approvalOverrides
    )
    if (!approvalStatus.contractApproved) {
      const approvalTx = await nftSwap.approveTokenOrNftByAsset(
        takerAsset,
        takerAddress,
        approvalTransactionOverrides
      )
      await approvalTx.wait()
    }

    const fillTx = await nftSwap.fillSignedOrder(
      order.order,
      fillOrderOverrides,
      transactionOverrides
    )
    const fillTxReceipt = await fillTx.wait()

    return fillTxReceipt
  }

  return fulfillOrder
}
