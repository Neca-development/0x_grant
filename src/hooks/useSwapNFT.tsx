import {defaultNftContractABI, nft2nftABI} from "../constants/abi";
import {ethers} from "ethers";
import {useCall, useContractFunction, useEthers} from "@usedapp/core";
import {UNISTORY_MARKETPLACE_ADDRESS} from "../constants/marketPlace";
import {JsonRpcProvider} from "@ethersproject/providers";
import {TypedContract} from "@usedapp/core/dist/cjs/src/model/types";


// const nft2nftContract = new ethers.Contract(UNISTORY_MARKETPLACE_ADDRESS, nft2nftInterface) as any;

// const signer = new ethers.Wallet(
//     "b28eca2ff9c249461cdfd738023b838d9282f7ec6b2564394f2633e112c547b2",
//     new JsonRpcProvider("https://hpbnode.com")
// );

// export function useGetApprove(tokenContractAddress: string) {
//
//     const nftContract = new ethers.Contract(tokenContractAddress, defaultNftABI) as any;
//     const { account } = useEthers();
//
//     let {value, error}: any =
//     useCall({
//         contract: nftContract,
//         method: 'isApprovedForAll',
//         args: [account, UNISTORY_MARKETPLACE_ADDRESS],
//     }) ?? [];
//     return value;
// }
export const useSwapNFT = (library:any) => {
    const nft2nftContract = new ethers.Contract(UNISTORY_MARKETPLACE_ADDRESS, nft2nftABI, library) as any;
    const { state, send } = useContractFunction(nft2nftContract, "makeProposal");
    return { state, send };
}
// export function useGetApprove(tokenContractAddress: string) {
//     const nftContract = new ethers.Contract(tokenContractAddress, defaultNftABI) as any;
//     const { state, send } = useContractFunction(nftContract, "isApprovedForAll");
//     return { state, send };
// // }
// export function useApproveNFT(tokenContractAddress: string) {
//     const nftContract = new ethers.Contract(tokenContractAddress, defaultNftABI) as any;
//     const
//     return ;
// }
export const getApprove =  async (tokenContractAddress?: string, account?: string, library?:any, tokenID?:number) => {
    console.log(tokenContractAddress, account, library)

    if(tokenContractAddress){
        const nftContract = new ethers.Contract(tokenContractAddress, defaultNftContractABI, library)
        const call = await nftContract.getApproved(tokenID)
        console.log(UNISTORY_MARKETPLACE_ADDRESS.toLowerCase() === call.toLowerCase())
        return UNISTORY_MARKETPLACE_ADDRESS.toLowerCase() === call.toLowerCase()
    }
    return false
}
export const useApproveNft = (tokenContractAddress?: string, account?: string, library?:any) => {
    // console.log(tokenContractAddress, account, library)
    // const signer = new ethers.Wallet("b28eca2ff9c249461cdfd738023b838d9282f7ec6b2564394f2633e112c547b2", library)
    // const nftContract = new ethers.Contract(tokenContractAddress, defaultNftContractABI, signer)
    // const tx = await nftContract.setApprovalForAll(UNISTORY_MARKETPLACE_ADDRESS, true, {gasLimit: 2000})
    // const receipt = await tx.wait()
    // console.log(receipt)
    if(tokenContractAddress){
        var nftContract = new ethers.Contract(tokenContractAddress, defaultNftContractABI, library) as any;
    }
    const {state, send} = useContractFunction(nftContract, "approve");
    return {state, send};
//
}