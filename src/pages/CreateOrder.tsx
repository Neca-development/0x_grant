import type { SwappableAsset } from '@traderxyz/nft-swap-sdk'
import { useEthers } from '@usedapp/core'
import { useState } from 'react'
import { useCreateOrder } from '../hooks/useCreateOrder'
import Button from '../components/Button'

const INITIAL_FORM_STATE = {
  makerTokenAddress: '',
  makerTokenId: '',
  takerTokenAddress: '',
  takerTokenAmount: '',
}

function CreateOrder() {
  const { account } = useEthers()

  const [form, setForm] = useState(INITIAL_FORM_STATE)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const makerAsset: SwappableAsset = {
    tokenAddress: form.makerTokenAddress,
    tokenId: form.makerTokenId,
    type: 'ERC721',
  }

  const takerAsset: SwappableAsset = {
    tokenAddress: form.takerTokenAddress,
    amount: form.takerTokenAmount,
    type: 'ERC20',
  }

  const createOrder = useCreateOrder(makerAsset, takerAsset, account)

  return (
    <div className="container mx-auto pt-12">
      <h1 className="font-semibold text-4xl">Create order</h1>
      <h2 className="font-semibold text-2xl mt-12">Choose NFT to order creation</h2>

      <div className="flex flex-col">
        <h2 className="font-semibold text-2xl mt-12">Your NFT for swap</h2>
        <input
          name="makerTokenAddress"
          type="text"
          placeholder="Enter collection smart-contract adress"
          className="rounded border border-black py-3 px-4 text-gray-600 font-semibold mt-8 w-1/3"
          value={form.makerTokenAddress}
          onChange={handleInput}
        />
        <input
          name="makerTokenId"
          type="text"
          placeholder="Enter token ID"
          className="rounded border border-black py-3 px-4 text-gray-600 font-semibold mt-8 w-1/3"
          value={form.makerTokenId}
          onChange={handleInput}
        />
      </div>

      <div className="flex flex-col">
        <h2 className="font-semibold text-2xl mt-12">ERC20 token for swap</h2>
        <input
          name="takerTokenAddress"
          type="text"
          placeholder="Enter collection smart-contract adress"
          className="rounded border border-black py-3 px-4 text-gray-600 font-semibold mt-8 w-1/3"
          value={form.takerTokenAddress}
          onChange={handleInput}
        />
        <input
          name="takerTokenAmount"
          type="text"
          placeholder="Enter token cost"
          className="rounded border border-black py-3 px-4 text-gray-600 font-semibold mt-8 w-1/3"
          value={form.takerTokenAmount}
          onChange={handleInput}
        />
      </div>

      <br />

      <Button
        onClick={createOrder}
        text="Create order"
        externalClasses={['bg-blue mt-12']}
      />
    </div>
  )
}

export default CreateOrder
