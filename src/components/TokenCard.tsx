import { FunctionComponent } from "react";

export interface ITokenCardProps {
	onClick?(): void;
}

const TokenCard: FunctionComponent<any> = (props) => {
	const { onClick } = props;

	return (
		<article onClick={onClick}>
			<div className="aspect-square bg-gray-600"></div>
			<div className="bg-gray-300 p-3">
				<span>0000</span>
				<br />
				<span>Bored ape yacht club</span>
				<br />
				<span>0xab...c88e16</span>
				<br />
				<span>Swap to: BAYC</span>
				<br />
				<button>Offer overview</button>
			</div>
		</article>
	);
};

export default TokenCard;
