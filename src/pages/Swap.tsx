import {FunctionComponent, useEffect, useMemo, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {IOrder, IToken} from "../models/interfaces";
import unistoryLogo from "../assets/icons/unistory_logo.svg";
import swap from "../assets/icons/swap.svg"
import exit from "../assets/icons/exit.svg"
import {useEthers} from "@usedapp/core";
import useUserTokens from "../hooks/useUserNFTS";
import {getApprove, useApproveNft, useSwapNFT} from "../hooks/useSwapNFT";
import {data} from "autoprefixer";
import {UNISTORY_MARKETPLACE_ADDRESS} from "../constants/marketPlace";


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

const Swap: FunctionComponent<any> =  () => {
	const [selectedToken, setSelectedToken] = useState<any>(null);
	const [tokens, setTokens] = useState<IToken[]>([]);
    const [isApprove, setIsApprove] = useState(false)


	const location = useLocation();
	const { account, library } = useEthers()

	let state = location.state as IOrder;
	state = {
		id: state.id,
		collectionAddress: state.collectionAddress.toLowerCase(),
		image: state.image,
		collectionName: state.collectionName,
		tokenSymbol: state.tokenSymbol,
		offerer: state.offerer
	}
	const {state: stateApprove, send:sendApprove} = useApproveNft(state?.collectionAddress, account, library)
	const {state: stateSwap, send: sendSwap} = useSwapNFT(library)
	console.log(state)
	const deleteSelectedToken = () => {
		setSelectedToken(null)
	}

	useEffect(()=>{
		(async ()=>{
			const appr = await getApprove(selectedToken?.contractAddress, account, library, selectedToken?.tokenId)
			setIsApprove(appr)
		})()


	}, [selectedToken])
	const userTokens = useUserTokens()?.filter((token)=>token.contractAddress.toLowerCase()===state.collectionAddress.toLowerCase())
	const makeProposal = async ( orderId:number, tokenId:number) => {
		console.log(isApprove)
		if(!isApprove) {

			await sendApprove(UNISTORY_MARKETPLACE_ADDRESS, tokenId)
			console.log(stateApprove)
			await setIsApprove(true)
		}
		await sendSwap(orderId, tokenId)
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
