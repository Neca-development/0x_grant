import type { FunctionComponent } from 'react'

import unistoryLogo from '../assets/icons/unistory_logo_dark.svg'

const Footer: FunctionComponent<any> = () => {
  return (
    <footer className="bg-light-gray flex justify-center py-10 mt-20">
      <img src={unistoryLogo} alt="" />
    </footer>
  )
}

export default Footer
