export interface IOrder {
	id: number;
	collectionName: string;
	image: string;
	tokenSymbol: string;
	collectionAddress: string;
	offerer: string
}

export interface IToken {
	tokenId: number;
	collectionName: string;
	image: string;
	contractAddress: string;
	symbol: string;
}
