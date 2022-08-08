import type { FunctionComponent } from 'react'

export interface IButton {
  text: string
  onClick?: () => void
  disabled?: boolean
  externalClasses?: string[]
}

const Button: FunctionComponent<IButton> = (props) => {
  const { text, onClick, externalClasses, disabled } = props

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`bg-zinc-700 text-white py-3 px-4 rounded-lg font-semibold ${externalClasses}`}
    >
      {text}
    </button>
  )
}

export default Button
