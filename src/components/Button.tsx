import { FunctionComponent } from "react";

export interface IButton {
	text: string;
}

const Button: FunctionComponent<IButton> = (props) => {
	const { text } = props;
	return (
		<button className="bg-zinc-700 text-white py-3 px-4 rounded-lg font-semibold">
			{text}
		</button>
	);
};

export default Button;
