import { useEthers } from "@usedapp/core";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import TokenCard from "../components/TokenCard";
import useUserTokens from "../hooks/useUserNFTS";
import { IToken } from "../models/interfaces";

function CreateOrder() {
	let navigate = useNavigate();
	const [tokens, setTokens] = useState<IToken[]>([]);
	const [tokenForSwap, setTokenForSwap] = useState<IToken>();
	const [wantedCollectionAddress, setWantedCollectionAddress] = useState("");
	// const wethInterface = new utils.Interface(WethAbi);
	// const wethContractAddress = "0xA243FEB70BaCF6cD77431269e68135cf470051b4";
	// const contract = new Contract(wethContractAddress, wethInterface);
	const { account } = useEthers();

	const getUserTokens = useUserTokens(account ?? "");

	async function getUserNFTs() {
		console.log(await getUserTokens());

		// @ts-ignore
		const tokensResp: IToken[] = testnetNFTs.result?.map((token) => {
			const id = Number(token.token_id);
			const { image } = JSON.parse(token.metadata ?? '{"image":null}');
			const collectionName = token.name;
			const contractAddress = token.token_address;

			return { id, image, collectionName, contractAddress };
		});

		setTokens(tokensResp);
	}

	const isTokenSelected = useCallback(
		(token: IToken) => {
			if (
				// @ts-ignore
				tokenForSwap &&
				tokenForSwap?.id + tokenForSwap.contractAddress ===
					token.id + token.contractAddress
			)
				return "border-blue";

			return "";
		},
		[tokenForSwap]
	);

	const logOut = async () => {
		console.log("logged out");
	};

	const login = async () => {
		getUserNFTs();
	};

	function createOrder() {}

	// useEffect(() => {

	// }, []);

	return (
		<div className="container mx-auto pt-12">
			<h1 className="font-semibold text-4xl">Create order</h1>
			<h2 className="font-semibold text-2xl mt-12">
				Choose NFT to order creation
			</h2>
			<div className="grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl gap-4 mt-10">
				{tokens.map((token) => (
					<TokenCard
						key={token.id + token.contractAddress}
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
				onChange={(e) => setWantedCollectionAddress(e.currentTarget.value)}
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
