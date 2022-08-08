import {useContractFunction, useEthers} from "@usedapp/core";
import { Contract, utils } from "ethers";
import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import TokenCard from "../components/TokenCard";
import { defaultNftContractABI, nft2nftABI } from "../constants/abi";
import useUserTokens from "../hooks/useUserNFTS";
import { IToken } from "../models/interfaces";
import {UNISTORY_MARKETPLACE_ADDRESS} from "../constants/marketPlace";
import {getApprove, useApproveNft} from "../hooks/useSwapNFT";

function CreateOrder() {
	const [tokenForSwap, setTokenForSwap] = useState<IToken>();
	const [considCollection, setConsidCollection] = useState("");
	const [nftContract, setNftContract] = useState();
	const [approved, setApproved] = useState(false)
	const userTokens = useUserTokens();
	const {account, library} = useEthers()

	const wethInterface = new utils.Interface(nft2nftABI);
	const contract = new Contract(UNISTORY_MARKETPLACE_ADDRESS, wethInterface) as any;
	const { state, send } = useContractFunction(contract, "createOrder");

	const { state: approveState, send: approveSend } = useApproveNft(tokenForSwap?.contractAddress, account, library)
	
	useEffect(()=>{
		(async ()=>{
			const appr = await getApprove(tokenForSwap?.contractAddress, account, library, tokenForSwap?.tokenId)
			console.log(approved)
			console.log(appr)
			setApproved(!appr)
			console.log(approved)
		})()


	}, [tokenForSwap])
	const isTokenSelected = useCallback(
		(token: IToken) => {
			if (
				// @ts-ignore
				tokenForSwap &&
				tokenForSwap?.tokenId + tokenForSwap.contractAddress ===
					token.tokenId + token.contractAddress
			)
				return "border-blue";

			return "";
		},
		[tokenForSwap]
	);

	const createOrder = async () => {
		if (approved) {
			await approveSend(UNISTORY_MARKETPLACE_ADDRESS, tokenForSwap?.tokenId)
		}
			const offerItem = {
				collection: tokenForSwap?.contractAddress,
				tokenId: tokenForSwap?.tokenId,
			};
			await send(offerItem, considCollection.toLowerCase());
		}

		// approveSend(tokenForSwap.contractAddress, tokenForSwap.tokenId);



	useEffect(() => {
		if (tokenForSwap) {
			const contract = new Contract(
				tokenForSwap?.contractAddress,
				defaultNftContractABI
			) as any;
			setNftContract(contract);
		}
	}, [tokenForSwap]);

	useEffect(() => {
		console.log(approveState.status);
	}, [approveState]);

	return (
		<div className="container mx-auto pt-12">
			<h1 className="font-semibold text-4xl">Create order</h1>
			<h2 className="font-semibold text-2xl mt-12">
				Choose NFT to order creation
			</h2>
			{!userTokens && (
				<div className="my-20">
					<Spinner></Spinner>
				</div>
			)}
			<div className="grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl gap-4 mt-10">
				{userTokens?.map((token) => (
					<TokenCard
						key={token.tokenId + token.contractAddress}
						data={token}
						onClick={() => setTokenForSwap(token)}
						externalClasses={[isTokenSelected(token)]}
					></TokenCard>
				))}
			</div>
			<h2 className="font-semibold text-2xl mt-12">Swap to</h2>
			<input
				type="text"
				placeholder="Enter collection smart-contract adress"
				className="rounded border border-black py-3 px-4 text-gray-600 font-semibold mt-8 w-1/3"
				onChange={(e) => setConsidCollection(e.currentTarget.value)}
			/>
			<br />
			<Button
				text="Create order"
				externalClasses={["bg-blue mt-12"]}
				onClick={() => createOrder()}
			></Button>
		</div>
	);
}

export default CreateOrder;
