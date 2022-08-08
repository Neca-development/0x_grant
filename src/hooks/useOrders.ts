import { NftSwapV4 } from '@traderxyz/nft-swap-sdk'
import { useEthers } from '@usedapp/core'
import { useEffect, useState } from 'react'
import { getOrderMetadata } from 'utils/getOrderMetadata'

import type { IOrder } from '../models/interfaces'

const NETWORK_CHAIN_ID = 4

export function useOrders() {
  const { library, account } = useEthers()

  const [orders, setOrders] = useState<IOrder[]>()

  useEffect(() => {
    if (!library) return
    if (!account) return

    const signer = library.getSigner()
    const swapSdk = new NftSwapV4(library, signer, NETWORK_CHAIN_ID)

    async function fetchOrders() {
      try {
        const fetchedOrdersData = await swapSdk.getOrders({
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
  }, [library, account])

  return orders
}
