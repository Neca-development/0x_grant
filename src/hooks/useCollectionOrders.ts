import type { PostOrderResponsePayload } from '@traderxyz/nft-swap-sdk/dist/sdk/v4/orderbook'
import { useContext, useEffect, useState } from 'react'

import { SwapSdkContext } from '../providers/swapSdkProvider'

export function useCollectionOrders(
  collectionAddress: string,
  tokenId?: number | string
) {
  const { signer, nftSwap } = useContext(SwapSdkContext)

  const [orders, setOrders] = useState<PostOrderResponsePayload[]>()

  const fetchOrders = async (): Promise<void> => {
    if (!signer) return
    if (!nftSwap) return

    try {
      const fetchedOrdersData = await nftSwap.getOrders({
        nftToken: collectionAddress,
        nftTokenId: String(tokenId),
      })
      const fetchedOrders = fetchedOrdersData.orders
      setOrders(fetchedOrders)
    } catch (error: any) {
      console.error(`Unable to load orders:\n${error.message}`)
      setOrders(undefined)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [signer, nftSwap])

  return [orders, fetchOrders] as [
    PostOrderResponsePayload[] | undefined,
    () => Promise<void>
  ]
}
