import { NftSwapV4, SwappableAssetV4, NftSwapV3, UserFacingERC721AssetDataSerializedV4, UserFacingERC20AssetDataSerializedV4, NftSwap} from '@traderxyz/nft-swap-sdk';
import { ethers, getDefaultProvider } from 'ethers';
import Web3Modal from "web3modal";


export async function createSwapOrder(){

    // Connect wallet

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signerUserA = provider.getSigner();
    console.log("Account A:", await signerUserA.getAddress());

     // Setup the sample data...
      const CHAIN_ID = 4; // Chain 80001 corresponds to Mumbai. Visit https://chainid.network/ for a complete list of chain ids
      
      const UNISTORY_ADDRESS = "0xa2Ef81DE73Ee4a11a5Ff0C89A9c1C66d88EEe4AE"

      const UNISTORY_NFT:UserFacingERC721AssetDataSerializedV4 = {
        tokenAddress: UNISTORY_ADDRESS, // UNISTORY contract address
        tokenId:'1', 
        type: "ERC721",
     };
 

      const ERC20_ADDRESS  = "0xD92E713d051C37EbB2561803a3b5FBAbc4962431";

      const TEN_TUSDT:UserFacingERC20AssetDataSerializedV4  = {
          tokenAddress: ERC20_ADDRESS, // NinjaBear contract address
          amount: '10', 
          type: 'ERC20', // Must be one of 'ERC20', 'ERC721', or 'ERC1155'
      };

      // User A Trade Data
    const walletAddressUserA = await signerUserA.getAddress();

   const nftSwapSdk = new NftSwapV4(provider, signerUserA, 4);

// Check if we need to approve the NFT for swapping
   const approvalStatusForUserA = await nftSwapSdk.loadApprovalStatus(
     UNISTORY_NFT,
     walletAddressUserA
   );

// If we do need to approve User A's CryptoPunk for swapping, let's do that now
if (!approvalStatusForUserA.contractApproved) {
  const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
    UNISTORY_NFT,
    walletAddressUserA
  );
  const approvalTxReceipt = await approvalTx.wait();
  console.log('====================================');
  console.log('approved', approvalTxReceipt);
  console.log('====================================');

}

// Create the order (Remember, User A initiates the trade, so User A creates the order)
const order = nftSwapSdk.buildOrder(
  UNISTORY_NFT,
  TEN_TUSDT,
  walletAddressUserA
);

// Sign the order (User A signs since they are initiating the trade)
const signedOrder = await nftSwapSdk.signOrder(order);

alert("Order created")

console.log('====================================');
console.log('SIGNED ORDER', signedOrder);
console.log('====================================');
}



export async function createNFTtoNFTOrder(){
    console.log('NFTtoNFTSwap');

    // Connect wallet

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signerUserA = provider.getSigner();
    console.log("Account A:", await signerUserA.getAddress());

     // Setup the sample data...
      const CHAIN_ID = 4; // Chain 80001 corresponds to Mumbai. Visit https://chainid.network/ for a complete list of chain ids
      
      const UNISTORY_ADDRESS = "0xa2Ef81DE73Ee4a11a5Ff0C89A9c1C66d88EEe4AE"
      const UNISTORY_2_ADDRESS = "0xB19E269B37c0b195571309746c799D5524c58cAc"

      const UNISTORY_NFT_1:UserFacingERC721AssetDataSerializedV4 = {
        tokenAddress: UNISTORY_ADDRESS, // UNISTORY contract address
        tokenId:'1', 
        type: "ERC721",
     };
 

      const UNISTORY_NFT_2:UserFacingERC721AssetDataSerializedV4  = {
          tokenAddress: UNISTORY_2_ADDRESS, // NinjaBear contract address
          tokenId:'2',
          type: 'ERC721', // Must be one of 'ERC20', 'ERC721', or 'ERC1155'
      };


   // User A Trade Data
     const walletAddressUserA = await signerUserA.getAddress();
     const assetsToSwapUserA = [UNISTORY_NFT_1];


     // Initiate the SDK for User A.
     // Pass the user's wallet signer (available via the user's wallet provider) to the Swap SDK
     const nftSwapSdk = new NftSwap(provider, signerUserA, CHAIN_ID);


     // Check if we need to approve the NFT for swapping
     const approvalStatusForUserA = await nftSwapSdk.loadApprovalStatus(
      assetsToSwapUserA[0],
      walletAddressUserA
    );

    // If we do need to approve User A's CryptoPunk for swapping, let's do that now
    if (!approvalStatusForUserA.contractApproved) {
       const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
       assetsToSwapUserA[0],
       walletAddressUserA
    );
    const approvalTxReceipt = await approvalTx.wait();
      console.log(
       `Approved ${assetsToSwapUserA[0].tokenAddress} contract to swap with 0x (txHash: ${approvalTxReceipt.transactionHash})`
     );


     const privateKey = "007255c435e073b94033b10bf89aeb56130566949e87c185b5810670cc7b7bd6";

     const rpcUrl = 'https://eth-rinkeby.alchemyapi.io/v2/rv5p0UkdGZFPJ0ZORF3eb9h7AEBYMXXB';
 
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const signerUserB = new ethers.Wallet(privateKey, provider)

      // User B Trade Data
    const walletAddressUserB = await signerUserB.getAddress();
    const assetsToSwapUserB = [UNISTORY_NFT_2]; 

     // Create the order (Remember, User A initiates the trade, so User A creates the order)
    const order = nftSwapSdk.buildOrder(
     assetsToSwapUserA,
     assetsToSwapUserB,
     walletAddressUserA
    );

    // Sign the order (User A signs since they are initiating the trade)
    const signedOrder = await nftSwapSdk.signOrder(order, walletAddressUserA);

    console.log('====================================');
    console.log('orderSigned', signedOrder);
    console.log('====================================');
 

   // ............................
  // Part 2 of the trade -- User B (the 'taker') accepts and fills order from User A and completes trade
  // ............................
  // Initiate the SDK for User B.
  const nftSwapSdkB = new NftSwap(provider, signerUserB, CHAIN_ID);

   // Check if we need to approve the NFT for swapping
   console.log('loading aprrove Status of userB');
   
   const approvalStatusForUserB = await nftSwapSdkB.loadApprovalStatus(
    assetsToSwapUserB[0],
    walletAddressUserB
   );

  // If we do need to approve NFT for swapping, let's do that now
  if (!approvalStatusForUserB.contractApproved) {
  const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
    assetsToSwapUserB[0],
    walletAddressUserB
  );
  const approvalTxReceipt = await approvalTx.wait();
  console.log(
    `Approved ${assetsToSwapUserB[0].tokenAddress} contract to swap with 0x. TxHash: ${approvalTxReceipt.transactionHash})`
  );
}

// The final step is the taker (User B) submitting the order.
// The taker approves the trade transaction and it will be submitted on the blockchain for settlement.
// Once the transaction is confirmed, the trade will be settled and cannot be reversed.
const fillTx = await nftSwapSdk.fillSignedOrder(signedOrder);
console.log('====================================');
console.log('fillTx', fillTx);
console.log('====================================');
const fillTxReceipt = await nftSwapSdk.awaitTransactionHash(fillTx.hash);
console.log(`🎉 🥳 Order filled. TxHash: ${fillTxReceipt.transactionHash}`);

}








// // Check if we need to approve the NFT for swapping
//    const approvalStatusForUserA = await nftSwapSdk.loadApprovalStatus(
//      UNISTORY_NFT,
//      walletAddressUserA
//    );

// // If we do need to approve User A's CryptoPunk for swapping, let's do that now
// if (!approvalStatusForUserA.contractApproved) {
//   const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
//     UNISTORY_NFT,
//     walletAddressUserA
//   );
//   const approvalTxReceipt = await approvalTx.wait();
//   console.log('====================================');
//   console.log('approved', approvalTxReceipt);
//   console.log('====================================');

}

// Create the order (Remember, User A initiates the trade, so User A creates the order)
// const order = nftSwapSdk.buildOrder(
//   UNISTORY_NFT,
//   TEN_TUSDT,
//   walletAddressUserA
// );

// // Sign the order (User A signs since they are initiating the trade)
// const signedOrder = await nftSwapSdk.signOrder(order);

// alert("Order created")

// console.log('====================================');
// console.log('SIGNED ORDER', signedOrder);
// console.log('====================================');
// }
