import { SwappableAsset } from '@traderxyz/nft-swap-sdk'
import { useEthers } from '@usedapp/core'
import { useState } from 'react'
import { createNftToERCOrder } from '../services/orderService'
import Button from '../components/Button'

function CreateOrder() {
  const { account, activateBrowserWallet, library } = useEthers()

  const [nftOutTokenId, setNftOutTokenId] = useState('1')
  const [nftOutCollectionAddress, setNftOutCollectionAddress] = useState('')

  const [tokenInId, setTokenInId] = useState('1')
  const [tokenInAddress, setTokenInAddress] = useState('')
  const createOrderHandler = async () => {
    if (!account) activateBrowserWallet()
    const erc20InInfo: SwappableAsset = {
      tokenAddress: tokenInAddress.toString(),
      amount: tokenInId.toString(),
      type: 'ERC20',
    }

    const nftOutInfo: SwappableAsset = {
      tokenAddress: nftOutCollectionAddress.toString(),
      tokenId: nftOutTokenId.toString(),
      type: 'ERC721',
    }
    if (account) {
      await createNftToERCOrder(erc20InInfo, nftOutInfo, library, account)
    }
  }
  return (
    <div className="container mx-auto pt-12">
      <h1 className="font-semibold text-4xl">Create order</h1>
      <h2 className="font-semibold text-2xl mt-12">Choose NFT to order creation</h2>

      <div className="flex flex-col">
        <h2 className="font-semibold text-2xl mt-12">Your NFT for swap</h2>
        <input
          type="text"
          placeholder="Enter collection smart-contract adress"
          className="rounded border border-black py-3 px-4 text-gray-600 font-semibold mt-8 w-1/3"
          value={nftOutCollectionAddress}
          onChange={(e) => setNftOutCollectionAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter token ID"
          className="rounded border border-black py-3 px-4 text-gray-600 font-semibold mt-8 w-1/3"
          value={nftOutTokenId}
          onChange={(e) => setNftOutTokenId(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <h2 className="font-semibold text-2xl mt-12">ERC20 token for swap</h2>
        <input
          type="text"
          placeholder="Enter collection smart-contract adress"
          className="rounded border border-black py-3 px-4 text-gray-600 font-semibold mt-8 w-1/3"
          value={tokenInAddress}
          onChange={(e) => setTokenInAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter token ID"
          className="rounded border border-black py-3 px-4 text-gray-600 font-semibold mt-8 w-1/3"
          value={tokenInId}
          onChange={(e) => setTokenInId(e.target.value)}
        />
      </div>

      <br />

      <Button
        onClick={createOrderHandler}
        text="Create order"
        externalClasses={['bg-blue mt-12']}
      />
    </div>
  )
}

export default CreateOrder
