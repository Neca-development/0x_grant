import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract, ethers, utils } from "ethers";
import { useEffect, useState } from "react";
import NftCard from "../components/NftCard";
import { defaultNftContractABI, nft2nftABI } from "../constants/abi";
import ExecuterContractMethods from "../libs/nft2nft";
import { IOrder } from "../models/interfaces";

const nft2nft = new ExecuterContractMethods(
  "0x0D28de6586042efDa26Befd0d5B6627Ff59e1d45",
  "b28eca2ff9c249461cdfd738023b838d9282f7ec6b2564394f2633e112c547b2",
  nft2nftABI,
  "https://rinkeby.infura.io/v3/522b462c9a1d45fb9b3b18b5fda51c05"
);

function FreeNft() {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    (async () => {
      const data = await nft2nft.getOrders();
      const ordersResp: IOrder[] = [];

      for await (const order of data) {
        console.log(order);

        const id = order.offerItem.tokenId.toNumber();
        const abi = new utils.Interface(defaultNftContractABI);
        const signer = new ethers.Wallet(
          "b28eca2ff9c249461cdfd738023b838d9282f7ec6b2564394f2633e112c547b2",
          new JsonRpcProvider(
            "https://rinkeby.infura.io/v3/522b462c9a1d45fb9b3b18b5fda51c05"
          )
        );
        const contract = new Contract(order.offerItem.collection, abi, signer);
        const offerContract = new Contract(order.considCollection, abi, signer);

        const collectionName = await contract.name();
        const tokenSymbol = await offerContract.symbol();

        const { image } = await fetch("https://burnking.io/api/meta/6").then(
          (res) => res.json()
        );

        ordersResp.push({
          id,
          collectionName,
          image,
          collectionAddress: order.offerItem.collection,
          tokenSymbol,
        });
      }

      console.log(ordersResp);

      setOrders(ordersResp);
    })();
  }, []);

  return (
    <div className="container mx-auto pt-12 bg-white">
      <h1 className="text-center my-20 font-semibold text-6xl w-3/4 mx-auto leading-snug">
        Get free NFT
      </h1>
      <div className="flex justify-around">
        {orders.map((order) => (
          <NftCard
            key={order.id + order.collectionAddress}
            data={order}
          ></NftCard>
        ))}
      </div>
    </div>
  );
}

export default FreeNft;
