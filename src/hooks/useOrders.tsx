import { Contract, ethers, utils } from "ethers";
import { defaultNftContractABI, nft2nftABI } from "../constants/abi";
import { IOrder } from "../models/interfaces";
import { JsonRpcProvider } from "@ethersproject/providers";
import ExecuterContractMethods from "../libs/nft2nft";
import { useEffect, useState } from "react";
import {UNISTORY_MARKETPLACE_ADDRESS} from "../constants/marketPlace";

const nft2nft = new ExecuterContractMethods(
	UNISTORY_MARKETPLACE_ADDRESS,
	"007255c435e073b94033b10bf89aeb56130566949e87c185b5810670cc7b7bd6",
	nft2nftABI,
	"https://hpbnode.com"
);

export default function useOrders() {
	const [orders, setOrders] = useState<IOrder[]>();

	useEffect(() => {
		(async () => {
			const data = await nft2nft.getOrders();
			const ordersResp: IOrder[] = [];

			for await (const order of data) {
				// console.log(order);

				const id = order.offerItem.tokenId.toNumber();
				const abi = new utils.Interface(defaultNftContractABI);
				const signer = new ethers.Wallet(
					"b28eca2ff9c249461cdfd738023b838d9282f7ec6b2564394f2633e112c547b2",
					new JsonRpcProvider("https://hpbnode.com")
				);
				const contract = new Contract(order.offerItem.collection, abi, signer);
				const offerContract = new Contract(order.considCollection, abi, signer);

				const collectionName = await contract.name();
				const tokenSymbol = await offerContract.symbol();
				const tokenURI = await contract.tokenURI(id);
				const { image } = eval(
					"(" + (await fetch(tokenURI).then((res) => res.text())) + ")"
				);

				ordersResp.push({
					id,
					collectionName,
					image,
					collectionAddress: order.offerItem.collection,
					tokenSymbol,
					offerer: order.offerer
				});
			}

			return setOrders(ordersResp);
		})();
	}, []);

	return orders;
}
