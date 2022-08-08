/* eslint-disable no-eval */

import type { JsonRpcSigner } from '@ethersproject/providers'
import type { PostOrderResponsePayload } from '@traderxyz/nft-swap-sdk/dist/sdk/v4/orderbook'
import { defaultNftContractABI } from 'constants/abi'
import { Contract, utils } from 'ethers'
import type { IOrder } from 'models/interfaces'

export async function getOrderMetadata(
  signer: JsonRpcSigner,
  order: PostOrderResponsePayload
): Promise<IOrder> {
  const id = Number(order.nftTokenId)
  const abi = new utils.Interface(defaultNftContractABI)
  const collectionAddress = order.nftToken
  const contract = new Contract(collectionAddress, abi, signer)

  const collectionName = await contract.name()
  const tokenSymbol = await contract.symbol()
  const tokenURI = await contract.tokenURI(id)
  const { image } = eval(`(${await fetch(tokenURI).then((res) => res.text())})`)
  const offerer = order.order.maker

  return { id, collectionName, image, collectionAddress, tokenSymbol, offerer }
}
