import axios from "axios";
import { BigNumber } from "ethers";
import { useState } from "react";

interface TokenModel {
	contractAddress: string;
	symbol: string;
	collectionName: string;
	tokenId: number;
}

interface TxModel {
	contractAddress: string;
	from: string;
	tokenSymbol: string;
	tokenName: string;
	tokenID: string;
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

	private parseTx(txs: TxModel[]): TokenModel[] {
		let result: TokenModel[] = [];

		for (const tx of txs) {
			if (tx.from == this.walletAddress) {
				const tokenId = this.convertToNumber(tx.tokenID);
				const contractAddress = tx.contractAddress;

				result = result.filter(
					(x) => x.contractAddress != contractAddress && x.tokenId != tokenId
				);
				continue;
			}

			result.push({
				contractAddress: tx.contractAddress,
				symbol: tx.tokenSymbol,
				collectionName: tx.tokenName,
				tokenId: this.convertToNumber(tx.tokenID),
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

export default async function useUserTokens(address: string) {
	const [scannerInstance] = useState(new HPBScanner(address));

	return scannerInstance.getTokens;
}

// ------------------------------TEST-----------------------------------

const t = new HPBScanner("0xF194Bd9Ca650CebFAe39340cb44629d9ad986C01");
t.getTokens().then((res) => console.log(res));

// -----------------------------/TEST-----------------------------------
