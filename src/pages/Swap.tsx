import { FunctionComponent, useMemo, useState } from "react";

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
	const [selectedToken, setSelectedToken] = useState<any>(null);

	const fakeTokens = useMemo(() => {
		return Array(20)
			.fill(0, 0, 20)
			.map((el, idx) => ({ el, idx }));
	}, []);

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
					<h2 className="font-semibold text-2xl mb-9">
						For your {selectedToken}
					</h2>
					{selectedToken ? (
						<TokenOverview></TokenOverview>
					) : (
						<div className="aspect-square overflow-auto w-3/4 bg-gray-200 rounded-2xl border-dashed border border-gray-500 p-6 grid grid-cols-2 gap-6 relative">
							{fakeTokens.map((token) => (
								<div
									key={token.idx}
									className="aspect-square bg-gray-500 flex-1"
									onClick={() => setSelectedToken(token.idx)}
								>
									{token.idx}
								</div>
							))}
							{fakeTokens.length === 0 && (
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
