import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract, ethers, utils } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import OrderCard from "../components/OrderCard";
import { defaultNftContractABI, nft2nftABI } from "../constants/abi";
import ExecuterContractMethods from "../libs/nft2nft";
import { IOrder } from "../models/interfaces";
import searchIcon from "../assets/icons/search.svg";

const nft2nft = new ExecuterContractMethods(
	"0x3545d1C36338308FF6116B27f748389B32B18E33",
	"007255c435e073b94033b10bf89aeb56130566949e87c185b5810670cc7b7bd6",
	nft2nftABI,
	"https://hpbnode.com"
);

function Home() {
	let navigate = useNavigate();
	const [orders, setOrders] = useState<IOrder[]>([]);
	const [search, setSearch] = useState("");

	const filteredOrders = useMemo(() => {
		if (search.trim() === "") return orders;

		return orders.filter((order) => order.collectionAddress.includes(search));
	}, [orders, search]);

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
				});
			}

			console.log(ordersResp);

			setOrders(ordersResp);
		})();
	}, []);

	return (
		<div className="container mx-auto pt-12">
			<h1 className="text-center mt-20 mb-32 font-bold text-6xl w-3/4 mx-auto leading-snug">
				New <span className="text-blue"> NFT swap </span> project <br /> Create
				an order or offer your
				<span className="text-blue">
					{" "}
					NFT <br />
				</span>{" "}
				to the existing
			</h1>
			<div className="flex justify-between">
				<div className="bg-white rounded border-black border py-2 py-3 px-4 w-1/3 flex items-center">
					<img
						width="16"
						height="17"
						src={searchIcon}
						alt=""
						className="mr-3"
					/>
					<input
						type="text"
						name=""
						id=""
						className="flex-1 text-dark-gray font-semibold self-stretch focus:outline-none placeholder:text-dark-gray"
						placeholder="Search by smart-contract adress"
						onChange={(e) => setSearch(e.currentTarget.value)}
					/>
				</div>
				<Button
					text="Create order"
					onClick={() => navigate("/create-order")}
				></Button>
			</div>
			<div className="grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl gap-4 mt-10">
				{filteredOrders.map((order) => (
					<OrderCard
						key={order.id + order.collectionAddress}
						data={order}
						onClick={() => navigate("/swap", { state: order })}
					></OrderCard>
				))}
			</div>
		</div>
	);
}

export default Home;
