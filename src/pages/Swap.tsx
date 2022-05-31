import {FunctionComponent, useEffect, useMemo, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {IOrder, IToken} from "../models/interfaces";
import unistoryLogo from "../assets/icons/unistory_logo.svg";
import swap from "../assets/icons/swap.svg"
import exit from "../assets/icons/exit.svg"
import ExecuterContractMethods from "../libs/nft2nft";
import {defaultNftContractABI, nft2nftABI} from "../constants/abi";
import {Contract, ethers, utils} from "ethers";
import {JsonRpcProvider} from "@ethersproject/providers";
import {useEthers} from "@usedapp/core";
import useUserTokens from "../hooks/useUserNFTS";


const TokenOverview: FunctionComponent<any> = ({data, id, collectionName, collectionAddress, image, deleteToken }) => {
	console.log(data)

	return (
		<div className="flex">
			<div className="aspect-square w-3/5 relative bg-gray-500 mr-6">{image ? (
					<img src={image}
						 />
				) : (
					<img
						className="absolute inset-1/2 translate-y-center translate-x-center"
						src={unistoryLogo}
						alt=""
						width="38"
						height="38"
					/>
				)}
				{!data.tokenSymbol&&<img onClick={deleteToken} className="absolute cursor-pointer right-[-0.75rem] top-[-0.75rem]" src={exit} alt=""/>}
			</div>
			<div>
				<div className="font-semibold text-gray-500 text-md mb-2">
					{collectionName}
				</div>
				<div className="font-medium text-gray-500 text-2xl mb-6">#{id}</div>
				<div className="font-semibold text-gray-500 text-md">
					Smart contract
				</div>
				<div className="font-semibold text-gray-500 text-md">
					{`${collectionAddress.substring(
						0,
						4
					)}...${collectionAddress.substring(
						collectionAddress.length - 6,
						collectionAddress.length
					)}`}
				</div>
			</div>
		</div>
	);
};

// const nft2nft = new ExecuterContractMethods(
// 	"0x0D28de6586042efDa26Befd0d5B6627Ff59e1d45",
// 	"b28eca2ff9c249461cdfd738023b838d9282f7ec6b2564394f2633e112c547b2",
// 	nft2nftABI,
// 	"https://rinkeby.infura.io/v3/522b462c9a1d45fb9b3b18b5fda51c05"
// );

const Swap: FunctionComponent<any> = () => {
	const [selectedToken, setSelectedToken] = useState<any>(null);
	const [tokens, setTokens] = useState<IToken[]>([]);
    const [isApprove, setIsApprove] = useState(false)

	const location = useLocation();
	const { account } = useEthers()
	const userTokens = useUserTokens();
	const state = location.state as IOrder;
	console.log(state)
	const deleteSelectedToken = () => {
		setSelectedToken(null)
	}
	async function getUserNFTs() {

		console.log(userTokens)
		userTokens?.filter((token) => token.contractAddress=== state.collectionAddress)
		// const tokensResp: IToken[] = userTokens?.map((token) => {
		// 	const id = Number(token.token_id);
		// 	const { image } = JSON.parse(token.metadata ?? '{"image":null}');
		// 	const collectionName = token.name;
		// 	const collectionAddress = token.token_address;
		// 	return { id, image, collectionName, collectionAddress };
		// })
		// 	.filter((token:any)=>{
		// 	return state.collectionAddress.toLowerCase()===token.collectionAddress.toLowerCase()})

	}
	useEffect(() => {

			getUserNFTs();



	}, [account]);

	const makeProposal = async ( orderId:number, tokenId:number) => {
		// if(isApprove) {
		// 	const data = await nft2nft.makeProposal(orderId, tokenId);
		// 	console.log(data)
		// }else{
		// 	const abi = new utils.Interface(defaultNftContractABI);
		// 	const signer = new ethers.Wallet(
		// 		"b28eca2ff9c249461cdfd738023b838d9282f7ec6b2564394f2633e112c547b2",
		// 		new JsonRpcProvider(
		// 			"https://rinkeby.infura.io/v3/522b462c9a1d45fb9b3b18b5fda51c05"
		// 		)
		// 	);
		// 	const contract = new Contract(selectedToken.contractAddress, abi, signer);
		// 	const tx = await contract.setApprovalForAll('0x0D28de6586042efDa26Befd0d5B6627Ff59e1d45', true)
		// 	const receipt = await tx.wait()
		// 	setIsApprove(receipt)
		// 	console.log(receipt)
		// }
	}
	return (
		<div className="container mx-auto pt-12">
			<h1 className="font-semibold text-4xl">Swap</h1>
			<div className="flex mt-12">
				<div className="flex-1">
					<h2 className="font-semibold text-2xl mb-9">You will get</h2>
					 <TokenOverview
						 data={state}
						image={state.image}
						id={state.id}
						collectionName={state.collectionName}
						collectionAddress={state.collectionAddress}
					></TokenOverview>
				</div>
				<div className="w-25 h-full flex flex-col items-center ">
					<div className="w-16 h-16 mx-24 mt-52">
						<img src={swap} alt=""/>
					</div>
					{selectedToken&&<button onClick={()=>{makeProposal(state.id, selectedToken.tokenId)}} className="font-semibold text-white text-md w-5/12 h-[42px] rounded-xl mt-28 bg-[#1275D3] ">{isApprove?'Swap NFT':'Approve'}</button>}
				</div>

				<div className="flex-1">
					<h2 className="font-semibold text-2xl mb-9">
						For your {selectedToken?.tokenId}
					</h2>
					{selectedToken ? (
						<TokenOverview
							data={selectedToken}
							image={selectedToken.image}
							id={selectedToken.tokenId}
							collectionName={selectedToken.collectionName}
							collectionAddress={selectedToken.contractAddress}
							deleteToken={deleteSelectedToken}
						>

						</TokenOverview>
					) : (
						<div className="aspect-square overflow-auto w-3/4 bg-gray-200 rounded-2xl border-dashed border border-gray-500 p-6 grid grid-cols-2 gap-6 relative">
							{userTokens?.map((token) => (
								<div
									key={token.tokenId+token.contractAddress}
									className="aspect-square bg-gray-500 flex-1 cursor-pointer"
									onClick={() => setSelectedToken(token)}
								>
									{token.tokenId}
								</div>
							))}
							{userTokens?.length === 0 && (
								<div className="text-md text-gray-500 font-semibold h-full w-full flex items-center justify-center absolute t-0 l-0">
									Choose your NFT to swap
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Swap;
