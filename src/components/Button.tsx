import { FunctionComponent, MouseEvent } from "react";

export interface IButton {
	text: string;
	onClick?: () => void;
	externalClasses?: string[];
}

const Button: FunctionComponent<IButton> = (props) => {
	const { text, onClick, externalClasses } = props;
	return (
		<button
			onClick={onClick}
			className={`bg-zinc-700 text-white py-3 px-4 rounded-lg font-semibold ${externalClasses}`}
		>
			{text}
		</button>
	);
};

export default Button;
