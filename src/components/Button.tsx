import { FunctionComponent, MouseEvent } from "react";

export interface IButton {
	text: string;
	onClick?: () => void;
	disabled?: boolean;
	externalClasses?: string[];
}

const Button: FunctionComponent<IButton> = (props) => {
	const { text, onClick, externalClasses, disabled } = props;
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={`bg-zinc-700 text-white py-3 px-4 rounded-lg font-semibold ${externalClasses}`}
      id={`${text.toLowerCase().replace(' ', '-')}-button`}
		>
			{text}
		</button>
	);
};

export default Button;
