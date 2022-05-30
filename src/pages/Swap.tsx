import { FunctionComponent } from "react";

const TokenOverview: FunctionComponent<any> = () => {
	return (
		<div className="flex">
			<div className="aspect-square w-1/2 bg-gray-500 mr-6"></div>
			<div>
				<div className="font-semibold text-gray-500 text-md mb-2">
					Bored ape yacht club
				</div>
				<div className="font-medium text-gray-500 text-2xl mb-6">#00000</div>
				<div className="font-semibold text-gray-500 text-md">
					Smart contract
				</div>
				<div className="font-semibold text-gray-500 text-md">
					0xaba7161a7fb69c88e16
				</div>
			</div>
		</div>
	);
};

const Swap: FunctionComponent<any> = () => {
	return (
		<div className="container mx-auto pt-12">
			<h1 className="font-semibold text-4xl">Swap</h1>
			<div className="flex mt-12">
				<div className="flex-1">
					<h2 className="font-semibold text-2xl mb-9">You will get</h2>
					<TokenOverview></TokenOverview>
				</div>
				<div className="w-16 h-16 bg-gray-500 mx-24 mt-52"></div>
				<div className="flex-1">
					<h2 className="font-semibold text-2xl mb-9">For your</h2>
					<div className="aspect-square w-1/2 bg-gray-200 rounded-2xl border-dashed border border-gray-500 flex items-center justify-center text-md text-gray-500 font-semibold">
						Choose your NFT to swap
					</div>
				</div>
			</div>
		</div>
	);
};

export default Swap;
