import { FunctionComponent, useMemo } from "react";
import unistoryLogo from "../assets/icons/unistory_logo.svg";
import { IOrder } from "../models/interfaces";

export interface ITokenCardProps {
	data: IOrder;
	onClick?(): void;
}

const OrderCard: FunctionComponent<ITokenCardProps> = (props) => {
	const { data, onClick } = props;

	const contractAddress = useMemo(
		() =>
			`${data.collectionAddress?.substring(
				0,
				4
			)}...${data.collectionAddress?.substring(
				data.collectionAddress.length - 6,
				data.collectionAddress.length
			)}`,
		[data.collectionAddress]
	);

	return (
		<article
			onClick={onClick}
			className="rounded-lg overflow-hidden border border-gray-100 shadow-[4px_4px_10px_rgba(224,224,224,0.25)] cursor-pointer hover:border-blue"
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
					{data.id}
				</div>
				<div className="text-dark-gray font-semibold mb-3">
					{data.collectionName}
				</div>
				<div className="text-dark-gray font-semibold mb-3">
					{contractAddress}
				</div>
				<div className="text-dark-gray font-medium mb-4">
					Swap to: <span className="font-semibold">{data.tokenSymbol}</span>
				</div>
				<button className="text-blue font-bold" id="offer-overview-button">Offer overview</button>
			</div>
		</article>
	);
};

export default OrderCard;
