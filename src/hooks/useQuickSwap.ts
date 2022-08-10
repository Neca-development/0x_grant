import type {
  Fee,
  SignedNftOrderV4Serialized,
  SwappableAssetV4,
} from '@traderxyz/nft-swap-sdk'
import { useContext } from 'react'

import { SwapSdkContext } from '../providers/swapSdkProvider'
import { useCreateOrder } from './useCreateOrder'

export function useQuickSwap(
  makerAsset: SwappableAssetV4,
  takerAsset: SwappableAssetV4,
  makerAddress: string | undefined,
  chainId: number | string,
  metadata?: Record<string, string>,
  fees?: Fee[]
) {
  const { nftSwap } = useContext(SwapSdkContext)
  const createOrder = useCreateOrder(
    makerAsset,
    takerAsset,
    makerAddress,
    chainId,
    metadata,
    fees
  )

  const quickSwap = async () => {
    if (!nftSwap) return

    const newOrder = await createOrder()
    if (!newOrder) return

    try {
      let matchingOrder: SignedNftOrderV4Serialized | null = null

      if (makerAsset.type !== 'ERC20') {
        const ordersData = await nftSwap.getOrders({
          nftToken: makerAsset.tokenAddress,
          nftTokenId: makerAsset.tokenId,
          nftType: makerAsset.type,
        })
        const orderToBuy = ordersData.orders.find((order) => order.sellOrBuyNft === 'buy')
        if (!orderToBuy) return
        matchingOrder = orderToBuy.order
        const matchTx = await nftSwap.matchOrders(newOrder, matchingOrder)
        await matchTx.wait()
      }

      if (makerAsset.type === 'ERC20' && takerAsset.type !== 'ERC20') {
        const ordersData = await nftSwap.getOrders({
          nftToken: takerAsset.tokenAddress,
          nftTokenId: takerAsset.tokenId,
          nftType: takerAsset.type,
        })
        const orderToBuy = ordersData.orders.find(
          (order) => order.sellOrBuyNft === 'sell'
        )
        if (!orderToBuy) return
        matchingOrder = orderToBuy.order
        const matchTx = await nftSwap.matchOrders(matchingOrder, newOrder)
        await matchTx.wait()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return quickSwap
}
