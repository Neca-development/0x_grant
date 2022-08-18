import { Link } from 'react-router-dom'
import { useWallet } from '../sdk-hooks/useWallet'
import unistoryLogo from '../assets/icons/unistory_logo_dark.svg'
import Button from './Button'

function Header() {
  const { account, connectWallet, disconnectWallet } = useWallet()

  return (
    <header className="shadow-[0px_4px_10px_rgba(192,192,192,0.25)]">
      <div className="container flex justify-between items-center mx-auto py-5">
        <Link to="/" className="flex items-center">
          <img src={unistoryLogo} alt="" />
          <span className="font-semibold text-2xl ml-3">NFT 2 NFT</span>
        </Link>

        {account ? (
          <div className="space-x-5">
            <Link to="/my-orders">
              <Button text={'My orders'}></Button>
            </Link>

            <Link to="/free-nft">
              <Button
                text={'Get free NFTs'}
                externalClasses={['bg-white text-blue']}
              ></Button>
            </Link>

            <Button
              onClick={() => disconnectWallet && disconnectWallet()}
              text={'Disconnect wallet'}
              externalClasses={['bg-white text-blue']}
            ></Button>
          </div>
        ) : (
          <Button
            onClick={() => connectWallet && connectWallet()}
            text={'Connect wallet'}
            externalClasses={['bg-zinc-700']}
          ></Button>
        )}
      </div>
    </header>
  )
}

export default Header
