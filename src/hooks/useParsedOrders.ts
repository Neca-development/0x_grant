import type { SearchOrdersParams } from '@traderxyz/nft-swap-sdk/dist/sdk/v4/orderbook'
import { useContext, useEffect, useState } from 'react'

import type { IOrder } from '../models/interfaces'
import { SwapSdkContext } from '../providers/swapSdkProvider'
import { getOrderMetadata } from '../utils/getOrderMetadata'
import { useOrders } from '../sdk-hooks/useOrders'

export function useParsedOrders(searchParams?: Partial<SearchOrdersParams>) {
  const { signer } = useContext(SwapSdkContext)

  const [rawOrders] = useOrders(searchParams)
  const [orders, setOrders] = useState<IOrder[]>()

  useEffect(() => {
    async function fetchOrders() {
      if (!rawOrders) return
      if (!signer) return

      try {
        const ordersMetadataPromises = rawOrders.map((order) =>
          getOrderMetadata(signer, order)
        )
        const ordersMetadata = await Promise.all(ordersMetadataPromises)

        setOrders(ordersMetadata)
      } catch (error: any) {
        console.error(`Unable to load orders:\n${error.message}`)
        setOrders(undefined)
      }
    }
    fetchOrders()
  }, [rawOrders, signer])

  return orders
}
