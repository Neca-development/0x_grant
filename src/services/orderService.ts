import { UserFacingERC721AssetDataSerialized, SwappableAsset, NftSwap, UserFacingERC20AssetDataSerialized, NftSwapV4 } from "@traderxyz/nft-swap-sdk";
// import axios from "axios";




export async function createNftToNftOrder(
   swapInNft:UserFacingERC721AssetDataSerialized,
   swapOutNft:UserFacingERC721AssetDataSerialized,
   provider:any,
   account:string,
   ){

    console.log('startCreation');
    
const CHAIN_ID = 4; // Chain 1 corresponds to Mainnet. Visit https://chainid.network/ for a complete list of chain ids

const UNISTORY_1:SwappableAsset = {
  tokenAddress: swapOutNft.tokenAddress, // CryptoPunk contract address
  tokenId: swapOutNft.tokenId, // Token Id of the CryptoPunk we want to swap
  type: swapOutNft.type, // Must be one of 'ERC20', 'ERC721', or 'ERC1155'
};

const UNISTORY_SECOND_2:SwappableAsset = {
  tokenAddress: swapInNft.tokenAddress, // BAYC contract address
  tokenId: swapInNft.tokenId, // Token Id of the BoredApe we want to swap
  type: swapInNft.type,
};

// User A Trade Data
const walletAddressUserA = account;
const assetsToSwapUserA = [UNISTORY_1];

// User B Trade Data
// const walletAddressUserB = '0x44beA2b43600eE240AB6Cb90696048CeF32aBf1D';
const assetsToSwapUserB = [UNISTORY_SECOND_2];


if(provider && walletAddressUserA){


const nftSwapSdk = new NftSwap(provider, provider.getSigner(), CHAIN_ID);
// Initiate the SDK for User A.
// Pass the user's wallet signer (available via the user's wallet provider) to the Swap SDK

// Check if we need to approve the NFT for swapping
const approvalStatusForUserA = await nftSwapSdk.loadApprovalStatus(
  // @ts-ignore
  assetsToSwapUserA[0],
  walletAddressUserA
);

// If we do need to approve User A's CryptoPunk for swapping, let's do that now
if (!approvalStatusForUserA.contractApproved) {
  const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
    // @ts-ignore
    assetsToSwapUserA[0],
    account
  );
  const approvalTxReceipt = await approvalTx.wait();
  console.log(
    `Approved ${assetsToSwapUserA[0]?.tokenAddress} contract to swap with 0x (txHash: ${approvalTxReceipt.transactionHash})`
  );
 }

 // Create the order (Remember, User A initiates the trade, so User A creates the order)
const order = nftSwapSdk.buildOrder(
  assetsToSwapUserA,
  assetsToSwapUserB,
  walletAddressUserA
);
console.log('orderBuit');

   // Sign the order (User A signs since they are initiating the trade)
   const signedOrder = await nftSwapSdk.signOrder(order, account);
   // Part 1 Complete. User A is now done. Now we send the `signedOrder` to User B to complete the trade.
   console.log('order signed', signedOrder);

   const res = await fetch('https://api.trader.xyz/orderbook/order',
    {   method: "POST", 
        headers: new Headers({
            'Accept': 'application/json',
            'credentials':'omit',
            'Access-Control-Allow-Origin':'http://localhost:3000/',
            'Content-Type': 'application/json',
            'mode':'no-cors'
        }),
        body:JSON.stringify({chainId:4, order:signedOrder}),
        credentials:"omit"
        
})


  //  const response = await axios({method:'post', url:'https://api.trader.xyz/orderbook/order', data:{}})

   console.log('orderPosted', res);
   

    }

}

export async function createNftToERCOrder(
  swapInERC20:UserFacingERC20AssetDataSerialized,
  swapOutNft:UserFacingERC721AssetDataSerialized,
  provider:any,
  account:string,
  ){

   console.log('startCreation');
   
const CHAIN_ID = 4; // Chain 1 corresponds to Mainnet. Visit https://chainid.network/ for a complete list of chain ids

const UNISTORY_1:SwappableAsset = {
 tokenAddress: "0xa2Ef81DE73Ee4a11a5Ff0C89A9c1C66d88EEe4AE", // CryptoPunk contract address
 tokenId: "1", // Token Id of the CryptoPunk we want to swap
 type: "ERC721" // Must be one of 'ERC20', 'ERC721', or 'ERC1155'
};

const TEN_USDC:UserFacingERC20AssetDataSerialized = {
 tokenAddress: "0xd92e713d051c37ebb2561803a3b5fbabc4962431", // BAYC contract address
 amount:"100",
 type: "ERC20",
};

// User A Trade Data
const walletAddressUserA = account;
const assetsToSwapUserA = UNISTORY_1;

// User B Trade Data
// const walletAddressUserB = '0x44beA2b43600eE240AB6Cb90696048CeF32aBf1D';
const assetsToSwapUserB = TEN_USDC;
// const walletAddressUserB = "0xce26cE7b50c23268e7a45988c70086a86ddA1f37";


if(provider && walletAddressUserA){


const nftSwapSdk = new NftSwapV4(provider, provider.getSigner(), CHAIN_ID);
// Initiate the SDK for User A.
// Pass the user's wallet signer (available via the user's wallet provider) to the Swap SDK

// Check if we need to approve the NFT for swapping
const approvalStatusForUserA = await nftSwapSdk.loadApprovalStatus(
 // @ts-ignore
 assetsToSwapUserA,
 walletAddressUserA
);

// If we do need to approve User A's CryptoPunk for swapping, let's do that now
if (!approvalStatusForUserA.contractApproved) {
 const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
   // @ts-ignore
   assetsToSwapUserA,
   account
 );
 const approvalTxReceipt = await approvalTx.wait();
 console.log(
   `Approved ${assetsToSwapUserA?.tokenAddress} contract to swap with 0x (txHash: ${approvalTxReceipt.transactionHash})`
 );
}

// Create the order (Remember, User A initiates the trade, so User A creates the order)
const order = nftSwapSdk.buildOrder(
 assetsToSwapUserA,
 assetsToSwapUserB,
 walletAddressUserA
);
console.log('orderBuit', order);

  // Sign the order (User A signs since they are initiating the trade)
  const signedOrder = await nftSwapSdk.signOrder(order);
  // Part 1 Complete. User A is now done. Now we send the `signedOrder` to User B to complete the trade.
  console.log('order signed', signedOrder);
  
  await nftSwapSdk.postOrder(signedOrder, '4');
  
  console.log('====================================');
  console.log('POSTED');
  console.log('====================================');

  

   }

}



 