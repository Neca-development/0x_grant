import { useCall, useContractFunction } from "@usedapp/core";
import { ethers } from "ethers";
import { defaultNftContractABI } from "../constants/abi";
import { UNICAddress, UNISAddress } from "../constants/nfts";
import { Contract } from "@ethersproject/contracts/";

const nftContractInterface = new ethers.utils.Interface(defaultNftContractABI);
const UNISnftContract = new Contract(UNISAddress, nftContractInterface) as any;
const UNICnftContract = new Contract(UNICAddress, nftContractInterface) as any;


  export function useBuyUNIC() {
    const { state, send } = useContractFunction(UNICnftContract, "mint");
    return { state, send };
  }
  

  export function useBuyUNIS() {
    const { state, send } = useContractFunction(UNISnftContract, "mint");
    return { state, send };
  }
  
