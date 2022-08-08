import { ethers } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";
//================================
class OfferItemModel {
	collection: string = "";
	tokenId: number = 0;
}
interface IContract {
	createOrder(
		addressCollection: string,
		tokenId: number,
		considerationCollection: string
	): Promise<string>;
	makeProposal(orderId: number, tokenId: number): Promise<string>;
	cancelProposal(orderId: number, proposalId: number): Promise<string>;
	execute(orderId: number, proposalId: number): Promise<string>;
	cancelOrder(orderId: number): Promise<string>;
}
//================================
class ExecuterContractMethods implements IContract {
	private signer: ethers.Wallet;
	public contract: ethers.Contract;

	constructor(
		contractAddress: string,
		privateKey: string,
		abi: ({ inputs: { indexed: boolean; name: string; internalType: string; type: string }[]; name: string; anonymous: boolean; type: string } | { inputs: { indexed: boolean; name: string; internalType: string; type: string }[]; name: string; anonymous: boolean; type: string } | { inputs: ({ indexed: boolean; name: string; internalType: string; type: string } | { indexed: boolean; name: string; internalType: string; type: string })[]; name: string; anonymous: boolean; type: string } | { inputs: ({ indexed: boolean; name: string; internalType: string; type: string } | { indexed: boolean; name: string; internalType: string; type: string })[]; name: string; anonymous: boolean; type: string } | { inputs: ({ indexed: boolean; name: string; internalType: string; type: string } | { indexed: boolean; name: string; internalType: string; type: string })[]; name: string; anonymous: boolean; type: string } | { outputs: ({ name: string; internalType: string; type: string } | { components: ({ name: string; internalType: string; type: string } | { name: string; internalType: string; type: string })[]; name: string; internalType: string; type: string } | { name: string; internalType: string; type: string } | { name: string; internalType: string; type: string })[]; inputs: { name: string; internalType: string; type: string }[]; name: string; stateMutability: string; type: string } | { outputs: any[]; inputs: { name: string; internalType: string; type: string }[]; name: string; stateMutability: string; type: string } | { outputs: { name: string; internalType: string; type: string }[]; inputs: ({ name: string; internalType: string; type: string } | { name: string; internalType: string; type: string })[]; name: string; stateMutability: string; type: string } | { outputs: any[]; inputs: ({ components: ({ name: string; internalType: string; type: string } | { name: string; internalType: string; type: string })[]; name: string; internalType: string; type: string } | { name: string; internalType: string; type: string })[]; name: string; stateMutability: string; type: string } | { outputs: any[]; inputs: ({ name: string; internalType: string; type: string } | { name: string; internalType: string; type: string })[]; name: string; stateMutability: string; type: string } | { outputs: { components: ({ name: string; internalType: string; type: string } | { name: string; internalType: string; type: string } | { name: string; internalType: string; type: string })[]; name: string; internalType: string; type: string }[]; inputs: { name: string; internalType: string; type: string }[]; name: string; stateMutability: string; type: string } | { outputs: { components: ({ name: string; internalType: string; type: string } | { components: ({ name: string; internalType: string; type: string } | { name: string; internalType: string; type: string })[]; name: string; internalType: string; type: string } | { name: string; internalType: string; type: string } | { name: string; internalType: string; type: string } | { components: ({ name: string; internalType: string; type: string } | { name: string; internalType: string; type: string } | { name: string; internalType: string; type: string })[]; name: string; internalType: string; type: string })[]; name: string; internalType: string; type: string }[]; inputs: any[]; name: string; stateMutability: string; type: string } | { outputs: { components: ({ name: string; internalType: string; type: string } | { components: ({ name: string; internalType: string; type: string } | { name: string; internalType: string; type: string })[]; name: string; internalType: string; type: string } | { name: string; internalType: string; type: string } | { name: string; internalType: string; type: string } | { components: ({ name: string; internalType: string; type: string } | { name: string; internalType: string; type: string } | { name: string; internalType: string; type: string })[]; name: string; internalType: string; type: string })[]; name: string; internalType: string; type: string }[]; inputs: { name: string; internalType: string; type: string }[]; name: string; stateMutability: string; type: string } | { outputs: { name: string; internalType: string; type: string }[]; inputs: ({ name: string; internalType: string; type: string } | { name: string; internalType: string; type: string })[]; name: string; stateMutability: string; type: string } | { outputs: { name: string; internalType: string; type: string }[]; inputs: any[]; name: string; stateMutability: string; type: string } | { outputs: { name: string; internalType: string; type: string }[]; inputs: any[]; name: string; stateMutability: string; type: string } | { outputs: any[]; inputs: any[]; name: string; stateMutability: string; type: string } | { outputs: any[]; inputs: { name: string; internalType: string; type: string }[]; name: string; stateMutability: string; type: string })[],
		rpcNode: string
	) {
		const provider = new JsonRpcProvider(rpcNode);
		this.signer = new ethers.Wallet(privateKey, provider);
		this.contract = new ethers.Contract(contractAddress, abi, this.signer);
	}
	async createOrder(
		addressCollection: string,
		tokenId: number,
		considCollection: string
	): Promise<string> {
		const offerItem: OfferItemModel = {
			collection: addressCollection,
			tokenId,
		};
		const res = await this.contract.createOrder(offerItem, considCollection);
		return res.hash;
	}
	async makeProposal(orderId: number, tokenId: number): Promise<string> {
		const res = await this.contract.makeProposal(orderId, tokenId);
		return res.hash;
	}
	async cancelProposal(orderId: number, proposalId: number): Promise<string> {
		const res = await this.contract.cancelProposal(orderId, proposalId);
		return res.hash;
	}
	async execute(orderId: number, proposalId: number): Promise<string> {
		const res = await this.contract.execute(orderId, proposalId);
		return res.hash;
	}
	async cancelOrder(orderId: number): Promise<string> {
		const res = await this.contract.cancelOrder(orderId);
		return res.hash;
	}

	async getOrders(): Promise<any> {
		const res = await this.contract.getOrders();
		return res;
	}
}
// -------------------------Tests----------------------------------
const contractAddress = "0x9B3a87323EfCdcab1948b0B331C58dDc6fb309FD";
const privateKey =
	"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
const abi = `[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"OrderClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"OrderCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"orderId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"proposalId","type":"uint256"}],"name":"ProposalCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"orderId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"proposalId","type":"uint256"}],"name":"ProposalMade","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"SwapOrders","outputs":[{"internalType":"address","name":"offerer","type":"address"},{"components":[{"internalType":"address","name":"collection","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"internalType":"struct OfferItem","name":"offerItem","type":"tuple"},{"internalType":"address","name":"considCollection","type":"address"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"cancelOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"},{"internalType":"uint256","name":"proposalId","type":"uint256"}],"name":"cancelProposal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"collection","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"internalType":"struct OfferItem","name":"_offerItem","type":"tuple"},{"internalType":"address","name":"_considCollection","type":"address"}],"name":"createOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"},{"internalType":"uint256","name":"proposalId","type":"uint256"}],"name":"execute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"getOrderProposals","outputs":[{"components":[{"internalType":"address","name":"proposer","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct Proposal[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOrders","outputs":[{"components":[{"internalType":"address","name":"offerer","type":"address"},{"components":[{"internalType":"address","name":"collection","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"internalType":"struct OfferItem","name":"offerItem","type":"tuple"},{"internalType":"address","name":"considCollection","type":"address"},{"internalType":"bool","name":"isActive","type":"bool"},{"components":[{"internalType":"address","name":"proposer","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct Proposal[]","name":"proposals","type":"tuple[]"}],"internalType":"struct SwapOrder[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"makeProposal","outputs":[{"internalType":"uint256","name":"proposalId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"orderIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]`;

// const rpcNode = "https://rinkeby.infura.io/v3/ec25fc33eb624f13a9012f6174f20d68";
// const test = new ExecuterContractMethods(
// 	contractAddress,
// 	privateKey,
// 	abi,
// 	rpcNode
// );

export default ExecuterContractMethods;
// test.createOrder("0x3e14AcCf6E7F7068d5B7796Fb7A2014B7577Be23", 4, "0x85803B4096E92A82a354A5d0B5CfE63B270e1fDC").then(res => console.log(res));
//test.cancelOrder(2).then(res => console.log(res));
//test.makeProposal(3, 3).then(res => console.log(res));
//test.cancelProposal(3, 0).then(res => console.log(res));
//test.execute(0, 0).then(res => console.log(res));
// -------------------------/Tests----------------------------------
