import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import OrderCard from "../components/OrderCard";
import TokenCard from "../components/TokenCard";
import { IToken } from "../models/interfaces";

function CreateOrder() {
	let navigate = useNavigate();
	const [tokens, setTokens] = useState<IToken[]>([]);
	const {
		authenticate,
		isAuthenticated,
		isAuthenticating,
		user,
		account,
		logout,
	} = useMoralis();
	const Web3Api = useMoralisWeb3Api();

	async function getUserNFTs() {
		const address = user?.attributes.ethAddress;
		const testnetNFTs = await Web3Api.Web3API.account.getNFTs({
			chain: "rinkeby",
			address,
		});

		console.log(testnetNFTs);

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

	const logOut = async () => {
		await logout();
		console.log("logged out");
	};

	const login = async () => {
		if (!isAuthenticated) {
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
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			getUserNFTs();
			return;
		}

		login();
	}, [isAuthenticated]);

	return (
		<div className="container mx-auto pt-12">
			<h1 className="font-semibold text-4xl">Create order</h1>
			<Button text="Log out" onClick={() => logOut()}></Button>
			<h2 className="font-semibold text-2xl mt-12">
				Choose NFT to order creation
			</h2>
			<div className="grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl gap-4 mt-10">
				{tokens.map((token) => (
					<TokenCard
						key={token.id + token.collectionAddress}
						data={token}
						onClick={() => navigate("/swap")}
					></TokenCard>
				))}
			</div>
			<h2 className="font-semibold text-2xl mt-12">Swap to</h2>
		</div>
	);
}

export default CreateOrder;
