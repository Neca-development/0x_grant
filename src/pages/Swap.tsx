import type { UserFacingERC20AssetDataSerializedV4 } from '@traderxyz/nft-swap-sdk'
import type { PostOrderResponsePayload } from '@traderxyz/nft-swap-sdk/dist/sdk/v4/orderbook'
import { useEthers } from '@usedapp/core'
import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import swap from '../assets/icons/swap.svg'
import unistoryLogo from '../assets/icons/unistory_logo.svg'
import type { IOrder } from '../models/interfaces'
import { SwapSdkContext } from '../providers/swapSdkProvider'

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
  }

  const { nftSwap } = useContext(SwapSdkContext)
  const { account } = useEthers()

  const [selectedOrder, setSelectedOrder] = useState<PostOrderResponsePayload>()

  useEffect(() => {
    async function fetchSelectedOrder() {
      if (!nftSwap) return

      try {
        const order = await nftSwap.getOrders({
          nftToken: state.collectionAddress,
          nftTokenId: String(state.id),
        })
        setSelectedOrder(order.orders[0])
      } catch (error) {
        console.error(error)
      }
    }
    fetchSelectedOrder()
  }, [nftSwap])

  const fulfillOrder = async () => {
    if (!nftSwap) return
    if (!selectedOrder) return
    if (!account) return

    const takerAsset: UserFacingERC20AssetDataSerializedV4 = {
      tokenAddress: selectedOrder.erc20Token,
      amount: selectedOrder.erc20TokenAmount,
      type: 'ERC20',
    }

    const approvalStatus = await nftSwap.loadApprovalStatus(takerAsset, account)

    if (!approvalStatus.contractApproved) {
      const approvalTx = await nftSwap.approveTokenOrNftByAsset(takerAsset, account)
      await approvalTx.wait()
    }

    const fillTx = await nftSwap.fillSignedOrder(selectedOrder.order)
    await fillTx.wait()
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
              onClick={fulfillOrder}
            >
              Fulfill order
            </button>
          )}
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
