import type {
  SignedNftOrderV4,
  UserFacingERC20AssetDataSerializedV4,
} from '@traderxyz/nft-swap-sdk'
import { useContext } from 'react'

import { SwapSdkContext } from '../providers/swapSdkProvider'

/**
 * Get the function to create order from a specific collection
 */
export function useCreateBasedOrder() {
  const { nftSwap } = useContext(SwapSdkContext)

  /**
   * Create an order with any NFT from specific collection maker has and post it in the orderbook if successful
   * @param erc20ToSell ERC20 token address
   * @param erc20Amount ERC20 amount to sell
   * @param nftCollection NFT collection address
   * @param nftType type of NFT to sell (ERC721 or ERC1155)
   * @param makerAddress wallet address of order creator
   * @returns signed order
   */
  const createBasedOrder = async (
    erc20ToSell: string,
    erc20Amount: number | string,
    nftCollection: string,
    nftType: 'ERC721' | 'ERC1155',
    makerAddress: string,
    chainId: number | string,
    metadata?: Record<string, string>
  ): Promise<SignedNftOrderV4 | undefined> => {
    if (!nftSwap) return

    try {
      const erc20Asset: UserFacingERC20AssetDataSerializedV4 = {
        tokenAddress: erc20ToSell,
        type: 'ERC20',
        amount: String(erc20Amount),
      }
      const nftCollectionAsset = {
        tokenAddress: nftCollection,
        type: nftType,
      }

      const collectionBasedOrder = nftSwap.buildCollectionBasedOrder(
        erc20Asset,
        nftCollectionAsset,
        makerAddress
      )

      const signedOrder = await nftSwap.signOrder(collectionBasedOrder)
      await nftSwap.postOrder(signedOrder, chainId, metadata)
      return signedOrder
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  return createBasedOrder
}
