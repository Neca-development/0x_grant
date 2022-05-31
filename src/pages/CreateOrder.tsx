import { useCallback, useEffect, useState } from "react";
import { useApiContract, useMoralis, useMoralisWeb3Api } from "react-moralis";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import TokenCard from "../components/TokenCard";
import { nft2nftABI } from "../constants/abi";
import ExecuterContractMethods from "../libs/nft2nft";
import { IToken } from "../models/interfaces";

function CreateOrder() {
	let navigate = useNavigate();
	const [tokens, setTokens] = useState<IToken[]>([]);
	const [tokenForSwap, setTokenForSwap] = useState<IToken>();
	const [wantedCollectionAddress, setWantedCollectionAddress] = useState("");
	const {
		authenticate,
		isAuthenticated,
		isAuthenticating,
		user,
		account,
		logout,
	} = useMoralis();
	const Web3Api = useMoralisWeb3Api();

	const { runContractFunction, data, error, isLoading, isFetching } =
		useApiContract({
			address: "0x0D28de6586042efDa26Befd0d5B6627Ff59e1d45",
			functionName: "createOrder",
			abi: nft2nftABI,
			params: {
				offerItem: {
					collection: tokenForSwap?.collectionAddress,
					tokenId: tokenForSwap?.id,
				},
				considCollection: wantedCollectionAddress,
			},
		});

	async function getUserNFTs() {
		const address = user?.attributes.ethAddress;
		const testnetNFTs = await Web3Api.Web3API.account.getNFTs({
			chain: "rinkeby",
			address,
		});

		// @ts-ignore
		const tokensResp: IToken[] = testnetNFTs.result?.map((token) => {
			const id = Number(token.token_id);
			const { image } = JSON.parse(token.metadata ?? '{"image":null}');
			const collectionName = token.name;
			const collectionAddress = token.token_address;

			return { id, image, collectionName, collectionAddress };
		});

		setTokens(tokensResp);
	}

	const isTokenSelected = useCallback(
		(token: IToken) => {
			if (
				// @ts-ignore
				tokenForSwap &&
				tokenForSwap?.id + tokenForSwap.collectionAddress ===
					token.id + token.collectionAddress
			)
				return "border-blue";

			return "";
		},
		[tokenForSwap]
	);

	const logOut = async () => {
		await logout();
		console.log("logged out");
	};

	const login = async () => {
		let address = "";

		await authenticate({ signingMessage: "Log in using Moralis" })
			.then(function (user) {
				console.log("logged in user:", user);
				address = user!.get("ethAddress");
			})
			.catch(function (error) {
				console.log(error);
			});

		getUserNFTs();
	};

	function createOrder() {
		runContractFunction();
	}

	useEffect(() => {
		console.log(user);

		if (isAuthenticated) {
			getUserNFTs();
			return;
		}

		login();
	}, [isAuthenticated]);

	return (
		<div className="container mx-auto pt-12">
			<h1 className="font-semibold text-4xl">Create order</h1>
			<h2 className="font-semibold text-2xl mt-12">
				Choose NFT to order creation
			</h2>
			<div className="grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl gap-4 mt-10">
				{tokens.map((token) => (
					<TokenCard
						key={token.id + token.collectionAddress}
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
