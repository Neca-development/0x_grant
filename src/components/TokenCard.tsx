import { FunctionComponent, useMemo } from "react";
import unistoryLogo from "../assets/icons/unistory_logo.svg";
import { IOrder, IToken } from "../models/interfaces";

export interface ITokenCardProps {
	data: IToken;
	onClick?(): void;
	externalClasses?: string[];
}

const TokenCard: FunctionComponent<ITokenCardProps> = (props) => {
	const { data, onClick, externalClasses } = props;

	const contractAddress = useMemo(
		() =>
			`${data.contractAddress?.substring(
				0,
				4
			)}...${data.contractAddress?.substring(
				data.contractAddress.length - 6,
				data.contractAddress.length
			)}`,
		[data.contractAddress]
	);

	return (
		<article
			onClick={onClick}
			className={`rounded-lg overflow-hidden border border-gray-100 shadow-[4px_4px_10px_rgba(224,224,224,0.25)] cursor-pointer ${externalClasses}`}
		>
			<div className="aspect-square bg-gray-200 relative flex">
				{data.image ? (
					<img src={data.image} />
				) : (
					<img
						className="absolute inset-1/2 translate-y-center translate-x-center"
						src={unistoryLogo}
						alt=""
						width="37"
						height="38"
					/>
				)}
			</div>
			<div className="p-3">
				<div className="text-dark-gray font-semibold text-sm mb-1">
					{data.tokenId}
				</div>
				<div className="text-dark-gray font-semibold mb-3">
					{data.collectionName}
				</div>
				<div className="text-dark-gray font-semibold mb-3">
					{contractAddress}
				</div>
				<button className="text-blue font-bold" id="pick-to-swap-button">Pick to swap</button>
			</div>
		</article>
	);
};

export default TokenCard;
