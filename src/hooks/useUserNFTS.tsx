import { JsonRpcProvider } from "@ethersproject/providers";
import { useEthers } from "@usedapp/core";
import axios from "axios";
import { BigNumber, ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import { defaultNftContractABI } from "../constants/abi";

interface TokenModel {
	contractAddress: string;
	symbol: string;
	collectionName: string;
	tokenId: number;
	image: string;
}

interface TxModel {
	contractAddress: string;
	from: string;
	tokenSymbol: string;
	tokenName: string;
	tokenID: string;
	image: string;
}

class HPBScanner {
	private readonly walletAddress: string;

	constructor(walletAddress: string) {
		this.walletAddress = walletAddress.toLowerCase();
	}

	async getTokens(): Promise<TokenModel[]> {
		const txs = await this.getTx();
		return this.parseTx(txs);
	}

	async getTx(): Promise<TxModel[]> {
		const params = this.getDefaultParams() + "&address=" + this.walletAddress;
		return (await axios.get(`${this.getBaseUrl()}?${params}`)).data.data;
	}

	private async parseTx(txs: TxModel[]): Promise<TokenModel[]> {
		let result: TokenModel[] = [];

		for await (const tx of txs) {
			if (tx.from == this.walletAddress) {
				const tokenId = this.convertToNumber(tx.tokenID);
				const contractAddress = tx.contractAddress;

				result = result.filter(
					(x) => x.contractAddress != contractAddress && x.tokenId != tokenId
				);
				continue;
			}

			const signer = new ethers.Wallet(
				"b28eca2ff9c249461cdfd738023b838d9282f7ec6b2564394f2633e112c547b2",
				new JsonRpcProvider("https://hpbnode.com")
			);
			const contract = new ethers.Contract(
				tx.contractAddress,
				defaultNftContractABI,
				signer
			);
			const metadata = await contract.tokenURI(tx.tokenID);

			const { image } = eval(
				"(" + (await fetch(metadata).then((response) => response.text())) + ")"
			);
			result.push({
				contractAddress: tx.contractAddress,
				symbol: tx.tokenSymbol,
				collectionName: tx.tokenName,
				tokenId: this.convertToNumber(tx.tokenID),
				image,
			});
		}

		return result;
	}

	private convertToNumber(vl: string): number {
		const bigNumber = BigNumber.from(vl);
		return bigNumber.toNumber();
	}

	private getDefaultParams(): string {
		return "module=account&action=tokennfttx&apikey=9B64C60C3199621FE9108F5CCD87EC1F&tag=latest&sort=asc";
	}

	private getBaseUrl(): string {
		return "https://hscan.org/api";
	}
}

export default function useUserTokens() {
	const { account } = useEthers();
	const [userTokens, setUserTokens] = useState<TokenModel[]>();

	useEffect(() => {
		(async () => {
			if (!account) return;
			console.log("====================================");
			console.log("update");
			console.log("====================================");
			setUserTokens(await new HPBScanner(account).getTokens());
		})();
	}, [account]);

	return userTokens;
}

// ------------------------------TEST-----------------------------------

// const t = new HPBScanner("0xF194Bd9Ca650CebFAe39340cb44629d9ad986C01");
// t.getTokens().then((res) => console.log(res));

// -----------------------------/TEST-----------------------------------
