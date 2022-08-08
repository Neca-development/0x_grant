import { useContext, useEffect, useState } from 'react'

import type { IOrder } from '../models/interfaces'
import { SwapSdkContext } from '../providers/swapSdkProvider'
import { getOrderMetadata } from '../utils/getOrderMetadata'

export function useOrders() {
  const { signer, nftSwap } = useContext(SwapSdkContext)

  const [orders, setOrders] = useState<IOrder[]>()

  useEffect(() => {
    async function fetchOrders() {
      if (!signer) return
      if (!nftSwap) return

      try {
        const fetchedOrdersData = await nftSwap.getOrders({
          status: 'open',
        })

        const fetchedOrders = fetchedOrdersData.orders
        const ordersMetadataPromises = fetchedOrders.map((order) =>
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
  }, [signer, nftSwap])

  return orders
}
