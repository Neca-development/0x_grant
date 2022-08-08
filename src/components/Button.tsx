import { FunctionComponent, MouseEvent } from 'react';
import useAnalyticsEventTracker from '../hooks/useAnalyticsEventTracker';

export interface IButton {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  externalClasses?: string[];
}

const Button: FunctionComponent<IButton> = (props) => {
  const { text, onClick, externalClasses, disabled } = props;
  const gaEventTracker = useAnalyticsEventTracker('click');

  const handleClick = () => {
    gaEventTracker(text.toLowerCase().replace(' ', '-'));
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`bg-zinc-700 text-white py-3 px-4 rounded-lg font-semibold ${externalClasses}`}
    >
      {text}
    </button>
  );
};

export default Button;
