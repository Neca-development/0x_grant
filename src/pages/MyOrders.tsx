import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import TokenCard from "../components/TokenCard";
import { IToken } from "../models/interfaces";

function MyOrders() {
	let navigate = useNavigate();
	const [tokens, setTokens] = useState<IToken[]>([]);
	const [tokenForSwap, setTokenForSwap] = useState<IToken>();
	const [wantedCollectionAddress, setWantedCollectionAddress] = useState("");

	async function getUserNFTs() {
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
			<h1 className="font-semibold text-4xl">My orders</h1>
			<section>
				<h2 className="font-semibold text-2xl mt-12">
					Here you can check your orders
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
			</section>
			<section>
				<h2 className="font-semibold text-2xl mt-12">
					For your NFT #00000 you got next offers:
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
			</section>
		</div>
	);
}

export default MyOrders;
