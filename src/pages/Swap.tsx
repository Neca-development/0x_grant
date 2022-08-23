import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  SearchOrdersParams,
  PostOrderResponsePayload,
} from '@traderxyz/nft-swap-sdk/dist/sdk/v4/orderbook'
import { useWallet } from '../sdk-hooks/useWallet'
import { useFulfillOrder } from '../sdk-hooks/useFulfillOrder'
import { SwapSdkContext } from '../providers/swapSdkProvider'
import { NFT_COLLECTION } from '../constants/collection'
import { useOrders } from '../sdk-hooks/useOrders'
import swap from '../assets/icons/swap.svg'
import unistoryLogo from '../assets/icons/unistory_logo.svg'
import type { IOrder } from '../models/interfaces'

interface IOrderOverview {
  order: IOrder
}

const OrderOverview = (props: IOrderOverview) => {
  const { order } = props
  const { id, collectionName, image, collectionAddress } = order
  return (
    <div className="flex">
      <div className="aspect-square w-3/5 relative bg-gray-500 mr-6">
        {image ? (
          <img src={image} alt="" />
        ) : (
          <img
            className="absolute inset-1/2 translate-y-center translate-x-center"
            src={unistoryLogo}
            alt=""
            width="38"
            height="38"
          />
        )}
      </div>
      <div>
        <div className="font-semibold text-gray-500 text-md mb-2">{collectionName}</div>
        <div className="font-medium text-gray-500 text-2xl mb-6">#{id}</div>
        <div className="font-semibold text-gray-500 text-md">Smart contract</div>
        <div className="font-semibold text-gray-500 text-md">
          {`${collectionAddress.substring(0, 4)}...${collectionAddress.substring(
            collectionAddress.length - 6,
            collectionAddress.length
          )}`}
        </div>
      </div>
    </div>
  )
}

const Swap = () => {
  const location = useLocation()

  let state = location.state as IOrder
  state = {
    id: state.id,
    collectionAddress: state.collectionAddress.toLowerCase(),
    image: state.image,
    collectionName: state.collectionName,
    tokenSymbol: state.tokenSymbol,
    offerer: state.offerer,
    nonce: state.nonce,
  }

  const { account } = useWallet()

  const fulfillOrder = useFulfillOrder()

  const searchParams: Partial<SearchOrdersParams> = {
    nonce: state.nonce,
  }

  const [orders] = useOrders(searchParams)
  const [selectedOrder, setSelectedOrder] = useState<PostOrderResponsePayload>()

  useEffect(() => {
    if (!orders) return

    const firstOrder = orders[0]
    if (!firstOrder) return

    setSelectedOrder(firstOrder)
  }, [orders])

  const handleFulfillOrder = async () => {
    await fulfillOrder(selectedOrder, account)
  }

  const { nftSwap } = useContext(SwapSdkContext)
  const [rawOrdersToBuy] = useOrders({
    nftToken: NFT_COLLECTION,
  })

  const batchBuyNfts = async () => {
    if (!nftSwap) return
    if (!rawOrdersToBuy) return

    if (!rawOrdersToBuy[0]) return
    if (!rawOrdersToBuy[1]) return
    if (!rawOrdersToBuy[2]) return

    const ordersToBuy = [
      rawOrdersToBuy[0].order,
      rawOrdersToBuy[1].order,
      rawOrdersToBuy[2].order,
    ]
    console.log(ordersToBuy)

    await nftSwap.batchBuyNfts(ordersToBuy, true)
  }

  return (
    <div className="container mx-auto pt-12">
      <h1 className="font-semibold text-4xl">Swap</h1>

      <div className="flex mt-12">
        <div className="flex-1">
          <h2 className="font-semibold text-2xl mb-9">You will get</h2>
          <OrderOverview order={state} />
        </div>

        <div className="w-25 h-full flex flex-col items-center ">
          <div className="w-16 h-16 mx-24 mt-52">
            <img src={swap} alt="" />
          </div>

          {selectedOrder && (
            <button
              className="font-semibold text-white text-md w-5/12 h-[42px] rounded-xl mt-28 bg-[#1275D3]"
              onClick={handleFulfillOrder}
            >
              Fulfill order
            </button>
          )}

          <button
            className="font-semibold text-white text-md w-5/12 h-[42px] rounded-xl mt-28 bg-[#1275D3]"
            onClick={batchBuyNfts}
          >
            Batch buy
          </button>
        </div>

        <div className="flex-1">
          <h2 className="font-semibold text-2xl mb-9">For</h2>
          {selectedOrder && (
            <div className="flex">
              <div className="aspect-square w-3/5 relative bg-gray-500 mr-6">
                <h3 className="absolute inset-1/2 font-semibold text-2xl text-white">
                  {selectedOrder.order.erc20TokenAmount} ETH
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Swap
