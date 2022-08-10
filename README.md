# NFT2NFT

----

## About

This project has been built as a “training platform” for React hook library wrapper around NFT Swap SDK.

At the moment, this application uses 9 methods (they are already wrapped to React hooks) of NFTSwapSDK:

- getOrders
- loadApprovalStatus
- approveTokenOrNFTByAsset
- buildOrder
- signOrder
- postOrder
- fillSignedOrder
- cancelOrder
- matchOrders
- in progress…

In the process of development, we will implement all the remaining (relevant for integration) methods. After that, we will propose other React hooks that could be added.

## What NFT2NFT provides

Using this platform, the user can:

- Create an offer to exchange one NFT for fungible tokens (ERC-20/ETH/or native token if not on mainnet) or for another NFT (should be different token standard)
- Create a fast offer to exchange one NFT to ERC-20 token
- Offer an exchange option
- Exchange to an offered option

### Create an offer to exchange one NFT for fungible tokens (ERC-20/ETH/or native toke if not on mainnet) or for another NFT (should be different token standard)

1. User chooses one of his NFT which he wants to exchange
2. Selects from which collection he wants an NFT. He can do this by using the suggested collections in the dropdown, or by inserting contract address into the input
3. Creates an order

### Create a fast offer to exchange one NFT to ERC-20 token

1. User chooses one of his NFT which he wants to exchange
2. Selects from which collection he wants an NFT. He can do this by using the suggested collections in the dropdown, or by inserting contract address into the input
3. Find a match and execute the transaction

If there is no match, the order is deleted

### Suggest an exchange option

1. The user chooses the order he likes
2. Selects the NFT of the collection that the order creator wants from his wallet
3. Creates an order

### Trade for the offered option

1. The order creator sees all offers
2. Accepts the one he likes
3. The NFT is exchanged

### The user can also

1. Cancel Order
2. See all Orders
3. See all his Orders
