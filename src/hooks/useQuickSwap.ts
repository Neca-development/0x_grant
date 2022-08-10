import type {
  Fee,
  SignedNftOrderV4Serialized,
  SwappableAssetV4,
} from '@traderxyz/nft-swap-sdk'
import { ContractReceipt } from 'ethers'
import { useContext } from 'react'

import { SwapSdkContext } from '../providers/swapSdkProvider'
import { useCreateOrder } from './useCreateOrder'

/**
 * Get the quick swap function for the passed configuration
 * @param makerAsset an asset (ERC20, ERC721, or ERC1155) the user has
 * @param takerAsset an asset (ERC20, ERC721, or ERC1155) the user wants
 * @param makerAddress wallet address of user who creates the order
 * @param chainId id of the chain in which the transaction will be performed
 * @param metadata an optional record object that will be stored with the order in the orderbook
 * @param fees optional array that contents config for fee and royalties
 * @returns a function to create a new order, look up an existing matching order, and execute the transaction
 */
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

  const quickSwap = async (): Promise<ContractReceipt | undefined> => {
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
        const matchTxReceipt = await matchTx.wait()
        return matchTxReceipt
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
        const matchTxReceipt = await matchTx.wait()
        return matchTxReceipt
      }

      return undefined
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  return quickSwap
}
